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
  expectedPrice: 0,
  invertRate: 0,
  errorMsg: '',
  walletDetail: {
    privateKey: '',
    address: '',
    tokens: []
  },
  swapDetail: {
    source: {
      token: CONSTANTS.TOKEN_LIST[0],
      value: ''
    },
    destiny: {
      token: CONSTANTS.TOKEN_LIST[1],
      value: ''
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.provider = new Provider();
    this.lastUpdateId = 1;
    this.lastTimeoutId = null;
  }

  componentDidMount() {
    this.updateRate(this.state.swapDetail.source, this.state.swapDetail.destiny, CONSTANTS.NETWORK_MIN_ACCEPT_AMOUNT, null);
  }

  reset = () => {
    this.setState(initState, () => {
      this.updateRate(this.state.swapDetail.source, this.state.swapDetail.destiny, CONSTANTS.NETWORK_MIN_ACCEPT_AMOUNT, null);
    });
  };

  clearLastTimeout = () => {
    if (this.lastTimeoutId) {
      clearTimeout(this.lastTimeoutId);
      this.lastTimeoutId = null;
    }
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
      this.provider.getAllBalancesTokenAtLatestBlock(address, CONSTANTS.TOKEN_LIST)
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
        this.provider.getAllBalancesTokenAtLatestBlock(address, CONSTANTS.TOKEN_LIST)
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
    this.clearLastTimeout();
    let swapDetail = JSON.parse(JSON.stringify(this.state.swapDetail));
    swapDetail[key][type] = value;
    if (type === "value" && this.state.expectedPrice) {
      if (key === "source") {
        swapDetail.destiny.value = (swapDetail.source.value * this.state.expectedPrice).toFixed(CONSTANTS.PRECISION);
      } else {
        swapDetail.source.value = (swapDetail.destiny.value / this.state.expectedPrice).toFixed(CONSTANTS.PRECISION);
      }
    }
    this.setState({
      errorMsg: '',
      swapDetail
    }, () => {
      const { swapDetail } = this.state;
      this.updateRate(swapDetail.source, swapDetail.destiny, swapDetail.source.value, key === 'source' ? 'destiny' : 'source');
    });
  };

  updateRate = (source, destiny, decimalAmount, updateTarget) => {
    this.lastUpdateId++;
    const currentUpdateId = this.lastUpdateId;
    this.setState({isUpdateRate: true});
    const reUpdateRate = () => {
      this.clearLastTimeout();
      const timeoutId = setTimeout(() => {
        this.updateRate(source, destiny, decimalAmount, updateTarget);
      }, CONSTANTS.TIME_TO_UPDATE_RATE);
      this.lastTimeoutId = timeoutId;
    };
    this.provider.getLatestBlock()
      .then(latestBlockNo => {
        const amount = Utils.toHex((decimalAmount ? decimalAmount : CONSTANTS.NETWORK_MIN_ACCEPT_AMOUNT) * Math.pow(10, 18));
        this.provider.getRateAtSpecificBlock(source.token.address, destiny.token.address, amount, latestBlockNo)
          .then(data => {
            if (currentUpdateId !== this.lastUpdateId) {
              return;
            }
            let expectedPrice = parseInt(data.expectedPrice.toString())/Math.pow(10, 18);
            if (expectedPrice === 0) {
              this.setState({
                errorMsg: "System cannot handle your swap at the moment, please reduce your swap value"
              });
              this.updateRate(source, destiny, CONSTANTS.NETWORK_MIN_ACCEPT_AMOUNT, updateTarget);
              return;
            }
            let swapDetail = JSON.parse(JSON.stringify(this.state.swapDetail));
            if (updateTarget && (source.value || destiny.value)) {
              if (updateTarget === 'destiny') {
                swapDetail[updateTarget].value = (source.value * expectedPrice).toFixed(CONSTANTS.PRECISION);
              } else {
                swapDetail[updateTarget].value = (destiny.value / expectedPrice).toFixed(CONSTANTS.PRECISION);
              }
            }
            let invertRate = (1 / expectedPrice).toFixed(CONSTANTS.PRECISION);
            if (updateTarget && swapDetail.source.value && swapDetail.destiny.value) {
              invertRate = (swapDetail.source.value / swapDetail.destiny.value).toFixed(CONSTANTS.PRECISION);
            }
            this.setState({
              isUpdateRate: false,
              expectedPrice,
              invertRate,
              swapDetail
            }, () => {
              reUpdateRate();
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
        <div className="g-margin g-padding">
          <h3>DatMD KNTest</h3>
        </div>
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
          {
            this.state.errorMsg ? (
              <div className="error-msg col-12 g-margin g-padding text-center">
                <span>{this.state.errorMsg}</span>
              </div>
            ) : ""
          }
          <div className="invert-rate-container d-flex justify-content-start align-items-center g-margin g-padding">
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
