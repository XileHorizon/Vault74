<template src="./MessageBody.html"></template>

<script>
  import CircleIcon from '@/components/common/CircleIcon';
  import Link from '@/components/main/convorsation/message/embeds/Link';
  import YouTube from '@/components/main/convorsation/message/embeds/YouTube';
  import Payment from '@/components/main/convorsation/message/embeds/Payment';
  import Call from '@/components/main/convorsation/message/embeds/Call';
  import ImageViewer from '@/components/main/convorsation/message/embeds/ImageViewer';
  import File from '@/components/main/convorsation/message/embeds/File';
  import Audio from '@/components/main/convorsation/message/embeds/Audio';
  import Video from '@/components/main/convorsation/message/embeds/Video';
  import Address from '@/components/main/convorsation/message/embeds/Address';
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
      Call,
      ImageViewer,
      Address,
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
      /** @method
       * Formats a date using dayjs to a human readable string
       * @name formattedDate
       * @argument timestamp unicode timestamp to format
       */
      formattedDate(timestamp) {
        return dayjs().to(timestamp);
      },
      /** @method
       * Setter
       * Gets a dweller from the cache by address then
       * sets the dweller info to data
       * @name getDweller
       * @argument address of the dweller to lookup
       */
      async getDweller(address) {
        this.dweller = await this.dwellerCachingHelper.getDweller(address);
      },
      /** @method
       * Check a message for a valid YouTube URL
       * @name parseYoutubeLink
       * @argument message string to check for links in
       * @returns boolean of wether or not a YouTube link is found
       */
      parseYoutubeLink(message) {
        if (typeof message !== 'string') return false;
        // eslint-disable-next-line
        const YTRegex = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/;
        return message.match(YTRegex);
      },
      /** @method
       * Check a message for a valid Ethereum address
       * @name parseEthAddress
       * @argument message string to check for addresses in
       * @returns boolean of wether or not a Ethereum address is found
       */
      parseEthAddress(message) {
        if (typeof message !== 'string') return false;
        // eslint-disable-next-line
        const ETHRegex = /^0x[a-fA-F0-9]{40}$/;
        return message.match(ETHRegex);
      },
      /** @method
       * Wrap links in <a> tags
       * @name wrapLinks
       * @argument message string to wrap links in
       * @returns string value of formatted message
       */
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
