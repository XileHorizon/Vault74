<template src="./MiniPayment.html"></template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'MiniPayment',
  props: ['person', 'toggle'],
  components: {
    CircleIcon,
  },
  data() {
    return {
      amount: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./MiniPayment.less"></style>
