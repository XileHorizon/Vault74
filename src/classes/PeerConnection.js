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
      if (config.debug) console.log('Not seeing a heartbeat, lets reconnect.');
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
    this.gateway.send(data);
  }

  /* eslint-disable */
  handleIncomingData(data) {
    const message = messageParser(data);
    switch (message.type) {
      case 'ping':
        this.send(messageFormatter('pong', Date.now()));
        break;
      case 'pong':
        this.lastHeartbeat = Date.now();
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
