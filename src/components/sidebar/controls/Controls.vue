<template>
  <section class="controls">
    <div class="profile">
        <CircleIcon image="https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4" />
        <p class="online"><i class="fa fa-circle"></i></p>
    </div>
    <div class="userinfo has-tooltip-arrow" data-tooltip="0x12ef831290...">
        <p>RetroProng...</p>
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
import CircleIcon from '@/components/common/CircleIcon';

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
    },
    toggleDeafen() {
      this.deafened = !this.deafened;
    },
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
        height: 55px;
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
        padding: 0.2rem;
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
