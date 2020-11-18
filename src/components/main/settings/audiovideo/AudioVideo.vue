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
      audioDevices: [],
      videoDevices: [],
    };
  },
  async mounted() {
    const devices = await navigator.mediaDevices.enumerateDevices({ audio: true, video: true });
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
