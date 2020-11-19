module.exports = {
  network: {
    explorer: 'https://goerli.etherscan.io',
    api: 'http://api-goerli.etherscan.io/api',
  },
  ipfs: {
    browser: 'https://ipfs.io/ipfs/',
  },
  registry: '0x7d867225d2927da8c98f5110b6589b53895e09df',
  debug: true,
  peer: {
    heartbeat_timeout: 15000,
    check_heartbeat: 500,
    timeout: 500,
    reconnect: 3000,
    ping_interval: 5000,
  },
};
