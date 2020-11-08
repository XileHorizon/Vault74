<template>
  <section class="controls">
    <div class="profile">
        <CircleIcon :image="`https://ipfs.io/ipfs/${$store.state.profilePictureHash}`" />
        <p class="online"><i class="fa fa-circle"></i></p>
    </div>
    <div class="userinfo has-tooltip-arrow" data-tooltip="0x12ef831290...">
        <p>{{$store.state.username || 'Anon'}}</p>
        <p class="address">Super awesome status...</p>
    </div>
    <div class="usercontrols">
        <i :class="`fas fa-microphone ${muted ? 'red' : ''}`" v-on:click="toggleMute" ></i>
        <i :class="`fas fa-headphones-alt ${deafened ? 'red' : ''}`" v-on:click="toggleDeafen"></i>
        <i class="fa fa-cog" v-on:click="toggleSettings"></i>
    </div>
  </section>
</template>

<script>
import Mousetrap from 'mousetrap';
import CircleIcon from '@/components/common/CircleIcon';

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
<style scoped>
    .red {
        color: #ee5253;
    }
    .controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      padding-top: 5px;
      position: absolute;
      border-top: 1px solid #e7ebee;
      background: #fff;
    }
    .controls-active {
        color: #00d0a1;
        font-weight: bold;
    }
    .controls-active:hover {
        color: #00d0a1;
        font-weight: bold;
        font-size: 12pt;
    }
    .userinfo {
        width: calc(50% - 30px);
        padding-top: 0.3rem;
        height: 100%;
        float: left;
    }
    .usercontrols {
        width: calc(50% - 25px);
        float: left;
        height: 100%;
        text-align: right;
        padding: 1rem 0.75rem 0 0;
    }
    .usercontrols i {
        font-size: 16pt;
        padding: 0.1rem 0.4rem;
    }
    .usercontrols i:hover {
        cursor: pointer;
    }
    .profile {
        float: left;
        height: 100%;
        width: 55px;
        padding: 0.4rem;
        position: relative;
    }
    .online {
        position: absolute;
        right: 5px;
        bottom: 2px;
        color: #00d0a1;
    }
    .true {
        color: #00d0a1;
    }
    .controls .circle-icon {
        width: 40px;
        height: 40px;
        float: left;
    }
    .address {
        font-size: 8pt;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #bbb;
    }
</style>
