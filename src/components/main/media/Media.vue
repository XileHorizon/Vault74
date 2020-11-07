<template>
  <section :class="`media-container ${mediaOpen ? 'open' : 'closed'} ${(voice) ? 'media-voice' : 'media-video'}`">
    <div :class="`media-content ${mediaOpen ? 'media-open' : 'media-closed'}`">
      <div class="media-participants container">
        <div class="media-participant">
          <CircleIcon image="https://randomuser.me/api/portraits/women/43.jpg"/>
        </div>
        <div class="media-participant">
          <CircleIcon image="https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4" />
        </div>
      </div>
      <div class="media-controls">
        <button v-if="voice" class="button is-dark is-small" v-on:click="switchTo(false)"><i class="fas fa-video"></i> Switch to Video</button>
        <button v-else class="button is-dark is-small" v-on:click="switchTo(true)"><i class="fas fa-phone"></i> Switch to Voice</button>
        <span class="spacer"></span>
        <button class="button is-danger is-small" v-on:click="disconnect"><i class="fas fa-phone-slash"></i> Disconnect</button>
      </div>
    </div>
  </section>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'Media',
  props: ['mediaOpen', 'voice', 'disconnect', 'switchTo'],
  components: {
    CircleIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .media-container {
      position: absolute;
      top: 3rem;
      left: 0;
      right: 0;
      background: #222;
      transition: height ease-in-out 0.1s;
      overflow: hidden;
      height: 0px;
      color: #fff;
    }
    .media-controls {
      align-content: center;
      text-align: center;
    }
    .media-controls i {
      padding-right: 0.5rem;
    }
    .circle-icon {
      width: 85px;
      height: 85px;
      margin-top: calc(50% - 95px);
    }
    .open {
      height: 17rem;
    }
    .media-voice {
      height: 13rem;
    }
    .media-controls button {
      margin: 0 0.25rem;
    }
    .media-content {
      animation-delay: 1s;
      transition: opacity ease-in 0.1s; 
      opacity: 0;
      height: 100%;
      visibility: hidden;
    }
    .media-voice .media-participants {
      height: 75%;
      align-content: center;
      margin-left: calc(50% - 14.5rem);
      padding-top: 1.5rem;
      padding-bottom: 1rem;
    }
    .media-voice .media-participant {
      height: 100%;
      width: 225px;
      border-radius: 5px;
      background: #00d0a1;
      display: inline-block;
      margin: 0 0.5rem;
    }
    .media-video .media-participants {
      height: 80%;
      align-content: center;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: calc(50% - 325px - 0.5rem);
    }
    .media-video .media-participant {
      height: 100%;
      width: 325px;
      border-radius: 5px;
      background: #00d0a1;
      display: inline-block;
      margin: 0 0.5rem;
    }
    .media-video .circle-icon {
      width: 85px;
      height: 85px;
      margin-top: calc(50% - 110px);
    }
    .media-open {
      visibility: visible;
      opacity: 1;
    }
</style>
