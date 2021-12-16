import React from 'react'
import styles from '@Styles/Home.module.css'

import {  useEthers } from '@usedapp/core'

const Login = () => {

    const { activateBrowserWallet } = useEthers()

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>
                You must connect your wallet to continue.
                <br />
                <button className={styles.button} onClick={() => activateBrowserWallet()}> Log In</button>
            </h1>
        </div>  
    )
}

export default Login
