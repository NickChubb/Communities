import { useState, useEffect } from 'react';

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";

/**
 * 
 * @returns Ethereum connection variables
 */
const useEth = () => {

    const [ wallet, setWallet ] = useState(null);
    const [ provider, setProvider ] = useState(null);
    const [ signer, setSigner ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(async () => {

        if (!await detectEthereumProvider()) return false;

        // Metamask Handlers
        window.ethereum.on('accountsChanged', (accounts) => handleAccountsChanged(accounts));
        window.ethereum.on('chainChanged', handleChainChanged);

        if (!await connectWallet()) return false;
        if (!await connectProvider()) return false;

        setLoading(false);
        
    }, [provider, wallet]);

    /**
    * Handles the event listener 'accountsChanged'
    * @param {*} accounts 
    * @returns 
    */
    const handleAccountsChanged = (accounts) => {
        if ( accounts.length == 0 ) { 
            setWallet(null);
            return localStorage.removeItem('wallet');
        } else {
            let acc = accounts[0];
            setWallet(acc);
            return localStorage.setItem('wallet', acc);
        }
    } 

    /**
    * Handles the event listener 'chainChanged'
    * @param {*} accounts 
    * @returns 
    */
    const handleChainChanged = (chain) => {
        // todo
    }

    /**
    * Connects to ETH provider
    * @returns 
    */
    const connectProvider = async () => {

        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        if (!newProvider) return false;
        if (!provider) setProvider(newProvider);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        setSigner(newProvider.getSigner());

        return true;
    }

    /**
    * Connects to users wallet.  First attempts to get from localStorage, if it can't be found it will connect
    * via ethereum `eth_requestAccounts` JSON-RPC
    * @returns wallet ID
    */
    const connectWallet = async () => {

        const userWallet = localStorage.getItem('wallet');
        if (!userWallet) return false;
        if (!wallet) setWallet(userWallet);
        return true;
    }

    return {
        wallet, setWallet,
        provider, setProvider,
        signer, setSigner,
        loading,
        handleAccountsChanged,
        handleChainChanged
    }
}

export default useEth
