export default {
  // Used to hotswitch dark mode from anywhere in the app
  toggleDarkMode(state) {
    // eslint-disable-next-line no-param-reassign
    state.settings.darkMode = !state.settings.darkMode;
  },
  toggleSidebar(state) {
    // eslint-disable-next-line
    state.sidebarOpen = !state.sidebarOpen;
  },
  activeChat(state, address) {
    // eslint-disable-next-line no-param-reassign
    state.activeChat = address;
  },
  // Change the mian route of the application
  changeRoute(state, route) {
    // eslint-disable-next-line no-param-reassign
    state.mainRoute = route;
  },
  // eslint-disable-next-line
  chatWith(state, address) {
    const { activeChats } = state;
    const filteredOutAddy = activeChats.filter(a => a !== address);
    filteredOutAddy.unshift(address);
    // eslint-disable-next-line
    state.activeChats = filteredOutAddy;
  },
  toggleUserInfo(state) {
    // eslint-disable-next-line
    state.showUser = !state.showUser;
  },
};
