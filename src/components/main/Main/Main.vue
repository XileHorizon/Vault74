<template src="./Main.html"></template>

<script>
import InfoBar from '@/components/main/convorsation/InfoBar/InfoBar';
import Chatbar from '@/components/main/convorsation/Chatbar/Chatbar';
import VoiceVideo from '@/components/main/convorsation/VoiceVideo/VoiceVideo';
import Convorsation from '@/components/main/convorsation/Convorsation/Convorsation';
import NoConvorsation from '@/components/main/convorsation/Convorsation/NoConvorsation';
import sampleMessages from './sampleMessages';

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
      }
    },
    // Send a message in the chat, this will probably
    // be rewritten when the chat is functional
    sendMessage(data, type) {
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
