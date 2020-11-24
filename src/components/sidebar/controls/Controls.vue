<template src="./Controls.html"></template>

<script>
import Mousetrap from 'mousetrap';
import CircleIcon from '@/components/common/CircleIcon';
import config from '@/config/config';

const muteAudio = new Audio('https://ipfs.io/ipfs/QmVk362FGmwfsXBj5zMv4x1Hp7Mp9RbYDMxsDXRAx5vyUo');
// eslint-disable-next-line
const unmuteAudio = new Audio('https://ipfs.io/ipfs/QmWxv18LqpcaMhXVd1BLm9z9k1MfWDNexJ22dC6vLkdyro');

const deafenAudio = new Audio('https://ipfs.io/ipfs/Qmf4QinBSDk9AgvqsiaaZ2ZmhCfTwcSRpAgSCTxLGyZkyg');
const unDeafenAudio = new Audio('https://ipfs.io/ipfs/QmSHtz5kSvX8JNZKMfkm6PjqScxoC864bmGd2g3ycwRqK1');

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
      tooltip: 'Copy Account',
      config,
    };
  },
  methods: {
    copied() {
      const original = this.tooltip;
      this.tooltip = 'Copied!';
      setTimeout(() => {
        this.tooltip = original;
      }, 1000);
    },
    // Non functional placeholder mute function
    toggleMute() {
      this.muted = !this.muted;
      if (this.muted) muteAudio.play();
      if (!this.muted) unmuteAudio.play();
    },
    // Non functional placeholder deafen function
    toggleDeafen() {
      this.deafened = !this.deafened;
      if (this.deafened) deafenAudio.play();
      if (!this.deafened) unDeafenAudio.play();
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
