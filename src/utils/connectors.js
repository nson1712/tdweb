import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

export const BSC_URL = "https://bsc-dataseed1.defibit.io"

export const SUPPORT_CHAINIDS = [56, 97]

export const ChainId = {
  BSC_MAINNET: 56,
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})

export const walletconnectBSC = new WalletConnectConnector({
  rpc: { [ChainId.BSC_MAINNET]: BSC_URL },
  appName: "BLOCKCHAIN",
  network: "NETWORK",
  qrcode: true,
  chainId: ChainId.BSC_MAINNET,
})

export const binanceinjected = null


