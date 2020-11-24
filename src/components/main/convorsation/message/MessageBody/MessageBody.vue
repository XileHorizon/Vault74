<template src="./MessageBody.html"></template>

<script>
  import CircleIcon from '@/components/common/CircleIcon';
  import Link from '@/components/main/convorsation/message/embeds/Link';
  import YouTube from '@/components/main/convorsation/message/embeds/YouTube';
  import Payment from '@/components/main/convorsation/message/embeds/Payment';
  import ImageViewer from '@/components/main/convorsation/message/embeds/ImageViewer';
  import File from '@/components/main/convorsation/message/embeds/File';
  import Audio from '@/components/main/convorsation/message/embeds/Audio';
  import Video from '@/components/main/convorsation/message/embeds/Video';
  import DwellerCachingHelper from '@/utils/DwellerCachingHelper';
  import config from '@/config/config';

  import * as dayjs from 'dayjs';
  import * as relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

  export default {
    name: 'MessageBody',
    props: ['messages', 'scrollToEnd'],
    components: {
      CircleIcon,
      Link,
      YouTube,
      Payment,
      ImageViewer,
      File,
      Audio,
      Video,
    },
    data() {
      return {
        dwellerCachingHelper: new DwellerCachingHelper(
          config.registryAddress,
          config.cacher.dwellerLifespan,
        ),
        dweller: false,
        isEditable: false,
      };
    },
    methods: {
      formattedDate(timestamp) {
        return dayjs().to(timestamp);
      },
      async getDweller(address) {
        this.dweller = await this.dwellerCachingHelper.getDweller(address);
      },
      parseYoutubeLink(message) {
        if (typeof message !== 'string') return false;
        // eslint-disable-next-line
        const YTRegex = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/;
        return message.match(YTRegex);
      },
      wrapLinks(message) {
        return message.replace(/(?:(https?:\/\/[^\s]+))/m, '<a href="$1" target="_blank">$1</a>');
      },
    },
    mounted() {
      this.getDweller(this.messages[0].sender);
      if (this.messages[0].sender === this.$store.state.activeAccount) {
        this.isEditable = true;
      }
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./MessageBody.less" lang="less"></style>
