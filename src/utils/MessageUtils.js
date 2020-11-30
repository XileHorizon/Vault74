export default {
  group(messages) {
    const groupedMessages = {};
    Object.keys(messages).forEach((messageGroup) => {
      const currentGrouping = messages[messageGroup];
      const newGrouping = [];
      let lastMessageFrom = false;
      let lastMessageAt = false;
      let tempGroup = [];
      currentGrouping.forEach((message, i) => {
        const split = () => {
          newGrouping.push(tempGroup);
          tempGroup = [message];
          lastMessageFrom = message.sender;
        };
        if (lastMessageAt && message.at - lastMessageAt > 120000) {
          split();
        } else if (!lastMessageFrom || lastMessageFrom === message.sender) {
          lastMessageFrom = message.sender;
          tempGroup.push(message);
        } else {
          split();
        }
        if (i === currentGrouping.length - 1) {
          newGrouping.push(tempGroup);
        }
        lastMessageAt = message.at;
      });
      groupedMessages[messageGroup] = newGrouping;
    });
    return groupedMessages;
  },
};
