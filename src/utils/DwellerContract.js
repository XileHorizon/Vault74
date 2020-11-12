import * as DwellerID from '@/contracts/DwellerID.json';

// useful methods to interact with the DwellerID contract
export default {
  /** @function
   * @name getContract
   * @argument address Address of the DwellerID contract
   * @returns contract instance ready for method execution
   */
  getContract(address = false) {
    const contract = address ?
      new window.web3.eth.Contract(DwellerID.abi, address) :
      new window.web3.eth.Contract(DwellerID.abi);
    contract.options.data = DwellerID.data.bytecode.object;
    return contract;
  },
  /** @function
   * @name deploy
   * @argument _username inital username to deploy the contract with
   * @argument account to deploy the contract from, this will be the owner
   * @argument tx callback which will be called when the transaction is made
   * @argument done callback to be called when the first confirmation comes through
   */
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
  /** @function
   * @name setPhoto
   * @argument address Address of the DwellerID contract
   * @argument account account to use for the transaction
   * @argument ipfsHash hash referencing the inital profile picture
   * @argument done callback which will be called on the first TX & confirm.
   * @returns dweller payload which contains all information about the dweller
   */
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
      .once('transactionHash', done)
      .once('confirmation', done);
  },
  /** @function
   * @name getDwellerAsync
   * @argument address Address of the DwellerID contract
   * @argument done callback which will return the dweller info
   * @returns dweller payload which contains all information about the dweller
   */
  async getDweller(address, done) {
    const contract = this.getContract(address);
    const dweller = await contract.methods.getDweller().call();
    if (!dweller) {
      done(false, false);
      return;
    }
    let onChainPhotoHash = await contract.methods.getPhoto().call();
    onChainPhotoHash = onChainPhotoHash.substr(0, 48) + onChainPhotoHash.substr(66, 46);
    onChainPhotoHash = window.web3.utils.hexToString(onChainPhotoHash);
    done(dweller, onChainPhotoHash);
  },
  /** @function
   * @name getDwellerAsync
   * @argument address Address of the DwellerID contract
   * @returns dweller payload which contains all information about the dweller
   */
  async getDwellerAsync(address) {
    return new Promise((resolve) => {
      this.getDweller(address, (dweller, onChainPhotoHash) => {
        resolve(dweller, onChainPhotoHash);
      });
    });
  },
  /** @function
   * @name getPhotoAsync
   * @argument address Address of the DwellerID contract
   * @returns ipfs photo hash assigned to the dweller contract
   */
  async getPhotoAsync(address) {
    return new Promise((resolve) => {
      this.getDweller(address, (_, onChainPhotoHash) => {
        resolve(onChainPhotoHash);
      });
    });
  },
  /** @function
   * @name getDwellerAddress
   * @argument address Address of the DwellerID contract
   * @returns owner address of the dweller contract
   */
  async getDwellerAddress(address) {
    const contract = this.getContract(address);
    const dweller = await contract.methods.getDwellerAddress().call();
    return dweller;
  },
  /** @function
   * @name getDwellerName
   * @argument address Address of the DwellerID contract
   * @returns name of the dweller who owns this contract
   */
  async getDwellerName(address) {
    const contract = this.getContract(address);
    const dwellerName = await contract.methods.getDwellerName().call();
    return dwellerName;
  },
};
