import Peer from 'peerjs';
import config from '@/config/config';
import PeerConnection from './PeerConnection';

const messageFormatter = (type, data) => JSON.stringify({ type, data });

export default class Peer2Peer {
  constructor(peerId, watcher = () => {}) {
    this.peerId = peerId;
    this.channels = {};
    this.ICEEstablished = false;
    this.watcher = watcher;
    this.peer = new Peer(this.peerId);
    // We've connected to the ICE service
    this.peer.on('open', () => {
      this.ICEEstablished = true;
      if (config.debug) console.log('Connected to ICE service');
      // Connect to peers and retry connections every 3 seconds.
      this.connectToPeers();
    });
    // A new client has made a connection to us
    this.peer.on('connection', (conn) => {
      const remotePeerId = conn.peer;
      const peerConntion = this.channels[`${this.peerId}::${remotePeerId}`];
      conn.on('open', () => {
        peerConntion.bindGateway(conn);
        this.peerTracker(remotePeerId);
      });
    });
  }

  peerTracker(peerId) {
    this.ping(peerId);
    setInterval(() => {
      this.ping(peerId);
    }, config.peer.ping_interval);
  }

  createChannels(peers) {
    peers.forEach((peer) => {
      if (!this.channels[`${this.peerId}::${peer.address}`]) {
        this.createDataChannel(peer.address);
        if (this.ICEEstablished) this.connectToPeers();
      }
    });
  }

  connectToPeers() {
    // Establish connection to all new peers
    Object.keys(this.channels).forEach((ch) => {
      const channel = this.channels[ch];
      if (channel.getStatus().code < 2) {
        channel.connect();
      }
    });
  }

  createDataChannel(client) {
    this.channels[`${this.peerId}::${client}`] = new PeerConnection(
      this.peer,
      client,
      (type, data) => {
        this.internalWatcher(client, type, data);
      },
    );
    return this.channels[`${this.peerId}::${client}`];
  }

  internalWatcher(peer, type, data) {
    // Hoist watcher methods
    this.watcher(type, data);
    if (config.debug) console.log(`${peer}:`, type, data);
  }

  ping(peerId) {
    const peerConntion = this.channels[`${this.peerId}::${peerId}`];
    peerConntion.send(messageFormatter('ping', Date.now()));
  }
}
