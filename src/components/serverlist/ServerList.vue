<template src="./ServerList.html"></template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'ServerList',
  props: ['toggleCreateServer'],
  components: {
    CircleIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./ServerList.less"></style>
