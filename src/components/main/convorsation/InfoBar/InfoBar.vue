<template src="./InfoBar.html"></template>

<script>
import DwellerID from '@/components/common/DwellerID/DwellerID';

export default {
  name: 'InfoBar',
  props: ['toggleMedia'],
  components: {
    DwellerID,
  },
  data() {
    return {
      idActive: false,
    };
  },
  methods: {
    toggleFingerprint() {
      this.idActive = !this.idActive;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./InfoBar.less"></style>
