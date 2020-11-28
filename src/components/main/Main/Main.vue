<template src="./Main.html"></template>

<script>
import InfoBar from '@/components/main/convorsation/InfoBar/InfoBar';
import Chatbar from '@/components/main/convorsation/Chatbar/Chatbar';
import VoiceVideo from '@/components/main/convorsation/VoiceVideo/VoiceVideo';
import Convorsation from '@/components/main/convorsation/Convorsation/Convorsation';
import NoConvorsation from '@/components/main/convorsation/Convorsation/NoConvorsation';
import sampleMessages from './sampleMessages';

const callSound = new Audio('https://ipfs.io/ipfs/QmRdxeQF53abUesaFC8qmoNJ5FLS8LBuSyCmcXT5VhuKSm');
const hangupSound = new Audio('https://ipfs.io/ipfs/QmWrRi5tdKZy3iqcR8mum9hFBbZ8qgvekhEM3Y4PD1TK28');
// const connectedSound = new Audio('https://ipfs.io/ipfs/QmSHtz5kSvX8JNZKMfkm6PjqScxoC864bmGd2g3ycwRqK1');

export default {
  name: 'Main',
  components: {
    InfoBar,
    Chatbar,
    Convorsation,
    VoiceVideo,
    NoConvorsation,
  },
  methods: {
    // Switch from one media stream to another
    switchTo(voice = false) {
      this.mediaOpen = true;
      this.voice = voice;
    },
    makeCall() {
      this.$store.commit('connectMediaStream', this.$store.state.activeChat);
      // TODO: Start calling sound
      window.Vault74.Peer2Peer.call(this.$store.state.activeChat);
      this.voice = true;
      this.mediaOpen = true;
    },
    hangup() {
      window.Vault74.Peer2Peer.hangup();
      window.Vault74.Peer2Peer.send(this.$store.state.activeChat, 'call-status', 'ended');
      this.voice = false;
      this.mediaOpen = false;
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
      if (window.Vault74.messageBroker) {
        window.Vault74.messageBroker.sentMessage(
          this.$store.state.activeChat,
          Date.now(),
          'message',
          {
            type: type || 'text',
            data,
          },
        );
      }
      window.Vault74.Peer2Peer.send(
        this.$store.state.activeChat,
        'message',
        {
          type: type || 'text',
          data,
        },
      );
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
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'connectMediaStream') {
        // Connect to new peer.
        if (state.activeMediaStreamPeer) {
          this.voice = true;
        }
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Main.less"></style>
