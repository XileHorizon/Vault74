import files from './mutations/files';
import friends from './mutations/friends';
import ui from './mutations/ui';
import media from './mutations/media';
import messaging from './mutations/messaging';
import peer from './mutations/peer';
import account from './mutations/account';

export default {
  ...friends,
  ...files,
  ...ui,
  ...media,
  ...messaging,
  ...peer,
  ...account,
  screenShareRequest(state) {
    // eslint-disable-next-line
    state.screenShareRequest = Date.now();
  },
  // Used to set a specific setting in key vaule storage
  // only do this from the settings page components
  setSetting(state, key, value) {
    // eslint-disable-next-line no-param-reassign
    state.settings[key] = value;
  },
  // Called when web3 updates
  web3Stats(state, stats) {
    // eslint-disable-next-line no-param-reassign
    state.web3Stats = stats;
  },
  criticalError(state, err) {
    // eslint-disable-next-line no-param-reassign
    state.criticalError = err;
  },
  clear(state) {
    // eslint-disable-next-line no-param-reassign
    state.criticalError = false;
  },
};
