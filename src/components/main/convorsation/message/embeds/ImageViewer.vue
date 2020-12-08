<template>
  <div>
    <ImagePreview v-if="showImage" :src="image" :close="hideImage" />
    <img :src="image" alt="" @load="doLoad" :class="`${loaded ? 'loaded' : ''}`" @click="showImage = true"/>
    <div class="not-loaded" v-if="!loaded">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>
</template>

<script>
import ImagePreview from '@/components/common/ImagePreview';

export default {
  name: 'ImageViewer',
  components: {
    ImagePreview,
  },
  props: [
    'image',
    'scrollToEnd',
  ],
  data() {
    return {
      loaded: false,
      showImage: false,
    };
  },
  methods: {
    doLoad() {
      this.loaded = true;
      this.scrollToEnd();
    },
    hideImage() {
      this.showImage = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .not-loaded {
    width: 300px;
    height: 150px;
    padding-top: 45px;
    text-align: center;
    font-size: 30pt;
    background: rgba(0,0,0,0.15);
  }
  img {
    border-radius: 6px;
    max-width: 408px;
    max-height: 308px;
    display: none;
  }
  .loaded {
    display: inline-block;
  }
  img {
    border-radius: 4px;
  }
</style>
