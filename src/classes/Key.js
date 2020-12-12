import Web3EthAccounts from 'web3-eth-accounts';

export default class Key {
  constructor(web3) {
    if (!web3) {
      const w3 = new Web3EthAccounts();
      this.account = w3.create();
    } else {
      this.account = web3.eth.accounts.create();
    }
  }

  getAccount() {
    return this.account.address;
  }

  getPublicKey() {
    return this.account.address;
  }

  getPrivateKey() {
    return this.account.privateKey;
  }

  encrypt(password) {
    return this.account.encrypt(password);
  }

  decrypt(password) {
    return this.account.decrypt(password);
  }
}
