import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import classNames from "classnames"
import { useWeb3React } from "@web3-react/core"
import Web3 from "web3"
import { injected } from "../../utils/connectors"
import classes from "./ConnectWallet.module.scss"
import { SUPPORTED_WALLETS } from "../../utils/constants"
import WalletItem from "./WalletItem"
import { getMobileOperatingSystem } from "../../utils/utils"

const ConnectWallet = ({ show, handleClose, theme = "dark" }) => {
  const { activate } = useWeb3React()

  const [os, setOs] = useState("")

  useEffect(() => {
    setOs(getMobileOperatingSystem())
  }, [])

  const forceConnectAccount = async () => {
    try {
      if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider)
        const accounts = await web3.eth.getAccounts()

        if (accounts && accounts.length > 0) {
          await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [
              {
                eth_accounts: {},
              },
            ],
          })
          const newAccounts = await web3.eth.getAccounts()
          if (newAccounts[0]) {
            activate(injected, undefined, true).catch((error) => {
              console.error("Failed to activate after accounts changed", error)
            })
          }
          return
        }
        const walletAddress = await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })

        if (walletAddress[0]) {
          activate(injected, undefined, true).catch((error) => {
            console.error("Failed to activate after accounts changed", error)
          })
        }

        return
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleConnect = async (item) => {
    if (item.connector === injected && window.web3) {
      forceConnectAccount()
    } else {
      activate(item.connector, undefined, true).catch((error) => {
        console.log("error ===>", error)
      })
    }
  }

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      title='Connect to Wallet'
    >
      <div className={classNames(classes.container, 'px-[20px]')}>
        <div className={classNames(classes.content, 'border-b-[1px] border-color pb-[24px] mb-[24px]')}>
          {Object.values(SUPPORTED_WALLETS)
            .filter((item) => os === "unknown" || item.mobile)
            .map((item, i) => (
              <div className={classes.item} key={i}>
                <WalletItem item={item} handleConnect={handleConnect} />
              </div>
            ))}
        </div>

        <div className={'rounded-[8px] p-[16px] text-[14px] leading-[22px] label-text bg-gray-2'}>
          Block chain dev shop disclaim
        </div>
      </div>
    </Modal>
  )
}

export default ConnectWallet
