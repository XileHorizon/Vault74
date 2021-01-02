import MessageUtils from '@/utils/MessageUtils';

export default {
  clearTypingUsers(state) {
    // eslint-disable-next-line
    state.typingUsers = {};
  },
  // Create a new active chat
  newChat(state, clientId) {
    const { activeChats } = state;
    if (!activeChats.includes(clientId)) {
      activeChats.unshift(clientId);
    }
    // eslint-disable-next-line no-param-reassign
    state.activeChats = activeChats;
  },
  userTyping(state, payload) {
    // eslint-disable-next-line
    state.typingUsers[payload[0]] = payload[1];
  },
  // Group messages by sender for cleanliness.
  updateMessages(state, messages) {
    // eslint-disable-next-line no-param-reassign
    state.messages = MessageUtils.group(messages);
  },
  markRead(state, opts) {
    // eslint-disable-next-line no-param-reassign
    state.unreads = Object.assign(state.unreads, {
      [opts.address]: opts.messageID,
    });
  },
};
