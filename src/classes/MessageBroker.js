import Message from './Message';

export default class MessageBroker {
  constructor(peerId, update) {
    this.storage = JSON.parse(localStorage.getItem('vault74.messageHistory')) || {};
    this.peerId = peerId;
    this.update = update;
  }

  addToConvo(id, message) {
    this.storage[id] = this.storage[id] ? [...this.storage[id], message] : [message];
    localStorage.setItem('vault74.messageHistory', JSON.stringify(this.storage));
    this.update(this.storage);
  }

  recievedMessage(sender, at, type, data) {
    const message = new Message(sender, at, data.type, data.data);
    this.addToConvo(`${this.peerId}::${sender}`, message);
  }

  sentMessage(to, at, type, data) {
    const message = new Message(this.peerId, at, type, data);
    this.addToConvo(`${this.peerId}::${to}`, message);
  }

  getConvorsationGroup(id) {
    return this.storage[id];
  }

  static stringify(msg) {
    return JSON.stringify(msg);
  }

  static parse(msg) {
    return JSON.parse(msg);
  }
}
