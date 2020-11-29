export default {
  group(messages) {
    const groupedMessages = {};
    Object.keys(messages).forEach((messageGroup) => {
      const currentGrouping = messages[messageGroup];
      const newGrouping = [];
      let lastMessageFrom = false;
      let tempGroup = [];
      currentGrouping.forEach((message, i) => {
        if (!lastMessageFrom || lastMessageFrom === message.sender) {
          lastMessageFrom = message.sender;
          tempGroup.push(message);
        } else {
          newGrouping.push(tempGroup);
          tempGroup = [message];
          lastMessageFrom = message.sender;
        }
        if (i === currentGrouping.length - 1) {
          newGrouping.push(tempGroup);
        }
      });
      groupedMessages[messageGroup] = newGrouping;
    });
    return groupedMessages;
  },
};
