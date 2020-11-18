import Peer from 'peerjs';

export default class PeerConnection {
  peer = null; 
  localId = null;
  remoteId = null;
  established = false;

  constructor(localId, remoteId) {
    this.localId = localId;
    this.remoteId = remoteId;
    this.peer = new Peer(localId); 
  }

  connect() {
    this.peer = peer.connect(this.remoteId);
    // We have connected to a client
    conn.on('open', () => {
      this.established = true;
    });
    // A client is connecting
    peer.on('connection', (conn) => {
      // The client has sent us some data
      conn.on('data', (data) => {
        this.handleIncomingData(data);
      });
      // The client has esablished the connection
      conn.on('close', () => {
        this.established = true;
      });
    });
  }

  handleIncomingData(data) {
    console.log('recived some data', data);
  }
}