import React, { useState, useEffect } from "react"
import { injected, binanceinjected } from "../../../utils/connectors"
import classes from "./WalletItem.module.scss"

const WalletItem = ({ item, handleConnect }) => {
  const [hasInjected, setHasInjected] = useState(false)

  useEffect(() => {
    setHasInjected(window.web3 || window.ethereum)
  }, [])

  return (
    <div
      className={classes.container}
      onClick={() => {
        if (
          (item.connector === injected && !hasInjected) ||
          (item.connector === binanceinjected && !window.BinanceChain)
        ) {
          window.open(item.installLink)
        } else {
          handleConnect(item)
        }
      }}
    >
      <img src={item.iconName} className={classes.icon} alt="icon" />
      <p className={classes.name}>
        {(item.connector === injected && !hasInjected) ||
        (item.connector === binanceinjected && !window.BinanceChain)
          ? item.installName
          : item.name}
      </p>
    </div>
  )
}

export default WalletItem
