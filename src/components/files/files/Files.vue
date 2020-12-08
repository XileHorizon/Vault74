<template>
  <div id="files" class="noselect">
    <button class="modal-close is-large" aria-label="close" v-on:click="close"></button>
    <h3>Browse files</h3>
    <p>Browse files you've shared with other users, and upload new files to IPFS.</p>
    <hr>
    <h2 class="label">Upload Files</h2>
    <article class="message is-dark">
      <div class="message-body ">
        <FileUploadInline :relayResult="updateCache" :uploadDone="fetchRecentFiles" />
      </div>
    </article>
    <h2 class="label">File History</h2>
    <article class="message is-dark">
      <div class="message-body noselect">
        <h2>Your Files</h2>
        <p>Below is a list of all of the files you've uploaded.</p>
        <br>
        <p v-for="file in recentFiles" v-bind:key="file.hash">
          <File :file="file" :updateParent="updateParent"/>
        </p>
        <div style="clear:both"></div>
      </div>
    </article>
    
    <br>
  </div>
</template>

<script>
import File from '@/components/files/file/File';
import IPFSUtils from '@/utils/IPFSUtils';
import FileUploadInline from '@/components/common/fileuploadinline/FileUploadInline';

export default {
  name: 'Files',
  components: {
    FileUploadInline,
    File,
  },
  data() {
    return {
      recentFiles: [],
    };
  },
  methods: {
    // Updates the parent with new files
    updateParent() {
      this.fetchRecentFiles();
    },
    // Updates the local cache with the new files
    updateCache() {
      this.fetchRecentFiles();
    },
    // Close out the file manager by changing the main route
    close() {
      this.$store.commit('changeRoute', 'main');
    },
    // Fetch files from the IPFS local file cache
    fetchRecentFiles() {
      this.recentFiles = IPFSUtils.getFileCache().reverse();
    },
  },
  mounted() {
    this.fetchRecentFiles();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #files {
    position: relative;
    width: 100%;
    height: calc(100% - 2rem - 1px);
    background: #f8f9fb;
    z-index: 5;
    padding: 1rem 1.5rem;
    overflow-y: scroll;
  }
  h3 {
    font-family: 'Major Mono Display', monospace;
    font-size: 20pt;
  }
  .modal-close {
    z-index: 0 !important;
    position: absolute;
  }
</style>
