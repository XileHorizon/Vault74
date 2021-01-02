// @ts-ignore
import MessageUtils from '@/utils/MessageUtils';
import IMessage from '../../interfaces/IMessaage';

export default {
  clearTypingUsers(state: any) {
    // eslint-disable-next-line
    state.typingUsers = {};
  },
  // Create a new active chat
  newChat(state: any, clientId: string) {
    const { activeChats } = state;
    if (!activeChats.includes(clientId)) {
      activeChats.unshift(clientId);
    }
    // eslint-disable-next-line no-param-reassign
    state.activeChats = activeChats;
  },
  userTyping(state: any, payload: any) {
    // eslint-disable-next-line
    state.typingUsers[payload[0]] = payload[1];
  },
  // Group messages by sender for cleanliness.
  updateMessages(state: any, messages: IMessage[]) {
    // eslint-disable-next-line no-param-reassign
    state.messages = MessageUtils.group(messages);
  },
  markRead(state: any, opts: any) {
    // eslint-disable-next-line no-param-reassign
    state.unreads = Object.assign(state.unreads, {
      [opts.address]: opts.messageID,
    });
  },
};
