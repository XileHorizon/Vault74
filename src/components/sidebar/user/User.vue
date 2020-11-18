<template src="./User.html"></template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'User',
  components: {
    CircleIcon,
  },
  data() {
    return {
      hovered: false,
    };
  },
  props: [
    'name',
    'online',
    'icon',
    'active',
    'status',
    'unread',
  ],
  methods: {
    // Navigate to the main route
    navigateToUser() {
      this.$store.commit('changeRoute', 'main');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./User.less"></style>
