<template src="./File.html"></template>

<script>
import IPFSUtils from '@/utils/IPFSUtils';
import FileIconMapper from '@/utils/FileIconMapper';

export default {
  name: 'File',
  props: [
    'file',
    'updateParent',
  ],
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    // Converts the bytes to a readable string
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      // eslint-disable-next-line
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      // eslint-disable-next-line
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    // Remove the file from the local cache, not IPFS
    deleteFile() {
      IPFSUtils.removeFileFromCache(this.file);
      this.updateParent();
    },
    // Traanslates the filetype to a fontawesome icon class
    translateFiletype(filetype) {
      return FileIconMapper.translateFiletype(filetype, FileIconMapper.mappings);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./File.less"></style>
