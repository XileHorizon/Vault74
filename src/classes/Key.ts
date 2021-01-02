import Web3EthAccounts from 'web3-eth-accounts';

export default class Key {
  account: any;

  constructor(web3: any) {
    if (!web3) {
      // @ts-ignore
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

  encrypt(password: string) {
    return this.account.encrypt(password);
  }

  decrypt(password: string) {
    return this.account.decrypt(password);
  }
}
