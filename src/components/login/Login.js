import React from 'react'
import styles from '@Styles/Home.module.css'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {  useEthers } from '@usedapp/core'

const Login = () => {

    const { activateBrowserWallet, activate } = useEthers()
    const walletconnect = new WalletConnectConnector({
        rpc: { 
            3: 'https://eth-ropsten.alchemyapi.io/v2/WENhXA-GO8W5vDPMKECQwYadNpjuE4Of'
         },
        qrcode: true
    })

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>
                You must connect your wallet to continue.
                <br />
                <button className={styles.button} onClick={activateBrowserWallet}>Metamask</button>
                <button className={styles.button} onClick={() => activate(walletconnect)}>WalletConnect</button>
            </h1>
        </div>  
    )
}

export default Login
