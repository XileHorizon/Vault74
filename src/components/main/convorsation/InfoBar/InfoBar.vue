<template src="./InfoBar.html"></template>

<script>
import DwellerID from '@/components/common/dwellerid/DwellerID';

export default {
  name: 'InfoBar',
  props: ['toggleMedia', 'makeCall'],
  components: {
    DwellerID,
  },
  data() {
    return {
      idActive: false,
    };
  },
  methods: {
    requestScreenShare() {
      this.$store.commit('screenShareRequest');
    },
    // Toggles the ID card modal
    toggleFingerprint() {
      this.idActive = !this.idActive;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./InfoBar.less"></style>
