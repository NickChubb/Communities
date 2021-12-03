import { ethers } from "ethers";

/**
 * Handles the event listener 'accountsChanged'
 * @param {*} accounts 
 * @returns 
 */
export const handleAccountsChanged = (accounts, setWallet) => {
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
export const handleChainChanged = (chain) => {
    // todo
}

/**
 * Connects to ETH provider
 * @returns 
 */
export const connectProvider = async (provider, setProvider, signer, setSigner) => {

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
export const connectWallet = async (wallet, setWallet) => {

    const userWallet = localStorage.getItem('wallet');
    if (!userWallet) return false;
    if (!wallet) setWallet(userWallet);
    return true;
}

/**
 * 
 * @returns 
 */
export const requestAccount = async () => {

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
                                    // .then(handleAccountsChanged)
                                    .catch((err) => {
                                        if (err.code === 4001) {
                                        // EIP-1193 userRejectedRequest error
                                        // If this happens, the user rejected the connection request.
                                        console.log('Please connect to MetaMask.');
                                        } else {
                                        console.error(err);
                                        }
                                    });

    if ( accounts.length == 0 ) return false;
    return accounts[0];
}

/**
 * 
 * @param {*} wallet 
 * @returns 
 */
export const getAllNfts = async (wallet) => {

    let url = `https://api-ropsten.etherscan.io/api?${new URLSearchParams({
        module: 'account',
        action: 'tokennfttx',
        apikey: process.env.ETHERSCAN_API_KEY,
        address: wallet
    })}`;

    // Build headers
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    let res = await fetch(url, {
        method: 'GET',
        headers: headers,
        // body: body
    });
    
    return (await res.json()).result;

}