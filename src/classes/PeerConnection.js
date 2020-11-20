import config from '@/config/config';

const messageParser = msg => JSON.parse(msg);
const messageFormatter = (type, data) => JSON.stringify({ type, data });

export default class PeerConnection {
  constructor(peer, remoteId, watcher) {
    // Which ID do we go by on the network
    this.remoteId = remoteId;
    this.remotePeerConnection = null;
    // Reference to main Peer object
    this.peer = peer;
    // Current connection status
    this.status = null;
    // Handle new messages
    this.watcher = watcher;
    // Remote connection proxy
    this.gateway = false;
    this.lastHeartbeat = Date.now();
    this.lastPulse = 0;
    this.latency = 0;
  }

  connect() {
    this.remotePeerConnection = this.peer.connect(this.remoteId);
    this.status = {
      code: 1,
      message: 'awaiting-connection',
    };
    this.watcher('status', this.status);
    this.lastHeartbeat = Date.now();
    // We have connected to a client
    this.remotePeerConnection.on('open', () => {
      this.status = {
        code: 2,
        message: 'connected',
      };
      this.watcher('status', this.status);
      this.remotePeerConnection.on('data', (data) => {
        this.handleIncomingData(data);
      });
    });
    this.checkHeartbeat();
  }

  reconnect() {
    this.remotePeerConnection.close();
    this.connect();
  }

  checkHeartbeat() {
    if (Date.now() - this.lastHeartbeat > config.peer.heartbeat_timeout) {
      window.Vault74.warn(`Not seeing a heartbeat from ${this.remoteId}, attempting to reconnect.`);
      this.watcher('dead', this.lastHeartbeat);
      this.reconnect();
    }
    setTimeout(() => {
      this.checkHeartbeat();
    }, config.peer.check_heartbeat);
  }

  bindGateway(gateway) {
    this.established = true;
    this.gateway = gateway;
    this.status = {
      code: 3,
      message: 'gateway-created',
    };
    this.watcher('status', this.status);
  }

  send(data) {
    if (this.gateway) this.gateway.send(data);
  }

  /* eslint-disable */
  handleIncomingData(data) {
    const message = messageParser(data);
    switch (message.type) {
      case 'ping':
        this.lastPulse = Date.now();
        this.send(messageFormatter('pong', this.lastPulse));
        break;
      case 'pong':
        this.lastHeartbeat = Date.now();
        this.latency = this.lastHeartbeat - this.lastPulse;
        this.watcher('heartbeat', this.latency);
        break;
      default:
        this.watcher('data', data);
        break;
    }
  }
  /* eslint-enable */

  getStatus() {
    return this.status || {
      code: 0,
      message: 'unknown',
    };
  }
}
