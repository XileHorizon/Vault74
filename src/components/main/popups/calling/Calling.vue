<template src="./Calling.html"></template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'Calling',
  props: ['active', 'callerId'],
  components: {
    CircleIcon,
  },
  methods: {
    acceptCall() {
      window.Vault74.Peer2Peer.answer();
      this.$store.commit('activeChat', this.callerId);
      this.$store.commit('activeCaller', false);
      this.$store.commit('connectMediaStream', this.callerId);
    },
    denyCall() {
      this.$store.commit('activeCaller', false);
      window.Vault74.Peer2Peer.send(this.callerId, 'call-status', 'ended');
      window.Vault74.Peer2Peer.hangup();
    },
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Calling.less"></style>
