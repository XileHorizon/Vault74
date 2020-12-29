import { Client, ThreadID } from "@textile/hub";

interface Message {
  _id: string,
  sender: string,
  at: number,
  type: string,
  payload: any,
}

const messageSchema = <Message>{
  _id: '',
  sender: '',
  at: Date.now(),
  type: '',
  payload: {},
};

export class MessageManager {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async ensureCollection(threadID: ThreadID) {
    await this.client.getCollectionIndexes(
      threadID,
      'messages',
    ).catch(async () => {
      await this.client.newCollectionFromObject(
        threadID,
        messageSchema,
        {
          name: 'messages',
        },
      );
    });
  }

  async addNewMessage(threadID: ThreadID, message: Message) : Promise<ThreadID> {
    await this.ensureCollection(threadID);
    await this.client.create(threadID, 'messages', [message]);
    return threadID;
  }

  async getMessages(threadID: ThreadID) : Promise<Message[]> {
    return new Promise(async (resolve) => {
      let messages = await this.client.find(
        threadID,
        'messages',
        {},
      ).catch((err) => {
        // Collection not found
        resolve([]);
      }) || [];
      resolve(<Array<Message>>messages);
    });
  }

  async subscribe(threadID: ThreadID, callback: CallableFunction) : Promise<any> {
    const cb = (update: any) => {
      if (!update || !update.instance) return;
      callback(update);
    };

    const filters = [
      {
        collectionName: 'messages',
      },
      {
        actionTypes: ['CREATE'],
      },
    ];

    const closer = this.client.listen(threadID, filters, cb);
    return closer;
  }
}