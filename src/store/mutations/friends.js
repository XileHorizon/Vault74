import Database from '@/classes/database/Database';

const database = new Database('Vault74Data');
const bucket = database.Bucket('friends');

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
    // TODO make sure we don't already have this friend added.
    bucket.add(friend);
  },
  fetchFriends(state) {
    // eslint-disable-next-line
    state.friends = bucket.get();
  },
};
