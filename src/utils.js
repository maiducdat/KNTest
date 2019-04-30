import * as ethUtil from 'ethereumjs-util';
import BigNumber from 'bignumber.js'

export function getAddressFromPrivateKey(privateKey){
  let addBuf = ethUtil.privateToAddress(new Buffer(privateKey, 'hex'));
  let addrString = ethUtil.bufferToHex(addBuf);
  return addrString
}

export function maskNumber() {
  let initNumber = new BigNumber(2);
  return "0x" + (initNumber.pow(255).toString(16));
}

export function sumOfTwoNumber(_num1, _num2){
  let num1 = new BigNumber(_num1.toString());
  let num2 = new BigNumber(_num2.toString());
  let sum = num1.plus(num2);
  return sum.toString()
}

export function toHex(number){
  let bigNumber = new BigNumber(number);
  return "0x" + bigNumber.toString(16);
}