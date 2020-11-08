export default {
  setSetting(state, key, value) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.settings[key] = value;
  },
  toggleDarkMode(state) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.settings.darkMode = !state.settings.darkMode;
  },
  web3Stats(state, stats) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.web3Stats = stats;
  },
  accounts(state, accounts) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.accounts = accounts;
  },
  defaultAccount(state) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.activeAccount = state.activeAccount || state.accounts[0];
    if (!state.accounts.includes(state.activeAccount)) {
      // Detect account changes
      // eslint-disable-next-line no-plusplus,no-param-reassign
      [state.activeAccount] = state.accounts;
    }
  },
  balance(state, balance) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.balance = balance;
  },
  dwellerAddress(state, address) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.dwellerAddress = address;
  },
  profilePictureHash(state, hash) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.profilePictureHash = hash;
  },
  addRecentFile(state, file) {
    // eslint-disable-next-line no-plusplus,no-param-reassign
    state.recentFiles = [...state.recentFiles, file];
  },
};
