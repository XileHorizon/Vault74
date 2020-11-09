<template src="./Main.html"></template>

<script>
import InfoBar from '@/components/main/convorsation/InfoBar/InfoBar';
import Chatbar from '@/components/main/convorsation/Chatbar/Chatbar';
import VoiceVideo from '@/components/main/convorsation/VoiceVideo/VoiceVideo';
import Convorsation from '@/components/main/convorsation/Convorsation/Convorsation';

import sampleMessages from './sampleMessages';

export default {
  name: 'Main',
  components: {
    InfoBar,
    Chatbar,
    Convorsation,
    VoiceVideo,
  },
  methods: {
    switchTo(voice = false) {
      this.mediaOpen = true;
      this.voice = voice;
    },
    toggleMedia(voice = false) {
      this.voice = voice;
      this.mediaOpen = !this.mediaOpen;
      if (!this.mediaOpen) this.voice = false;
    },
    sendMessage(data, type) {
      /* eslint-disable */
      this.messages.push({
          id: 1,
          type: 'message-group',
          user: {
          name: 'RetroPronghorn',
          photo: 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
          },
          timestamp: Date.now(),
          content: [
            {
              id: 1,
              type: type || 'text',
              data: data,
            },
          ],
      });
      /* eslint-enable */
    },
  },
  data() {
    return {
      mediaOpen: false,
      voice: false,
      /* eslint-disable */
      messages: sampleMessages,
    };
    /* eslint-enable */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Main.less"></style>
