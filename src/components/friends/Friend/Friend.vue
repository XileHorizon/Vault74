<template>
  <div class="friend">
    <CircleIcon :image="friend.photo" />
    <span v-if="friend.status">
      <p :class="`online ${(friend.status == 'alive') ? 'true' : ''}`"><i class="fa fa-circle"></i></p>
    </span>
    <div class="name-address">
      <p class="username">{{friend.name}}</p>
      <p class="address">{{friend.address}}</p>
    </div>
    <button class="button is-primary add-friend" v-on:click="action">{{text}}</button>
  </div>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'Friend',
  props: [
    'action',
    'text',
    'friend',
  ],
  components: {
    CircleIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Friend.less"></style>
