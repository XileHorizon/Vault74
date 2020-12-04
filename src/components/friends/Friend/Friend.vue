<template>
  <div class="friend">
    <CircleIcon :image="friend.photo" :address="friend.address" />
    <span v-if="friend.status">
      <p :class="`online ${(friend.status == 'alive') ? 'true' : ''}`"><i class="fa fa-circle"></i></p>
    </span>
    <div class="name-address">
      <p class="username">{{friend.name}} <Badge :address="friend.address" /></p>
      <p class="address">{{friend.address}}</p>
    </div>
    <button class="button add-friend is-primary" v-on:click="action(friend.address)">{{text}}</button>
  </div>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';
import Badge from '@/components/common/Badge';

export default {
  name: 'Friend',
  props: [
    'action',
    'text',
    'friend',
  ],
  components: {
    CircleIcon,
    Badge,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Friend.less"></style>
