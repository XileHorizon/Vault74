<template src="./Controls.html"></template>

<script>
import Mousetrap from 'mousetrap';
import CircleIcon from '@/components/common/CircleIcon';
import config from '@/config/config';

const muteAudio = new Audio('https://ipfs.io/ipfs/QmVk362FGmwfsXBj5zMv4x1Hp7Mp9RbYDMxsDXRAx5vyUo');
// eslint-disable-next-line
const unmuteAudio = new Audio('https://ipfs.io/ipfs/QmWxv18LqpcaMhXVd1BLm9z9k1MfWDNexJ22dC6vLkdyro');

export default {
  name: 'Controls',
  props: ['toggleSettings'],
  components: {
    CircleIcon,
  },
  data() {
    return {
      muted: false,
      deafened: false,
      config,
    };
  },
  methods: {
    // Non functional placeholder mute function
    toggleMute() {
      this.muted = !this.muted;
      if (this.muted) muteAudio.play();
      if (!this.muted) unmuteAudio.play();
    },
    // Non functional placeholder deafen function
    toggleDeafen() {
      this.deafened = !this.deafened;
      if (this.deafened) muteAudio.play();
      if (!this.deafened) unmuteAudio.play();
    },
  },
  mounted() {
    Mousetrap.bind('option+m', this.toggleMute);
    Mousetrap.bind('option+d', this.toggleDeafen);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Controls.less"></style>
