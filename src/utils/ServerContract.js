import * as Server from '@/contracts/interfaces/Server.json';
import Ethereum from '@/classes/Ethereum';

const ethereum = new Ethereum('user-provided');
// useful methods to interact with the DwellerID contract
export default {
  /** @function
   * @name getContract
   * @argument address Address of the Server contract
   * @returns contract instance ready for method execution
   */
  getContract(address = false) {
    let contract = ethereum.getContract(Server.abi, address);
    contract.options.data = Server.data.bytecode.object;
    return contract;
  },
  /** @function
   * @name setPhoto
   * @argument address Address of the Server contract
   * @argument account account to use for the transaction
   * @argument ipfsHash hash referencing the inital server icon
   * @argument done callback which will be called on the first TX & confirm.
   * @returns server payload which contains all information about the dweller
   */
  async setPhoto(address, account, ipfsHash, done) {
    const contract = this.getContract(address);
    contract.methods.setPhoto([
      ethereum.fromAscii(ipfsHash.path.substring(0, 23)),
      ethereum.fromAscii(ipfsHash.path.substring(23)),
    ])
      .send({
        from: account,
        gas: 4700000,
      })
      .once('transactionHash', done)
      .once('confirmation', done);
  },
};
