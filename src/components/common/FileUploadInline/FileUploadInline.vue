<template src="./FileUploadInline.html"></template>

<script>
import config from '@/config/config';
import IPFSUtils from '@/utils/IPFSUtils';
import FileC from '@/classes/FileC';

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
      this.fileClass = false;
    },
    getURL() {
      return URL.createObjectURL(this.selectedFile);
    },
    sendFileMessage() {
      if (this.ipfsHash) {
        this.relayResult(this.fileClass.getObject());
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
      this.fileClass = new FileC(
        `${config.ipfs.browser}${this.ipfsHash}`,
        this.ipfsHash,
        this.selectedFile,
      );

      IPFSUtils.appendFileCache(this.fileClass.getObject());
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
