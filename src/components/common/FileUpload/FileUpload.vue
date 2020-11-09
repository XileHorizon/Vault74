<template src="./FileUpload.html"></template>

<script>
import config from '@/config/config';
import IPFSUtils from '@/utils/IPFSUtils';

export default {
  name: 'FileUpload',
  props: [
    'file',
    'relayResult',
    'close',
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
  mounted() {
    this.selectedFile = this.file || false;
    if (this.file) this.sendToIpfs(this.selectedFile);
  },
  methods: {
    getURL() {
      return URL.createObjectURL(this.selectedFile);
    },
    sendFileMessage() {
      if (this.ipfsHash) {
        this.relayResult(
          {
            url: `${config.ipfs.browser}${this.ipfsHash}`,
            hash: this.ipfsHash,
            type: this.selectedFile.type,
            size: this.selectedFile.size,
            filename: this.selectedFile.name,
          },
          // TODO: Support MP4
          this.selectedFile.type.includes('image') ? 'image' : 'file',
        );
        // TODO: move this to it's own localStorage object or indexedDB
        IPFSUtils.appendFileCache({
          at: Date.now(),
          url: `${config.ipfs.browser}${this.ipfsHash}`,
          hash: this.ipfsHash,
          type: this.selectedFile.type,
          size: this.selectedFile.size,
          filename: this.selectedFile.name,
        });
        this.$store.commit('addRecentFile');
        this.close();
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
      this.$nextTick(() => {
        this.$refs.hidden.focus();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./FileUpload.less"></style>
