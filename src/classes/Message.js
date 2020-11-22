import { v4 as uuidv4 } from 'uuid';

export default class Message {
  constructor(sender, at, type, payload) {
    this.id = uuidv4();
    this.sender = sender;
    this.at = at;
    this.type = type;
    this.payload = payload;
  }
}
