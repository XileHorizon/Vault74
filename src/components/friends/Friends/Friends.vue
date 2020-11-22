<template src="./Friends.html"></template>

<script>
import config from '@/config/config';
import CircleIcon from '@/components/common/CircleIcon';
import DwellerCachingHelper from '@/utils/DwellerCachingHelper';
import Friend from '@/components/friends/Friend/Friend';

export default {
  name: 'Friends',
  components: {
    CircleIcon,
    Friend,
  },
  data() {
    return {
      error: false,
      success: false,
      friend: false,
      friendAddress: '',
      dwellerCachingHelper: new DwellerCachingHelper(
        config.registryAddress,
        config.cacher.dwellerLifespan,
      ),
    };
  },
  methods: {
    chatFriend(clientId) {
      this.$store.commit('newChat', clientId);
      this.$store.commit('activeChat', clientId);
      this.$store.commit('changeRoute', 'main');
    },
    // Cleanup after adding a friend
    reset() {
      this.error = false;
      this.friendAddress = '';
      this.friend = false;
    },
    // Close the component and reroute to main
    close() {
      this.$store.commit('changeRoute', 'main');
    },
    // Do some checks to make sure the friend is valid
    // and then display them if they are found so they
    // can be confirmed and added
    async addFriend() {
      if (!window.web3.utils.isAddress(this.friendAddress)) {
        this.error = 'Whoops, that\'s not a valid address';
        return;
      }
      if (this.friendAddress === this.$store.state.activeAccount) {
        this.error = 'You can\'t add yourself you silly goose.';
        return;
      }
      if (this.$store.state.friends.filter(f => f.address === this.friendAddress).length === 1) {
        this.error = 'You\'re already friends with this dweller.';
        return;
      }
      const friend = await this.dwellerCachingHelper.getDweller(this.friendAddress);
      if (!friend) {
        this.error = 'Hmm, we couldn\'t find a vault dweller at that address';
        return;
      }
      this.error = false;
      this.friend = { ...friend, status: 'unchecked' };
    },
    // Confirms and adds a found friend
    commitFriend() {
      this.$store.commit('addFriend', this.friend);
      this.success = `${this.friend.name} has been added to your friendslist.`;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      this.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Friends.less"></style>
