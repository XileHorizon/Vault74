const defaultState = {
  settings: {
    darkMode: false,
  },
  web3Stats: false,
  accounts: false,
  gasPrice: 36,
  activeAccount: false,
  balance: 0,
  availableProviders: ['MetaMask'],
  selectedProvider: 'MetaMask',
  dwellerAddress: false,
  username: false,
  profilePictureHash: false,
};

const createState = customState => Object.assign({}, defaultState, customState);

export default createState;
