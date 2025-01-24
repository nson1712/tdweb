import { makeAutoObservable } from 'mobx'
import { getAccessToken, getRefreshToken } from '../utils/storage';
import { decodeAccessToken } from '../utils/utils';

class GlobalStore {
  showConfirm = false

  confirm = {}

  profile = {};

  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this)
  }

  handleHideConfirmDialog = () => {
    this.showConfirm = false
  }

  handleShowConfirmDialog = (confirm) => {
    this.confirm = confirm
    this.showConfirm = true
  }

  checkIsLogin = async() => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const keys = Object.keys(this.profile);
    if (keys.length  === 0 || !this.profile?.referralCode || this.profile?.referralCode === undefined) {
      if (accessToken) {
        const jsonObj = await decodeAccessToken(accessToken);
        this.profile = jsonObj;
        console.log('Profile: ', JSON.stringify(this.profile));
      }
    }
    this.isLoggedIn = accessToken && refreshToken ? true : false;
    return this.isLoggedIn;
    
  }

  updateProfile = async(accessToken) => {
    const jsonObj = await decodeAccessToken(accessToken);
    this.profile = jsonObj;
    console.log('Profile renew: ', JSON.stringify(this.profile));
  }
}

export default new GlobalStore()