<template src="./Controls.html"></template>

<script>
import Mousetrap from 'mousetrap';
import CircleIcon from '@/components/common/CircleIcon';
import config from '@/config/config';

const muteAudio = new Audio('https://raw.githubusercontent.com/RetroPronghorn/VoiceRTC/master/public/sounds/mute.ogg');
// eslint-disable-next-line
const unmuteAudio = new Audio('https://raw.githubusercontent.com/RetroPronghorn/VoiceRTC/master/public/sounds/unmute.ogg');

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
    toggleMute() {
      this.muted = !this.muted;
      if (this.muted) muteAudio.play();
      if (!this.muted) unmuteAudio.play();
    },
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
