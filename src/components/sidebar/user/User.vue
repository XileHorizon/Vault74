<template>
  <section :class="`user ${(active == 'true') ? 'user-active' : ''}`" >
    <CircleIcon :image="icon"/>
    <p class="unreads" v-if="unread"></p>
    <p >{{name}}</p>
    <p class="address">{{status}}</p>
    <p :class="`online ${(online == 'true') ? 'true' : ''}`"><i class="fa fa-circle"></i></p>
    <i v-if="hovered" class="fa fa-times"></i>
  </section>
</template>

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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .user {
        height: 55px;
        position: relative;
        padding-left: 4rem;
        padding-top: 0.4rem;
        border-radius: 4px;
        margin-bottom: 0.2rem;
    }
    .user:hover {
        cursor: pointer;
        background: #f6f6f6;
    }
    .unreads {
      position: absolute;
      top: calc(50% - 15px);
      left: -8px;
      width: 10px;
      height: 30px;
      border-radius: 2px;
      background: #ccc;
    }
    .user-active {
        color: #00d0a1;
        background: #f6f6f6;
    }
    .user-active:hover {
        color: #00d0a1;
    }
    .fa-chevron-right {
        position: absolute;
        right: -0.5rem;
        top: 0.8rem;
    }
    .online {
        position: absolute;
        left: 2.2rem;
        bottom: 0.2rem;
        color: #666;
    }
    .true {
        color: #00d0a1;
    }
    .user .circle-icon {
        position: absolute;
        left: 0.5rem;
        top: 0.45rem;
        width: 40px;
        height: 40px;
    }
    .address {
        font-size: 8pt;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #bbb;
    }
</style>
