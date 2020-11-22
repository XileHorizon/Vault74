module.exports = {
  env: 'prod',
  network: {
    explorer: 'https://goerli.etherscan.io',
    api: 'http://api-goerli.etherscan.io/api',
  },
  ipfs: {
    browser: 'https://ipfs.io/ipfs/',
  },
  registry: '0x7d867225d2927da8c98f5110b6589b53895e09df',
  debug: true,
  cacher: {
    dwellerLifespan: 900000,
  },
  peer: {
    network: {
      prod: {
        secure: true,
        host: '0.vault74.io',
        port: 443,
        path: '/',
        key: 'vault74',
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
        ],
      },
      dev: {
        secure: false,
        host: '0.vault74.io',
        port: 80,
        path: '/',
        key: 'vault74',
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
        ],
      },
    },
    heartbeat_timeout: 15000,
    check_heartbeat: 500,
    timeout: 500,
    reconnect: 3000,
    ping_interval: 5000,
  },
};
