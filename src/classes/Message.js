import { v4 as uuidv4 } from 'uuid';

export default class Message {
  /** @constructor
   * Construct a new Message
   * @argument sender remote id of the person who sent the message
   * @argument at time the message was recived
   * @argument type string type of the message
   * @argument data payload recived from the message
   */
  constructor(sender, at, type, payload) {
    this.id = uuidv4();
    this.sender = sender;
    this.at = at;
    this.type = type;
    this.payload = payload;
  }
  /** @function
   * @name parseYoutubeLink
   * Check if a message contains a youtube link
   * @argument message the part of the message to check
   * @returns boolean if it matches or not
   */
  parseYoutubeLink() {
    if (typeof this.payload.data !== 'string') return false;
    // eslint-disable-next-line
    const YTRegex = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/;
    return this.payload.data.match(YTRegex);
  }
  /** @function
   * @name parseEthAddress
   * Check if a message contains a ethereum address
   * @argument message the part of the message to check
   * @returns boolean if it matches or not
   */
  parseEthAddress() {
    if (typeof this.payload.data !== 'string') return false;
    // eslint-disable-next-line
    const ETHRegex = /^0x[a-fA-F0-9]{40}$/;
    return this.payload.data.match(ETHRegex);
  }
}
