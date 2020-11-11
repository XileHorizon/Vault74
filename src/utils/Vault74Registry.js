import * as Vault74Registry from '@/contracts/Vault74Registry.json';
import config from '@/config/config';

const address = config.registry;

export default {
  getContract() {
    const contract = new window.web3.eth.Contract(Vault74Registry.abi, address);
    contract.options.data = Vault74Registry.data.bytecode.object;
    return contract;
  },
  createDwellerId(_username, account, tx, done) {
    const username = window.web3.utils.fromAscii(_username);
    const contract = this.getContract();
    contract.methods.createDweller(username)
      .send({
        from: account,
        gas: 4700000,
      })
      .once('transactionHash', tx)
      .once('confirmation', done);
  },
  async getDwellerContract(account) {
    const contract = this.getContract();
    const dwellerAddress = await contract.methods.getDwellerId(account).call();
    return dwellerAddress;
  },
};
