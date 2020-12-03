<template src="./Sidebar.html"></template>

<script>
import ServerList from '@/components/serverlist/ServerList';
import QuickFriends from '@/components/sidebar/quickfriends/QuickFriends';
import User from '@/components/sidebar/user/User';
import Controls from '@/components/sidebar/controls/Controls';

export default {
  name: 'Sidebar',
  props: ['toggleSettings'],
  components: {
    ServerList,
    User,
    Controls,
    QuickFriends,
  },
  data() {
    return {
      route: 'chats',
      showQuickFriends: false,
    };
  },
  methods: {
    toggleQuickFriends() {
      this.showQuickFriends = !this.showQuickFriends;
    },
    setRoute(route) {
      this.route = route;
    },
    setMainRoute(route) {
      this.$store.commit('changeRoute', route);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Sidebar.less"></style>
