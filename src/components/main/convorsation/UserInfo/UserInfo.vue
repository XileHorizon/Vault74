<template>
  <div id="user-info">
    <div class="heading">
      <span class="label">User Details</span>
      <span class="username">{{$store.state.friends.filter(f => f.address === $store.state.activeChat)[0].name}}</span>
    </div>
    <hr class="divider">
    <div class="user-details">
      <CircleIcon :image="$store.state.friends.filter(f => f.address === $store.state.activeChat)[0].photo" />
      <p class="username">
        {{$store.state.friends.filter(f => f.address === $store.state.activeChat)[0].name}}
      </p>
      <p class="address">
        {{$store.state.activeChat.substr(0, 12)}}...
      </p>
      <hr class="divider">
      <span class="label">Badges</span>
      <Badge :address="$store.state.activeChat" />
      <hr class="divider">
    </div>
    <div class="columns buttons">
      <div class="column is-one-third">
        <button class="button is-small is-primary">
          <i class="fas fa-comment-alt"></i>
        </button>
      </div>
      <div class="column is-one-third">
        <button class="button is-small is-primary">
          <i class="fas fa-phone-volume"></i>
        </button>
      </div>
      <div class="column is-one-third">
        <button class="button is-small is-primary">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>

    <div class="notes">
      <span class="label">Notes</span>
      <textarea class="textarea" placeholder="enter some notes..."></textarea>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/common/Badge';
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'UserInfo',
  components: {
    CircleIcon,
    Badge,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #user-info {
    padding: 0.5rem 1rem 1rem 1rem;
    width: 15rem;
    position: absolute;
    bottom: 2rem;
    top: 3rem;
    right: 0;

    .heading {
      width: 100%;
      line-height: 110%;
      .username {
        font-size: 8pt;
      }
      .label {
        padding: 0 !important;
      }
    }
    .user-details {
      margin-top: 1rem;
      text-align: center;
      .circle-icon {
        width: 75px;
        height: 75px;
        border-radius: 5px;
      }
      .username {
        margin-top: 1rem;
        font-size: 15pt;
      }
      .address {
        font-size: 10pt !important;
      }
    }
    .buttons {
      margin-top: 2rem;
      button {
        width: 100%;
      }
      .column {
        text-align: center;
      }
    }
  }
  .badge-container i {
    font-size: 18pt !important;
  }
</style>
