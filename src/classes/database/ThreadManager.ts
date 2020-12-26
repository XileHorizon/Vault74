import { Client, ThreadID } from '@textile/hub';

export default class ThreadManager {
  storageMethod: string
  client: Client

  constructor(storageMethod = 'LocalStorage', textileClient: Client) {
    this.storageMethod = storageMethod;
    this.client = textileClient;
  }

  storeThread(identifier: string, threadId: ThreadID) : string {
    localStorage.setItem(`v74.threadManager.${identifier}`, threadId.toString());
    return threadId.toString();
  }

  fetchThread(identifier: string) : string | null {
    return localStorage.getItem(`v74.threadManager.${identifier}`);
  }

  async threadAt(identifier: string) : Promise<ThreadID> {
    const existingThreadID = this.fetchThread(identifier);

    if (existingThreadID) {
      return ThreadID.fromString(
        existingThreadID,
      );
    }

    const threadID: ThreadID = await this.client.newDB(
      undefined,
      `${identifier}-${Date.now()}`,
    );

    return threadID;
  }
}