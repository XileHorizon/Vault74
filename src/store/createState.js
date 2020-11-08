const defaultState = {
  // Settings
  settings: {
    darkMode: false,
  },
  // Web3
  web3Stats: false,
  accounts: false,
  gasPrice: 36,
  activeAccount: false,
  balance: 0,
  // Network
  availableProviders: ['MetaMask'],
  selectedProvider: 'MetaMask',
  // Profile
  dwellerAddress: false,
  username: '',
  profilePictureHash: false,
  recentFiles: [],
};

const createState = customState => Object.assign({}, defaultState, customState);

export default createState;
