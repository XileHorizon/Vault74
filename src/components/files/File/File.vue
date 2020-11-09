<template>
  <div id="file">
    <a :href="file.url" target="_blank" class="icon">
      <i class="fas fa-file-download"></i>
    </a>
    <div class="fileInfo">
      <div class="filename">{{file.filename}}</div>
      <span class="heading">{{bytesToSize(file.size)}}</span>
    </div>
    <div class="close" v-on:click="deleteFile">
      <i class="fa fa-times"></i>
    </div>
    <div class="preview">
      <img :src="file.url" alt="" />
    </div>
  </div>
</template>

<script>
import IPFSUtils from '@/utils/IPFSUtils';

export default {
  name: 'File',
  props: [
    'file',
    'updateParent',
  ],
  methods: {
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      // eslint-disable-next-line
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      // eslint-disable-next-line
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    deleteFile() {
      IPFSUtils.removeFileFromCache(this.file);
      this.updateParent();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .close {
    display: none;
  }
  #file:hover .close {
    display: block;
  }
  .icon {
    width: 45px;
    float: left;
    font-size: 20pt;
    cursor: pointer;
    padding-top: 1.2rem;
  }
  .close {
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    background-color: red;
    width: 25px;
    height: 25px;
    text-align: center;
    border-radius: 50%;
  }
  .fileInfo {
    width: calc(80% - 65px);
    float: left;
  }
  .preview {
    max-width: 60px;
    height: 100%;
    float: right;
  }
  .preview img {
    max-width: 80px;
    max-height: 100%;
    float: right;
    border-radius: 6px;
    padding: 0.25rem;
  }
  .filename {
    width: 90%;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #file {
    position: relative;
    width: calc(50% - 1rem);
    height: 45px;
    float: left;
    margin: 0.5rem;
    border-radius: 3px;
    background-color: #eee;
  }
  h3 {
    font-family: 'Major Mono Display', monospace;
    font-size: 20pt;
  }
</style>
