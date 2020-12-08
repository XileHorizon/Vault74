import Web3 from 'web3';
import * as Web3Utils from 'web3-utils';
import config from '@/config/config';

export default class Ethereum {
  constructor(web3Provider) {
    this.netConfig = config.network;
    if (window.ethereum) {
      this.pollBindWeb3();
    } else {
      this.web3 = new Web3(web3Provider === 'user-provided' ? this.fetchProvider() : Web3.givenProvider);
      console.log('provider', this.fetchProvider());
    }
    // Abstract bindings to prevent API changes breaking Vault74
    this.createBindings();
    this.localAccount = localStorage.getItem('Vault74.eth.account') ?
      JSON.parse(localStorage.getItem('Vault74.eth.account')) : null;
  }

  pollBindWeb3() {
    if (window.web3) {
      this.web3 = window.web3;
    } else {
      setTimeout(() => {
        this.pollBindWeb3();
      }, 500);
    }
  }

  fetchProvider() {
    return this.netConfig.eth[localStorage.getItem('Vault74.provider')] || this.netConfig.eth.default;
  }

  createBindings() {
    this.eth = this.getEth();
    this.utils = Web3Utils;
  }

  getEth() {
    return this.web3.eth;
  }

  getContract(abi, address) {
    return this.web3.eth.Contract(abi, address);
  }

  getAccount() {
    if (!this.localAccount) {
      const acc = this.eth.accounts.create();
      this.localAccount = {
        address: acc.address,
        nonce: acc.nonce,
        privateKey: acc.privateKey,
      };
      localStorage.setItem('Vault74.eth.account', JSON.stringify(this.localAccount));
    }
    return this.localAccount;
  }

  signTransaction(tx) {
    return this.eth.accounts.signTransaction(tx, this.localAccount.privateKey);
  }

  executeTransaction(method, account, tx, done) {
    if (this.localAccount) {
      this.signTransaction(method)
        .once('transactionHash', tx)
        .once('confirmation', done);
    } else {
      console.log('remoteAccount', method);
      method
        .send({
          from: account,
          gas: 4700000,
        })
        .once('transactionHash', tx)
        .once('confirmation', done);
    }
  }
}
