<template src="./Main.html"></template>

<script>
import InfoBar from '@/components/main/convorsation/InfoBar/InfoBar';
import Chatbar from '@/components/main/convorsation/Chatbar/Chatbar';
import VoiceVideo from '@/components/main/convorsation/VoiceVideo/VoiceVideo';
import Convorsation from '@/components/main/convorsation/Convorsation/Convorsation';

import sampleMessages from './sampleMessages';

const callSound = new Audio('https://ipfs.io/ipfs/QmRdxeQF53abUesaFC8qmoNJ5FLS8LBuSyCmcXT5VhuKSm');
const hangupSound = new Audio('https://ipfs.io/ipfs/QmWrRi5tdKZy3iqcR8mum9hFBbZ8qgvekhEM3Y4PD1TK28');
const newMessageSound = new Audio('https://ipfs.io/ipfs/QmV7bZ3RSppXePC299kfUjpdLBsAptmSDrtvvSmBJh1cmB');
// const connectedSound = new Audio('https://ipfs.io/ipfs/QmSHtz5kSvX8JNZKMfkm6PjqScxoC864bmGd2g3ycwRqK1');

export default {
  name: 'Main',
  components: {
    InfoBar,
    Chatbar,
    Convorsation,
    VoiceVideo,
  },
  methods: {
    // Switch from one media stream to another
    switchTo(voice = false) {
      this.mediaOpen = true;
      this.voice = voice;
    },
    // Enter a voice or video call
    toggleMedia(voice = false) {
      this.voice = voice;
      this.mediaOpen = !this.mediaOpen;
      if (!this.mediaOpen) {
        this.voice = false;
        clearTimeout(this.playCallSoundTimer);
        callSound.pause();
        hangupSound.play();
      }
      if (this.mediaOpen) {
        const playCallSound = (iteration, max) => {
          callSound.play();
          if (iteration <= max) {
            this.playCallSoundTimer = setTimeout(() => {
              playCallSound(iteration + 1, max);
            }, 4600);
          }
        };
        playCallSound(0, 1);
      }
    },
    // Send a message in the chat, this will probably
    // be rewritten when the chat is functional
    sendMessage(data, type, sender = 'RetroPronghorn', photo) {
      newMessageSound.play();
      /* eslint-disable */
      this.messages.push({
          id: Date.now(),
          type: 'message-group',
          user: {
          name: sender,
          photo: photo || 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
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
  mounted() {
    setTimeout(() => {
      this.sendMessage(
        'Don\'t worry, I\'m just a robot sending example messages for testing.',
        'text',
        'Sophie Chain',
        'https://randomuser.me/api/portraits/women/43.jpg',
      );
    }, 18000);
    setTimeout(() => {
      this.sendMessage(
        'Make sure you poke around the app, a lot of work is being done.',
        'text',
        'Sophie Chain',
        'https://randomuser.me/api/portraits/women/43.jpg',
      );
    }, 28000);
    setTimeout(() => {
      this.sendMessage(
        'You can upload files and stuff right now!',
        'text',
        'Sophie Chain',
        'https://randomuser.me/api/portraits/women/43.jpg',
      );
    }, 32000);
    setTimeout(() => {
      this.sendMessage(
        'One more thing, take a look through the settings.',
        'text',
        'Sophie Chain',
        'https://randomuser.me/api/portraits/women/43.jpg',
      );
    }, 35000);
  },
  data() {
    return {
      mediaOpen: false,
      voice: false,
      playCallSoundTimer: null,
      /* eslint-disable */
      messages: sampleMessages,
    };
    /* eslint-enable */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Main.less"></style>
