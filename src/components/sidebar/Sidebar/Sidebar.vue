<template src="./Sidebar.html"></template>

<script>
import ServerList from '@/components/ServerList/ServerList';
import QuickFriends from '@/components/sidebar/QuickFriends/QuickFriends';
import User from '@/components/sidebar/User/User';
import UserDemo from '@/components/sidebar/User/UserDemo';
import Controls from '@/components/sidebar/Controls/Controls';

export default {
  name: 'Sidebar',
  props: ['toggleSettings'],
  components: {
    ServerList,
    User,
    UserDemo,
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
