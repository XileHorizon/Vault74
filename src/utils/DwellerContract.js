import * as DwellerID from '@/contracts/DwellerID.json';

export default {
  getContract(address = false) {
    const contract = address ?
      new window.web3.eth.Contract(DwellerID.abi, address) :
      new window.web3.eth.Contract(DwellerID.abi);
    contract.options.data = DwellerID.data.bytecode.object;
    return contract;
  },
  deploy(_username, account, tx, done) {
    const username = window.web3.utils.fromAscii(_username);
    const contract = this.getContract();
    contract.deploy({
      arguments: [username],
    }).send({
      from: account,
      gas: 4700000,
    })
      .once('transactionHash', tx)
      .once('confirmation', done);
  },
  setPhoto(address, account, ipfsHash, done) {
    const contract = this.getContract(address);
    contract.methods.setPhoto([
      window.web3.utils.fromAscii(ipfsHash.path.substring(0, 23)),
      window.web3.utils.fromAscii(ipfsHash.path.substring(23)),
    ])
      .send({
        from: account,
        gas: 4700000,
      })
      .once('transactionHash', done);
  },
  // TODO: this is sloppy.
  async getDweller(address, done) {
    const contract = this.getContract(address);
    const dweller = await contract.methods.getDweller().call();
    let onChainPhotoHash = await contract.methods.getPhoto().call();
    onChainPhotoHash = onChainPhotoHash.substr(0, 48) + onChainPhotoHash.substr(66, 46);
    onChainPhotoHash = window.web3.utils.toAscii(onChainPhotoHash);
    done(dweller, onChainPhotoHash);
  },
  async getDwellerAsync(address) {
    return new Promise((resolve) => {
      this.getDweller(address, (dweller, onChainPhotoHash) => {
        resolve(dweller, onChainPhotoHash);
      });
    });
  },
  async getPhotoAsync(address) {
    return new Promise((resolve) => {
      this.getDweller(address, (_, onChainPhotoHash) => {
        resolve(onChainPhotoHash);
      });
    });
  },
};
