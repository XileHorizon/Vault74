import Bucket from './Bucket';
import { LocalStorageInterface } from './interfaces/LocalStorage';

/* eslint-disable */
export default class Database {
  /** @constructor
   * Construct a Database
   * Provides key-value and relational storage
   * @argument name the name of the database
   */
  constructor(name) {
    this.name = name;
    this.prefix = 'vdb.';
    this.interface;
    this.availableInterfaces = [
      LocalStorageInterface,
    ];

    this.creds = false;
  }

  /** 
   * @method
   * Used to authenticate connections and encrypt data
   * @argument id identity
   * @argument pass password
   */
  authenticate(id, pass) {
    this.creds = {
      id,
      pass,
    };
    this.interface = new LocalStorageInterface(
      this.prefix,
      this.creds,
    );
  }

  /** 
   * @method
   * Construct a Drawer
   * A drawer stores data in a key-value structure
   * @argument name the name of the bucket
   */
  Drawer(name) {
    // TODO
    return null;
  }

  /** 
   * @method
   * Construct a Bucket
   * A bucket stores data in a relational structure
   * @argument name the name of the bucket
   */
  Bucket(name) {
    return new Bucket(name, this);
  }
}
