import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useMemo, useState } from 'react'
import classes from './WalletStatus.module.scss'
import { injected, SUPPORT_CHAINIDS, walletconnectBSC } from '../../utils/connectors'
import ConnectWallet from '../ConnectWallet/ConnectWallet'
import { displayAddress } from '../../utils/utils'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import ModalComponent from '../Modal/Modal'
import classNames from 'classnames'
import WrongNetwork from '../WrongNetwork'

const WalletStatus = ({connectClass}) => {
  const { account, activate, deactivate, connector, active, chainId } = useWeb3React()
  const [showConnectWallet, setShowConnectWallet] = useState(false)

  const wrongNetwork = useMemo(() => {
    return chainId && SUPPORT_CHAINIDS.indexOf(chainId) === -1
  }, [chainId])

  useEffect(() => {
    if (account) {
      localStorage.setItem('currentAccount', account)
      localStorage.setItem('connector', connector === injected ? 'INJECTED' : 'WALLET_CONNECT')
      setShowConnectWallet(false)
    } else if (localStorage.getItem('currentAccount') && !active) {
      const connector = localStorage.getItem('connector')
      if (connector === 'WALLET_CONNECT') {
        activate(walletconnectBSC, undefined, true).catch(() => {})
      } else {
        injected.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {})
          }
        })
      }
    }
  }, [account, active, connector])

  return (
    <div className={classes.container}>
      { wrongNetwork
        && <WrongNetwork className='h-[40px]'/>
      }
      { account && !wrongNetwork
        && <div
          onClick={async () => {
           
            localStorage.removeItem('currentAccount')
            localStorage.removeItem('connector')
            if ( connector instanceof WalletConnectConnector) {
              await connector.walletConnectProvider.disconnect()
              await connector.close()
            }

            await deactivate()
            
            window.location.reload()
          }}
          className='h-[40px] px-[12px] lg:px-[24px] text-[16px] font-semibold secondary-bg primary-text flex items-center justify-center rounded-[4px] cursor-pointer'
        >
          {displayAddress(account)}
          <img src={ connector === injected ? '/images/injected-icon.png' : '/images/walletConnectIcon.svg'} className='ml-[10px] w-[20px] rounded-[10px]'/>
        </div>
      }
      { !account
        && <a className={classNames('btnMain btnTiny', connectClass)}
          onClick={() => {
            setShowConnectWallet(true)
          }}
        >
          Connect Wallet
        </a>
      }
      <ConnectWallet show={showConnectWallet} handleClose={() => setShowConnectWallet(false)}/>
    </div>
  )
}

export default WalletStatus


