import { makeAutoObservable } from 'mobx'
import * as Api from '../api/api'

class ProfileStore {

  balance = []

  constructor() {
    makeAutoObservable(this)
  }

  getBalance = async () => {
    try {
      const result = await Api.get({
        url: '/customer/customer/balance',
      });
      this.balance = result.data;
    } catch (e) {
      console.log(e);
    }
  }

}

export default new ProfileStore()