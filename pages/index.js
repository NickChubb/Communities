import { useEffect, useState } from 'react';
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

import Layout from '@Components/Layout';
import styles from '@Styles/Home.module.css'
import { handleAccountsChanged, 
          handleChainChanged,
          connectWallet,
          connectProvider,
          requestAccount
        } from "@Helpers/eth";
import Library from "@Components/Library";

export default function Home() {

  const [ wallet, setWallet ] = useState(null);
  const [ provider, setProvider ] = useState(null);
  const [ signer, setSigner ] = useState(null);

  useEffect(async () => {

    if (!await detectEthereumProvider()) return false;

    // Metamask Handlers
    window.ethereum.on('accountsChanged', (accounts) => handleAccountsChanged(accounts, setWallet));
    window.ethereum.on('chainChanged', handleChainChanged);

    if (!await connectWallet(wallet, setWallet)) return false;
    if (!await connectProvider(provider, setProvider, signer, setSigner)) return false;
    
  }, [provider, wallet]);

  const handleLogin = (e) => {
    let account = requestAccount(setWallet);
    if (!account) return false;
    return true;
  }
  
  return (
    <Layout>

        {
          wallet && wallet != 0 ?
            (<Library wallet={wallet} provider={provider} signer={signer} />)
            :
            (
              <div className={styles.library}>
                  <h1 className={styles.library_title}>
                      Log in to access your library
                  </h1>
                  <button onClick={() => handleLogin()}> Log In</button>
              </div>
            )
        }
       
       </Layout>
  )
}
