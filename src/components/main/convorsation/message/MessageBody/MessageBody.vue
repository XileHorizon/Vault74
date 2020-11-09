<template src="./MessageBody.html"></template>

<script>
  import CircleIcon from '@/components/common/CircleIcon';
  import Link from '@/components/main/convorsation/message/embeds/Link';
  import YouTube from '@/components/main/convorsation/message/embeds/YouTube';
  import Payment from '@/components/main/convorsation/message/embeds/Payment';
  import ImageViewer from '@/components/main/convorsation/message/embeds/ImageViewer';
  import File from '@/components/main/convorsation/message/embeds/File';

  import * as dayjs from 'dayjs';
  import * as relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

  export default {
    name: 'MessageBody',
    props: ['message', 'scrollToEnd'],
    components: {
      CircleIcon,
      Link,
      YouTube,
      Payment,
      ImageViewer,
      File,
    },
    methods: {
      formattedDate(timestamp) {
        return dayjs().to(timestamp);
      },
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./MessageBody.less" lang="less"></style>
