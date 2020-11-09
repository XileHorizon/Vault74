<template src="./FileUploadInline.html"></template>

<script>
import config from '@/config/config';
import IPFSUtils from '@/utils/IPFSUtils';

export default {
  name: 'FileUploadInline',
  props: [
    'relayResult',
    'uploadDone',
  ],
  data() {
    return {
      link: false,
      ipfsHash: false,
      selectedFile: false,
      progress: 0,
      config,
    };
  },
  methods: {
    reset() {
      this.link = false;
      this.ipfsHash = false;
      this.selectedFile = false;
      this.progress = 0;
    },
    getURL() {
      return URL.createObjectURL(this.selectedFile);
    },
    sendFileMessage() {
      if (this.ipfsHash) {
        this.relayResult({
          url: `${config.ipfs.browser}${this.ipfsHash}`,
          hash: this.ipfsHash,
          type: this.selectedFile.type,
          size: this.selectedFile.size,
          filename: this.selectedFile.name,
        });
        this.$store.commit('addRecentFile');
      }
    },
    setFile(event) {
      [this.selectedFile] = event.target.files;
      this.sendToIpfs(this.selectedFile);
    },
    async sendToIpfs(file) {
      const ipfsResponse = await window.ipfs.add(
        file,
        {
          progress: (length) => {
            // eslint-disable-next-line
            let percent = ((length / this.selectedFile.size) * 100).toFixed(0);
            this.progress = percent;
            if (percent > 100) {
              this.progress = 100;
            }
          },
        },
      );
      this.ipfsHash = ipfsResponse.path;
      IPFSUtils.appendFileCache({
        at: Date.now(),
        url: `${config.ipfs.browser}${this.ipfsHash}`,
        hash: this.ipfsHash,
        type: this.selectedFile.type,
        size: this.selectedFile.size,
        filename: this.selectedFile.name,
      });
      this.uploadDone();
      this.$nextTick(() => {
        this.$refs.hidden.focus();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./FileUploadInline.less"></style>
