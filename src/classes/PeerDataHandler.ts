export default class PeerDataHandler {
  store: any;
  lexicon: any;
  constructor(store: any) {
    console.log('store', store);
    this.store = store;

    this.lexicon = {
      heartbeat: this.heartbeat,
      dead: this.dead,
      alive: this.alive,
      message: this.message,
      'typing-notice': this.typingNotice,
      'call-status': this.callStatus,
    };
  }

  dispatch(peer: string, type: string, data: string) {
    if (this.lexicon[type]) {
      this.lexicon[type](peer, type, data, this.store);
    }
  }

  message(peer: string, type: string, data: string) {
    // @ts-ignore
    window.Vault74.messageBroker.recievedMessage(
      peer,
      Date.now(),
      type,
      JSON.parse(data),
    );
  }
  
  heartbeat(peer: string, _type: string, _data: string, store: any) {
    store.commit('peerHealth', [peer, 'alive']);
  }

  dead(peer: string, _type: string, _data: string, store: any) {
    store.commit('peerHealth', [peer, 'dead']);
  }

  alive(_peer: string, _type: string, _data: string, store: any) {
    store.commit('ICEConnected', true);
  }

  typingNotice(peer: string, _type: string, data: string, store: any) {
    store.commit('userTyping', [peer, JSON.parse(data).data]);
  }

  callStatus(_peer: string, _type: string, data: string) {
    if (JSON.parse(data).data === 'ended') {
      // @ts-ignore
      window.Vault74.Peer2Peer.hangup();
    }
  }
}