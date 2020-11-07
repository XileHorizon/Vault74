<template>
    <div class="c-message-body">
        <h4 class="c-message-user">{{message.user.name}} <span class="timestamp">{{formattedDate(message.timestamp)}}</span></h4>
        <CircleIcon :image="message.user.photo" />
        <div class="c-message-actions" v-if="message.isEditable">
          <i class="fas fa-pencil-alt"></i>
          <i class="fa fa-trash"></i>
        </div>
        <div class="c-message-content">
            <div class="c-message" v-for="message in message.content" :key="message.id">
                <p v-if="message.data && message.type == 'text'">
                    {{message.data}}
                </p>
                <div v-if="message.data && message.type === 'link'">
                    <Link :message="message"/>
                </div>
                <div v-if="message.data && message.type === 'youtube'">
                    <YouTube :message="message"/>
                </div>
                <div v-if="message.data && message.type === 'payment'">
                    <Payment :message="message" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';
import Link from '@/components/main/convorsation/message/embeds/Link';
import YouTube from '@/components/main/convorsation/message/embeds/YouTube';
import Payment from '@/components/main/convorsation/message/embeds/Payment';

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'MessageBody',
  props: ['message'],
  components: {
    CircleIcon,
    Link,
    YouTube,
    Payment,
  },
  methods: {
    formattedDate(timestamp) {
      return dayjs().to(timestamp);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .c-message-body {
        width: 100%;
        position: relative;
        height: auto;
        padding-bottom: 1rem;
        border-radius: 4px;
        transition: ease-in-out 0.1s background-color;
    }
    .c-message-body:hover {
      background-color: #f0f4f7;
    }
    .c-message-actions {
      position: absolute;
      background: #e7ebee;
      padding: 0.1rem 0.5rem 0.1rem 1rem;
      top: 0.5rem;
      right: 2rem;
      display: none;
      color: #666;
      border-radius: 5px;
      border: 1px solid #e6ebee;
    }
    .c-message-actions i {
      margin-right: 0.5rem;
      cursor: pointer;
    }
    .c-message-actions i:hover {
      color: #000;
    }
    .c-message-body:hover .c-message-actions {
      display: block;
    }
    .c-message-user {
        position: absolute;
        top: 1.1rem;
        left: 5rem;
        font-weight: bold;
    }
    .timestamp {
        font-weight: normal;
        color: #999;
        font-size: 9pt;
        padding-left: 0.25rem;
    }
    .circle-icon {
        position: absolute;
        left: 1rem;
        top: 1rem;
    }
    .c-message-content {
        padding-top: 2.5rem;
        padding-left: 5rem;
        padding-right: 1rem;
        color: #666;
    }
</style>
