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
      dwellerCachingHelper: new DwellerCachingHelper(config.registryAddress),
    };
  },
  methods: {
    reset() {
      this.error = false;
      this.friendAddress = '';
      this.friend = false;
    },
    close() {
      this.$store.commit('changeRoute', 'main');
    },
    async addFriend() {
      if (!window.web3.utils.isAddress(this.friendAddress)) {
        this.error = 'Whoops, that\'s not a valid address';
        return;
      }
      const friend = await this.dwellerCachingHelper.getDweller(this.friendAddress);
      if (!friend) {
        this.error = 'Hmm, we couldn\'t find a vault dweller at that address';
        return;
      }
      this.error = false;
      this.friend = friend;
    },
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
