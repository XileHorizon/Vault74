import Message from './Message.ts';

export default class MessageBroker {
  /** @constructor
   * Construct a new Message Broker
   * @argument peerId the local peer ID
   * @argument update callback method to update our application with new messages
   */
  constructor(peerId, update) {
    this.storage = JSON.parse(localStorage.getItem('vault74.messageHistory')) || {};
    this.peerId = peerId;
    this.update = update;
  }

  /** @function
   * @name addToConvo
   * Add a new message to the convorsation object
   * @argument id id of the remote chatter
   * @argument message message object containing the type of message and content
   */
  addToConvo(id, message) {
    this.storage[id] = this.storage[id] ? [...this.storage[id], message] : [message];
    localStorage.setItem('vault74.messageHistory', JSON.stringify(this.storage));
    this.update(this.storage);
  }

  /** @function
   * @name recievedMessage
   * Handle a newly recived message from a remote peer
   * @argument sender remote id of the person who sent the message
   * @argument at time the message was recived
   * @argument type string type of the message
   * @argument data payload recived from the message
   */
  recievedMessage(sender, at, type, data) {
    const message = new Message(sender, at, data.type, data.data);
    this.addToConvo(`${this.peerId}::${sender}`, message);
  }

  /** @function
   * @name sentMessage
   * Handle a newly sent message to a remote peer
   * @argument to remote id of the person who we sent the message
   * @argument at time the message was sent
   * @argument type string type of the message
   * @argument data payload sent in the message
   */
  sentMessage(to, at, type, data) {
    const message = new Message(this.peerId, at, type, data);
    this.addToConvo(`${this.peerId}::${to}`, message);
  }

  /** @function
   * @name getConvorsationGroup
   * Get a object of the current convorsation
   * @argument id id of the remote chatter to get the group from
   */
  getConvorsationGroup(id) {
    return this.storage[id];
  }

  /** @function
   * @name stringify
   * Abstraction of stringifying the message so we can change this at will
   * @argument msg message object to stringify
   */
  static stringify(msg) {
    return JSON.stringify(msg);
  }

  /** @function
   * @name parse
   * Abstraction of parsing the message so we can change this at will
   * @argument msg message object to parse
   */
  static parse(msg) {
    return JSON.parse(msg);
  }
}
