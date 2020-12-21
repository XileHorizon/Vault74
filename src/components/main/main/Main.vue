<template src="./Main.html"></template>

<script>
import InfoBar from '@/components/main/conversation/infobar/InfoBar';
import Chatbar from '@/components/main/conversation/chatbar/Chatbar';
import VoiceVideo from '@/components/main/conversation/voicevideo/VoiceVideo';
import Conversation from '@/components/main/conversation/conversation/Conversation';
import NoConversation from '@/components/main/conversation/conversation/NoConversation';
import UserInfo from '@/components/main/conversation/userinfo/UserInfo';

export default {
  name: 'Main',
  components: {
    InfoBar,
    Chatbar,
    Conversation,
    VoiceVideo,
    NoConversation,
    UserInfo,
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
            data: encodeURI(data),
          },
        );
      }
      window.Vault74.Peer2Peer.send(
        this.$store.state.activeChat,
        'message',
        {
          type: type || 'text',
          data: encodeURI(data),
        },
      );
    },
  },
  data() {
    return {
      mediaOpen: false,
      voice: false,
      playCallSoundTimer: null,
    };
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
