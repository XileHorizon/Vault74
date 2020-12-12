export default {
  // Add a new friend to the local cache
  addFriend(state, friend) {
    const { friends } = state;
    if (friends.filter(f => f.address === friend.address).length === 0) {
      friends.push(friend);
    }
    // eslint-disable-next-line
    friends.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
    // eslint-disable-next-line no-param-reassign
    state.friends = friends;
    // storage
    const bucket = window.Vault74.Database.Bucket('friends');
    bucket.add(friend);
  },
  async fetchFriends(state) {
    const bucket = window.Vault74.Database.Bucket('friends');
    const friends = await bucket.get();
    // eslint-disable-next-line
    state.friends = friends;
  },
  clearFriends(state) {
    // eslint-disable-next-line
    state.friends = null;
  },
};
