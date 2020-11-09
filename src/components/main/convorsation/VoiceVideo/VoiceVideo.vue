<template src="./VoiceVideo.html"></template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'VoiceVideo',
  props: ['mediaOpen', 'voice', 'disconnect', 'switchTo'],
  components: {
    CircleIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./VoiceVideo.less"></style>
