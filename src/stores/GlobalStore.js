import { makeAutoObservable } from 'mobx'

class GlobalStore {
  showConfirm = false

  confirm = {}

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

}

export default new GlobalStore()