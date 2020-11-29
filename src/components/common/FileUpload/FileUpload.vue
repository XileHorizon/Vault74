<template src="./FileUpload.html"></template>

<script>
import config from '@/config/config';
import IPFSUtils from '@/utils/IPFSUtils';
import FileC from '@/classes/FileC';

const uploadAudio = new Audio(`${config.ipfs.browser}${config.sounds.upload}`);

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
      fileClass: false,
    };
  },
  mounted() {
    this.selectedFile = this.file || false;
    if (this.file) this.sendToIpfs(this.selectedFile);
  },
  methods: {
    // Returns a local url for the file preview
    getURL() {
      return URL.createObjectURL(this.selectedFile);
    },
    // Determines which type of file we're sending out in the message
    determineFileType(type) {
      let ft = 'file';
      if (type.includes('image')) ft = 'image';
      if (type.includes('audio')) ft = 'audio';
      if (type.includes('video')) ft = 'video';
      return ft;
    },
    // Sends the file info out ready for messaging to the parent component
    sendFileMessage() {
      if (this.ipfsHash) {
        this.fileClass = new FileC(
          `${config.ipfs.browser}${this.ipfsHash}`,
          this.ipfsHash,
          this.selectedFile,
        );
        this.relayResult(
          this.fileClass.getObject(),
          this.determineFileType(this.selectedFile.type),
        );
        // TODO: move this to it's own localStorage object or indexedDB
        IPFSUtils.appendFileCache(this.fileClass.getObject());
        uploadAudio.play();
        this.$store.commit('addRecentFile');
        this.close();
      }
    },
    // Sets the active file ready for processing
    setFile(event) {
      [this.selectedFile] = event.target.files;
      this.sendToIpfs(this.selectedFile);
    },
    // Uploads the file to IPFS
    async sendToIpfs(file) {
      this.$store.commit('setStatus', 'Uploading file to IPFS');
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
      this.$store.commit('setStatus', 'File uploaded to IPFS');
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
