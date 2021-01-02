export default {
  // Set the audio device
  setAudioDevice(state, device) {
    // eslint-disable-next-line no-param-reassign
    state.audioDevice = device;
  },
  // Set the audio device
  setVideoDevice(state, device) {
    // eslint-disable-next-line no-param-reassign
    state.videoDevice = device;
  },
  connectMediaStream(state, peer) {
    // eslint-disable-next-line no-param-reassign
    state.activeMediaStreamPeer = peer;
    // eslint-disable-next-line no-param-reassign
    state.pendingMediaStream = true;
  },
  activeCaller(state, caller) {
    // eslint-disable-next-line no-param-reassign
    state.activeCaller = caller;
  },
  muted(state, muted) {
    // eslint-disable-next-line no-param-reassign
    state.muted = muted;
  },
  deafened(state, deafened) {
    // eslint-disable-next-line no-param-reassign
    state.deafened = deafened;
  },
};
