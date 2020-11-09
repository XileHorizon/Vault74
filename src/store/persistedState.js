import createPersistedState from 'vuex-persistedstate';

export const cookieStorage = {
  getItem: key => localStorage.getItem(key),
  setItem: (key, value) => {
    localStorage[key] = value;
  },
  removeItem: key => delete localStorage[key],
};

export const persistedStateConfig = {
  key: '_vuex',
  filter({ type }) {
    // Don't store route state in cookie
    return !type.startsWith('route/');
  },
  storage: cookieStorage,
};

export default createPersistedState(persistedStateConfig);
