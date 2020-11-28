<template>
  <div>
   
  </div>
</template>

<script>
import { Howl } from 'howler';

const callingSound = new Howl({
  src: ['https://ipfs.io/ipfs/QmRdxeQF53abUesaFC8qmoNJ5FLS8LBuSyCmcXT5VhuKSm'],
  loop: true,
  volume: 1.0,
  html5: true,
});

const hangupSound = new Howl({
  src: ['https://ipfs.io/ipfs/QmWrRi5tdKZy3iqcR8mum9hFBbZ8qgvekhEM3Y4PD1TK28'],
  volume: 1.0,
  html5: true,
});

console.log('calling', callingSound);

export default {
  name: 'MediaManager',
  mediaStream: null,
  peer: null,
  activeCall: null,
  remoteStream: null,
  audioStream: null,
  answer: () => {},
  methods: {
    playRemoteStream(e) {
      this.audioStream = new Audio();
      this.audioStream.muted = false;
      this.audioStream.srcObject = e;
      this.audioStream.play();
    },
    // Create a new media stream (audio)
    // if one has not yet been created
    createMediaStream() {
      if (this.mediaStream) return this.mediaStream;
      const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      return new Promise((resolve) => {
        getUserMedia({ audio: true }, (stream) => {
          this.mediaStream = stream;
          resolve(this.mediaStream);
        }, (err) => {
          window.Vault74.warn('Failed to get Media Stream.', err);
        });
      });
    },
    // Call a peer and send the media stream
    async call(peerId) {
      if (!this.mediaStream) {
        await this.createMediaStream();
      }
      callingSound.play();
      this.activeCall = this.peer.call(peerId, this.mediaStream);
      this.activeCall.on('stream', (remoteStream) => {
        callingSound.stop();
        console.log('they picked up', remoteStream);
        this.remoteStream = remoteStream;
        this.playRemoteStream(this.remoteStream);
      });
    },
    denyCall() {
      callingSound.pause();
      window.Vault74.Peer2Peer.hangup();
    },
  },
  mounted() {
    // Watch for triggers to initiate calls.
    window.Vault74.Peer2Peer.bindCall(async (id) => {
      await this.createMediaStream();
      this.call(id);
    });
    window.Vault74.Peer2Peer.bindHangup(async () => {
      callingSound.stop();
      hangupSound.play();
      if (this.remoteStream) {
        this.remoteStream = null;
      }
      if (this.activeCall) {
        this.activeCall.close();
        this.activeCall = null;
      }
      this.$store.commit('activeCaller', false);
      this.$store.commit('connectMediaStream', false);
    });

    const conn = () => {
      if (window.Vault74.Peer2Peer) {
        // Get the connected peer object.
        // TODO: make sure we are connected to the services first.
        this.peer = window.Vault74.Peer2Peer.getPeer();
        // When a peer calls us, we will answer the call if we have approved.
        this.peer.on('call', async (call) => {
          callingSound.play();
          call.on('close', () => {
            window.Vault74.Peer2Peer.send(call.peer, 'call-status', 'ended');
            window.Vault74.Peer2Peer.hangup();
          });
          this.$store.commit('activeCaller', call.peer);
          this.activeCall = call;

          await this.createMediaStream();

          this.answer = () => {
            console.log('answered call');
            this.$store.commit('connectMediaStream', call.peer);
            call.answer(this.mediaStream);
            call.on('stream', (remoteStream) => {
              console.log('we answered answered, upstream stream', remoteStream);
              callingSound.stop();
              this.remoteStream = remoteStream;
              this.playRemoteStream(this.remoteStream);
            });
          };
          window.Vault74.Peer2Peer.bindAnswer(async () => {
            this.answer();
          });
        });
      } else {
        window.Vault74.warn('Peer not instatiated yet, retrying...');
        setTimeout(() => {
          conn();
        }, 500);
      }
    };
    conn();
  },
};
</script>

<style scoped lang="less">
</style>