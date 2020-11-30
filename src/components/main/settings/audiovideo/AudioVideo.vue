<template>
  <div>
    <h3 class="label">Audio</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Audio Input Device</h2>
        <p>Select which input device you'd like people to hear your silky smooth voice from.</p>
        <div class="select">
          <select v-model="$store.state.audioDevice">
            <option v-for="device in audioDevices" :key="device.deviceId">{{device.label || 'Default Microphone'}}</option>
          </select>
        </div>
        <hr class="spacer">
        <h2>Audio Output Device</h2>
        <p>Select the device that you'd like to deliver sound to your ear holes with.</p>
        <div class="select">
          <select>
            <option>Default Audio Output</option>
          </select>
        </div>
        <hr class="spacer">
        <h2>Audio Bitrate</h2>
        <p>Higher bitrates will transmit better quality audio, lowering the bitrate can help with slower connection speeds.</p>
        <div class="select">
          <select v-model="$store.state.audioQuality">
            <option value="8">8kbps</option>
            <option value="64">64kbps</option>
            <option value="96">96kbps</option>
            <option value="256">256kbps</option>
            <option value="320">320kbps (MP3)</option>
            <option value="700">700kbps (Why?)</option>
            <option value="1411">1411kbps (FLAC)</option>
          </select>
        </div>
        <hr class="spacer">
        <h2>Sample Size</h2>
        <p>A higher sample size will give you a broader dynamic range of audio. Higher samples will require better connection speeds.</p>
        <div class="select">
          <select v-model="$store.state.audioSamples">
            <option value="2">2bits</option>
            <option value="8">8bits</option>
            <option value="24">24bits</option>
            <option value="32">32bits</option>
          </select>
        </div>
        <hr class="spacer">
        <h2>Echo Cancellation</h2>
        <p>Enable to help cancel out some slight echo &amp; feedback from your mic.</p>
        <label class="checkbox">
          <input type="checkbox" v-model="$store.state.echoCancellation">
          Echo Cancellation Enabled
        </label>
        <hr class="spacer">
        <h2>Noise Supression</h2>
        <p>Enable to help hide background noise in your environment.</p>
        <label class="checkbox">
          <input type="checkbox" v-model="$store.state.noiseSuppression">
          Supression Enabled
        </label>
        
      </div>
    </article>
    <h3 class="label">Video</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Video Input Device</h2>
        <p>Select which video device you'd like to share your beautiful smile from.</p>
        <div class="select">
          <select v-model="$store.state.videoDevice">
            <option v-for="device in videoDevices" :key="device.deviceId">{{device.label || 'Default Webcam'}}</option>
          </select>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'AudioVideo',
  data() {
    return {
      devices: false,
      audioQuality: 320,
      audioDevices: [],
      videoDevices: [],
    };
  },
  async mounted() {
    const devices = await navigator.mediaDevices.enumerateDevices({ audio: true, video: true });
    this.audioQuality = this.$store.state.audioQuality;
    this.devices = devices;
    devices.forEach((device) => {
      if (device.kind === 'videoinput') this.videoDevices.push(device);
      if (device.kind === 'audioinput') this.audioDevices.push(device);
    });
    if (!this.$store.state.selectedVideoDevice) {
      this.$store.commit('setVideoDevice', this.videoDevices[0].label || 'Default Webcam');
    }
    if (!this.$store.state.selectedAudioDevice) {
      this.$store.commit('setAudioDevice', this.audioDevices[0].label || 'Default Microphone');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
