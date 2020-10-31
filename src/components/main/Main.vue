<template>
  <section class="bordered main-section">
    <InfoBar />
    <Convorsation :messages="messages"/>
    <Chatbar :handleNewMessage="sendMessage"/>
  </section>
</template>

<script>
import InfoBar from '@/components/main/infobar/InfoBar';
import Chatbar from '@/components/main/chatbar/Chatbar';
import Convorsation from '@/components/main/convorsation/Convorsation';

export default {
  name: 'Main',
  components: {
    InfoBar,
    Chatbar,
    Convorsation,
  },
  methods: {
    sendMessage(text) {
      /* eslint-disable */
      this.messages.push({
          id: 1,
          type: 'message-group',
          user: {
          name: 'RetroPronghorn',
          photo: 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
          },
          timestamp: Date.now() + 10,
          content: [
          {
              id: 1,
              type: 'text',
              data: text,
          },
          ],
      });
      /* eslint-enable */
    },
  },
  data() {
    return {
      /* eslint-disable */
      messages: [
        {
          id: 1,
          type: 'message-group',
          isEditable: true,
          user: {
            name: 'RetroPronghorn',
            photo: 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
          },
          timestamp: 1604317925644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Hello Sophie.',
            },
            {
              id: 2,
              type: 'text',
              data: 'How are you liking Vault74?',
            },
          ],
        },
        {
          id: 2,
          type: 'message-group',
          user: {
            name: 'Sophie Chain',
            photo: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          timestamp: 1604317925644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Matt, nice to meet you!',
            },
            {
              id: 2,
              type: 'text',
              data: 'Vault74 is great so far, I especially like how easy it was to get started. Admittedly I\'m new to crypto and was hesitant about trying to setup everything.',
            },
            {
              id: 3,
              type: 'text',
              data: 'From a setup standpoint I couldn\'t even tell. I didn\'t have to fuss with my wallet or anything.',
            },
          ],
        },
        {
          type: 'message-group-divider',
          text: 'October 30th',
        },
        {
          id: 1,
          type: 'message-group',
          isEditable: true,
          user: {
            name: 'RetroPronghorn',
            photo: 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
          },
          timestamp: 1604217925644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Great chat earlier at lunch, I love your idea of storing the servers roles and users on chain.',
            },
            {
              id: 2,
              type: 'text',
              data: 'If you don\'t mind can you send me over that site you mentioned earlier so I can check it out.',
            },
          ],
        },
        {
          id: 2,
          type: 'message-group',
          user: {
            name: 'Sophie Chain',
            photo: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          timestamp: 1604217925644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Sure, here\'s the link',
            },
            {
              id: 2,
              type: 'link',
              data: {
                link: 'https://ipfs.io',
                preview: 'https://d33wubrfki0l68.cloudfront.net/0745e1d527f5aea7e3ace516a48a28284985d3cf/98287/blog/go-mobile-ipfs/gomobile_ipfs_logo_hu1a9947db488ec14ceeb6662056602008_251381_1312x0_resize_q95_mitchellnetravali.jpg',
                title: 'IPFS powers the Distributed Web',
                text: 'The Internet has turbocharged innovation by being one of the great equalizers in human history — but increasing consolidation of control threatens that progress. IPFS stays true to the original vision of an open, flat web by delivering technology to make that vision a reality.',
              },
            },
          ],
        },
        {
          type: 'message-group-divider',
          text: 'October 31st',
        },
        {
          id: 2,
          type: 'message-group',
          user: {
            name: 'Sophie Chain',
            photo: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          timestamp: 1604115925644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Matt, this is excellent!',
            },
            {
              id: 2,
              type: 'text',
              data: 'I just shared a 1GB file with Samantha. It was awesome to not have to use Dropbox like we usually do for sending the proofs out.',
            },
          ],
        },
        {
          id: 1,
          type: 'message-group',
          isEditable: true,
          user: {
            name: 'RetroPronghorn',
            photo: 'https://avatars3.githubusercontent.com/u/1770198?s=460&u=c2be9f3c1e9ce8ba336f29ed2f98c6eeeeab3f94&v=4',
          },
          timestamp: 1604115825644,
          content: [
            {
              id: 1,
              type: 'text',
              data: 'Sophie that\'s excellent news!',
            },
            {
              id: 2,
              type: 'text',
              data: 'Were you in the voice chat earlier today?',
            },
          ],
        },
      ],
    };
    /* eslint-enable */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-section {
        padding-top: 0;
        background: #f8f9fb;
        height: 100%;
        position: relative;
    }
    .bordered {
        border-left: 1px solid #e7ebee;
    }
</style>
