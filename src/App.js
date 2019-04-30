import React from 'react';
import { Button, Modal, ModalBody, Spinner } from 'reactstrap';
import './App.css';
import * as Utils from './utils';
import CONSTANTS from './constants';
import Provider from './provider';
import TokenDetailBox from './components/TokenDetailBox';

const initState = {
  isAuthenticated: false,
  isShowPrivateKeyModal: false,
  isUpdateRate: false,
  invertRate: 0,
  walletDetail: {
    privateKey: '',
    address: '',
    tokens: []
  },
  swapDetail: {
    source: {
      token: CONSTANTS.tokenList[0],
      value: ''
    },
    destiny: {
      token: CONSTANTS.tokenList[1],
      value: ''
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.provider = new Provider();
  }

  componentDidMount() {
    this.updateRate(this.state.swapDetail.source, this.state.swapDetail.destiny, null);
  }

  reset = () => {
    this.setState(initState, () => {
      this.updateRate(this.state.swapDetail.source, this.state.swapDetail.destiny, null);
    });
  };

  togglePrivateKeyModal = () => {
    this.setState({
      isShowPrivateKeyModal: !this.state.isShowPrivateKeyModal
    });
  };

  changeWalletDetail = (key, value, callback) => {
    let walletDetail = JSON.parse(JSON.stringify(this.state.walletDetail));
    walletDetail[key] = value;
    this.setState({walletDetail}, () => {
      if (callback) {
        callback();
      }
    });
  };

  getWalletDetailFromPrivateKey = () => {
    try {
      let address = Utils.getAddressFromPrivateKey(this.state.walletDetail.privateKey);
      this.changeWalletDetail("address", address);
      this.provider.getAllBalancesTokenAtLatestBlock(address, CONSTANTS.tokenList)
        .then(tokens => {
          this.changeWalletDetail('tokens', tokens, () => {
            this.setState({
              isAuthenticated: true
            });
          });
        })
        .catch(error => alert(error));
    } catch (e) {
      alert("Invalid private key");
    }
  };

  getWalletDetailFromKeystoreFile = (event) => {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      let keyString = event.target.result.toLowerCase();
      try {
        let keyObj = JSON.parse(keyString);
        if (!keyObj.address) {
          alert("The file does not have address");
          return;
        }
      } catch (e) {
        alert("You have to upload a JSON file");
        return;
      }

      let keyObj = JSON.parse(keyString);
      let address = "0x" + keyObj.address;
      this.changeWalletDetail("address", address);
      try {
        this.provider.getAllBalancesTokenAtLatestBlock(address, CONSTANTS.tokenList)
          .then(tokens => this.changeWalletDetail('tokens', tokens))
          .catch(error => alert(error));
        this.setState({
          isAuthenticated: true
        });
      } catch (e) {
        alert("Invalid keystore file");
      }
    };
    fileReader.readAsText(file);
  };

  onChangeToken = (key, type, value) => {
    let swapDetail = JSON.parse(JSON.stringify(this.state.swapDetail));
    swapDetail[key][type] = value;
    this.setState({swapDetail}, () => {
      const { swapDetail } = this.state;
      if(key === 'source') {
        this.updateRate(swapDetail.source, swapDetail.destiny, 'destiny');
      } else {
        this.updateRate(swapDetail.destiny, swapDetail.source, 'source');
      }
    });
  };

  updateRate = (source, destiny, updateTarget) => {
    this.setState({isUpdateRate: true});
    this.provider.getLatestBlock()
      .then(latestBlockNo => {
        const amount = Utils.toHex((source.value ? source.value : 1) * Math.pow(10, 18));
        this.provider.getRateAtSpecificBlock(source.token.address, destiny.token.address, amount, latestBlockNo)
          .then(data => {
            let expectedPrice = parseInt(data.expectedPrice.toString())/Math.pow(10, 18);

            let swapDetail = JSON.parse(JSON.stringify(this.state.swapDetail));
            if (updateTarget && (source.value || destiny.value)) {
              swapDetail[updateTarget].value = (source.value * expectedPrice).toFixed(CONSTANTS.PRECISION);
            }
            let invertRate = (1 / expectedPrice).toFixed(CONSTANTS.PRECISION);
            if (updateTarget === 'source') {
              invertRate = expectedPrice.toFixed(CONSTANTS.PRECISION);
            }
            this.setState({invertRate, swapDetail}, () => {
              this.setState({isUpdateRate: false});
            });
          })
          .catch(error => {
            this.setState({isUpdateRate: false});
          });
      })
      .catch(error => {
        this.setState({isUpdateRate: false});
      });
  };

  render() {
    const { walletDetail = {
      privateKey: '',
      address: '',
      tokens: [] }, swapDetail} = this.state;
    const sourceDetail = swapDetail.source;
    const destinyDetail = swapDetail.destiny;
    return (
      <div>
        <div className="transfer-component row no-gutters">
          <div className="sub-container col-12 col-md-6 g-padding">
            <TokenDetailBox
              type="source"
              label="From:"
              detail={sourceDetail}
              onChangeToken={this.onChangeToken}
            />
          </div>
          <div className="sub-container col-12 col-md-6 g-padding">
            <TokenDetailBox
              label="To:"
              type="destiny"
              detail={destinyDetail}
              onChangeToken={this.onChangeToken}
            />
          </div>
          <div className="d-flex justify-content-start g-padding">
            {
              this.state.isUpdateRate ? (
                <Spinner size="sm" color="info" />
              ) : (
                <span>1 {destinyDetail.token.symbol} = {this.state.invertRate} {sourceDetail.token.symbol}</span>
              )
            }
          </div>
        </div>

        <hr/>

        {
          this.state.isAuthenticated ? (
            <div className="g-padding">
              <h5>Wallet Detail</h5>
              <div>
                <strong>Address: </strong><span>{walletDetail.address}</span>
              </div>
              <div>
                <strong>Tokens:</strong>
                <div className="row">
                  {
                    walletDetail.tokens.map((token, index) => {
                      return <div key={index} className="col-6 col-sm-4 col-md-3">
                        <span>{token.symbol + " " + this.provider.convertHexToDecimal(token.balance._hex)}</span>
                      </div>
                    })
                  }
                </div>
              </div>

              <div className="mt-5">
                <u
                  className="connect-to-other-wallet pointer"
                  onClick={this.reset}
                >
                  Connect to other wallet
                </u>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5 className="g-margin">Connect to your wallet</h5>
              <div className="d-flex flex-row justify-content-around">
                <Button
                  color="primary g-margin"
                  onClick={this.togglePrivateKeyModal}
                >
                  Private Key
                </Button>
                <Button
                  color="primary g-margin"
                  onClick={e => {
                    this.refs.file_select.click();
                  }}
                >
                  Keystore file
                </Button>
              </div>
              <input
                className="d-none"
                ref="file_select"
                type="file"
                onChange={this.getWalletDetailFromKeystoreFile}
              />
            </div>
          )
        }

        <Modal
          isOpen={this.state.isShowPrivateKeyModal}
          toggle={this.togglePrivateKeyModal}
          centered
        >
          <ModalBody>
            <form onSubmit={e => {
              e.preventDefault();
              this.togglePrivateKeyModal();
              this.getWalletDetailFromPrivateKey();
            }}>
              <div>
                <button type="button" className="close" aria-label="Close"
                        onClick={this.togglePrivateKeyModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="d-flex flex-column justify-content-center text-center">
                <div className="g-margin">
                  <h3>Enter your Private Key</h3>
                </div>
                <input
                  className="g-margin"
                  type="password"
                  value={this.state.walletDetail.privateKey}
                  onChange={e => this.changeWalletDetail("privateKey", e.target.value)}
                />
                <Button
                  className="g-margin"
                  color="primary g-margin"
                  onClick={e => {
                    this.togglePrivateKeyModal();
                    this.getWalletDetailFromPrivateKey();
                  }}
                >
                  Import
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
