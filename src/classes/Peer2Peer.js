import PeerChannel from './PeerChannel';

export default class Peer2Peer {
  channels = {};
  peer = false;
  active = false;

  constructor(peerId) {
    this.peerId = peerId;
  }

  createDataChannel(host, client) {
    this.channels[`${host}::${peer}`] = new PeerChannel(host, client);
  }
}
