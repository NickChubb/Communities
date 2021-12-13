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
        <div className={styles.library}>
            <h1 className={styles.library_title}>
                You must be logged in to continue.
            </h1>
            <button onClick={() => handleLogin()}> Log In</button>
        </div>
    )
}

export default Login
