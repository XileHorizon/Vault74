export default {
  localAccount(state) {
    // eslint-disable-next-line
    state.localAccount = true;
  },
  // Update the accounts provided from the web3 provider
  accounts(state, accounts) {
    // eslint-disable-next-line no-param-reassign
    state.accounts = accounts;
  },
  // Update the default account we should use for transactions
  defaultAccount(state) {
    // eslint-disable-next-line no-param-reassign
    state.activeAccount = state.activeAccount || state.accounts[0];
    if (!state.accounts.includes(state.activeAccount)) {
      // Detect account changes
      // eslint-disable-next-line no-param-reassign
      [state.activeAccount] = state.accounts;
    }
  },
  // Update the balance of the active web3 account
  balance(state, balance) {
    // eslint-disable-next-line no-param-reassign
    state.balance = balance;
  },
  // Update the dweller address used for profile information
  dwellerAddress(state, address) {
    // eslint-disable-next-line no-param-reassign
    state.dwellerAddress = address;
  },
  // Updates the username for the authenticated user
  username(state, username) {
    // eslint-disable-next-line no-param-reassign
    state.username = username;
  },
  // Updates the profile picture hash for the authenticated user
  profilePictureHash(state, hash) {
    // eslint-disable-next-line no-param-reassign
    state.profilePictureHash = hash;
  },
  // Update the application status
  setStatus(state, status) {
    // eslint-disable-next-line no-param-reassign
    state.status = status;
  },
};
