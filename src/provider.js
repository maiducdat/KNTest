import Web3 from 'web3';
import CONSTANTS from './constants';
import * as Utils from './utils';

export default class Provider {
  constructor() {
    this.initWeb3();
  }

  initWeb3() {
    this.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {});
    this.networkContract = new this.web3.eth.Contract(CONSTANTS.KYBER_NETWORK, CONSTANTS.NETWORK_ADDRESS);
    this.wrapperContract = new this.web3.eth.Contract(CONSTANTS.KYBER_WRAPPER, CONSTANTS.WRAPPER_ADDRESS);
  }

  convertHexToDecimal(hex) {
    let numberString = this.web3.utils.hexToNumberString(hex);
    numberString = (parseFloat(numberString)/Math.pow(10, 18)).toFixed(CONSTANTS.PRECISION);
    return numberString;
  }

  getLatestBlock() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlockNumber().then((block) => {
        resolve(block);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  getAllBalancesTokenAtLatestBlock(address, tokens) {
    let listToken = [];
    let listSymbol = [];
    Object.keys(tokens).map(index => {
      let token = tokens[index];
      listToken.push(token.address);
      listSymbol.push(token.symbol);
      return null;
    });

    return new Promise((resolve, reject) => {
      this.wrapperContract.methods.getBalances(address, listToken).call().then(result => {
        if (result.length !== listToken.length){
          reject("Error!");
        }
        let listTokenBalances = [];
        listSymbol.map((symbol, index) => {
          listTokenBalances.push({
            symbol: symbol,
            balance: result[index] ? result[index]: "0"
          });
          return null;
        });
        resolve(listTokenBalances);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }

  getRateAtSpecificBlock(source, dest, amount, latestBlockNo) {
    let mask = Utils.maskNumber();
    let srcAmountEnableFistBit = Utils.sumOfTwoNumber(amount,  mask);
    srcAmountEnableFistBit = Utils.toHex(srcAmountEnableFistBit);
    let data = this.networkContract.methods.getExpectedRate(source, dest, srcAmountEnableFistBit).encodeABI();

    return new Promise((resolve, reject) => {
      this.web3.eth.call({
        to: CONSTANTS.NETWORK_ADDRESS,
        data: data
      }, latestBlockNo)
        .then(result => {
          if (result === "0x") {
            resolve({
              expectedPrice: "0",
              slippagePrice: "0"
            });
            return;
          }
          try {
            let rates = this.web3.eth.abi.decodeParameters([{
              type: 'uint256',
              name: 'expectedPrice'
            }, {
              type: 'uint256',
              name: 'slippagePrice'
            }], result);
            resolve(rates);
          } catch (e) {
            reject(e);
          }
        }).catch((err) => {
        console.log(err);
        reject(err);
      })
    });
  }
}