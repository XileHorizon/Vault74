import Peer from 'peerjs';
import config from '@/config/config';
import PeerConnection from './PeerConnection';

const messageFormatter = (type, data) => JSON.stringify({ type, data });

export default class Peer2Peer {
  constructor(peerId, watcher = () => {}) {
    const settings = {
      host: config.peer.network[config.env].host,
      port: config.peer.network[config.env].port,
      path: config.peer.network[config.env].path,
      key: config.peer.network[config.env].key,
      secure: config.peer.network[config.env].secure,
      debug: config.debug ? 0 : 2,
      config: {
        iceServers: config.peer.network[config.env].iceServers,
      },
    };

    this.peerId = peerId;
    this.channels = {};
    this.ICEEstablished = false;
    this.watcher = watcher;

    const peer = new Peer(this.peerId, settings);

    this.peer = peer;
    // We've connected to the ICE service
    peer.on('open', () => {
      this.ICEEstablished = true;
      this.watcher(peerId, 'alive', true);
      window.Vault74.debug('Connected to ICE service');
      // Connect to peers and retry connections every 3 seconds.
      this.connectToPeers();
      // A new client has made a connection to us
      peer.on('connection', (conn) => {
        const remotePeerId = conn.peer;
        const peerConntion = this.channels[`${this.peerId}::${remotePeerId}`];
        conn.on('open', () => {
          setTimeout(() => {
            if (peerConntion) {
              peerConntion.bindGateway(conn);
              this.peerTracker(remotePeerId);
            }
          }, 500);
        });
      });
    });
  }

  /** @function
   * @name peerTracker
   * Checks and provides the status of a peer
   * @argument peerId the id of the peer to update
   */
  peerTracker(peerId) {
    this.ping(peerId);
    setInterval(() => {
      window.Vault74.debug('Registered Peers');
      this.ping(peerId);
    }, config.peer.ping_interval);
  }

  /** @function
   * @name createChannels
   * Create a peer connection for each peer provided
   * @argument peers array of peer ids to create connections for
   */
  createChannels(peers) {
    peers.forEach((peer) => {
      if (!this.channels[`${this.peerId}::${peer.address}`]) {
        this.createDataChannel(peer.address);
        if (this.ICEEstablished) this.connectToPeers();
      }
    });
  }

  /** @function
   * @name connectToPeers
   * Establish a connection to all registered PeerConnections
   */
  connectToPeers() {
    // Establish connection to all new peers
    Object.keys(this.channels).forEach((ch) => {
      const channel = this.channels[ch];
      if (channel.getStatus().code < 2) {
        channel.connect();
      }
    });
    // eslint-disable-next-line no-console
    if (config.debug) console.table(this.channels);
  }

  /** @function
   * @name createDataChannel
   * Create a new data channel for a given peerid
   * @argument peerId peer ID to create the channel for
   */
  createDataChannel(peerId) {
    this.channels[`${this.peerId}::${peerId}`] = new PeerConnection(
      this.peer,
      peerId,
      (type, data) => {
        this.internalWatcher(peerId, type, data);
      },
    );
    return this.channels[`${this.peerId}::${peerId}`];
  }

  internalWatcher(peer, type, data) {
    // Hoist watcher methods
    this.watcher(peer, type, data);
    window.Vault74.debug(`${peer} -> `, type, data);
  }

  ping(peerId) {
    const peerConntion = this.channels[`${this.peerId}::${peerId}`];
    peerConntion.send(messageFormatter('ping', Date.now()));
  }

  send(peerId, type, data) {
    const peerConntion = this.channels[`${this.peerId}::${peerId}`];
    peerConntion.send(messageFormatter(type, data));
  }
}
