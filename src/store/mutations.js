export default {
  // Used to set a specific setting in key vaule storage
  // only do this from the settings page components
  setSetting(state, key, value) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.settings[key] = value;
  },
  // Used to hotswitch dark mode from anywhere in the app
  toggleDarkMode(state) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.settings.darkMode = !state.settings.darkMode;
  },
  // Called when web3 updates
  web3Stats(state, stats) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.web3Stats = stats;
  },
  // Update the accounts provided from the web3 provider
  accounts(state, accounts) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.accounts = accounts;
  },
  // Update the default account we should use for transactions
  defaultAccount(state) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.activeAccount = state.activeAccount || state.accounts[0];
    if (!state.accounts.includes(state.activeAccount)) {
      // Detect account changes
      // eslint-disable-next-line no-plusplus,no-param-reassign
      [state.activeAccount] = state.accounts;
    }
  },
  // Update the balance of the active web3 account
  balance(state, balance) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.balance = balance;
  },
  // Update the dweller address used for profile information
  dwellerAddress(state, address) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.dwellerAddress = address;
  },
  // Updates the username for the authenticated user
  username(state, username) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.username = username;
  },
  // Updates the profile picture hash for the authenticated user
  profilePictureHash(state, hash) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.profilePictureHash = hash;
  },
  // Add a new file to the the cache locally
  addRecentFile(state) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.recentFiles += 1;
  },
  // Change the mian route of the application
  changeRoute(state, route) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.mainRoute = route;
  },
  // Add a new friend to the local cache
  addFriend(state, friend) {
    const { friends } = state;
    if (friends.filter(f => f.address === friend.address).length === 0) {
      friends.push(friend);
    }
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.friends = friends;
    // TODO make sure we don't already have this friend added.
  },
};
