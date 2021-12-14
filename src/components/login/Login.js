import React from 'react'
import styles from '@Styles/Home.module.css'

import { requestAccount } from "@Helpers/eth";
import useEth from '@Hooks/useEth';

const Login = () => {

    const { wallet, setWallet,
        provider, setProvider,
        signer, setSigner,
        handleAccountsChanged } = useEth();

    const handleLogin = async (e) => {
    let account = await requestAccount(handleAccountsChanged);
    if (!account) return false;
    return true;
    }


    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>
                You must be logged in to continue.
                <br />
                <button className={styles.button} onClick={() => handleLogin()}> Log In</button>
            </h1>
        </div>
    )
}

export default Login
