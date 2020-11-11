import config from '@/config/config';
import Vault74Registry from './Vault74Registry';
import DwellerContract from './DwellerContract';

export default class DwellerCachingHelper {
  constructor(registryAddress, expiry = 86400) {
    this.expiry = expiry;
    this.cache = JSON.parse(localStorage.getItem('vault74.dwellerCache')) || {};
    this.registryAddress = registryAddress;
  }

  // If the dweller exists in the cache and
  // is not expired, send it over to save time
  getDwellerFromCache(address) {
    const dweller = this.cache[address];
    if (!dweller) return false;
    if (dweller.expiry < Date.now()) return false;

    return dweller;
  }

  async getDweller(address) {
    let dweller = this.getDwellerFromCache(address);
    if (dweller) return dweller;

    const dwellerIDAddress = await Vault74Registry.getDwellerContract(address);
    dweller = {
      name: await DwellerContract.getDwellerName(dwellerIDAddress),
      photo: await DwellerContract.getPhotoAsync(dwellerIDAddress),
      address,
      expiry: Date.now() + this.expiry,
    };
    dweller = {
      ...dweller,
      photo: `${config.ipfs.browser}${dweller.photo}`,
      name: window.web3.utils.hexToString(dweller.name),
    };
    this.cache[address] = dweller;
    this.updateCache();
    return dweller;
  }

  updateCache() {
    localStorage.setItem('vault74.dwellerCache', JSON.stringify(this.cache));
  }
}
