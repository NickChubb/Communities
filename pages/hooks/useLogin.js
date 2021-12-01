import React from 'react'

const useLogin = () => {

    const getWallet = () => {
        return cookies.get('wallet');
    };

    const [wallet, setWallet] = useState(getWallet());

    const saveWallet = (userWallet) => {
        // Store token as cookie
        const account = userWallet;
        cookies.set('wallet', account, { path: "/" });
        setWallet(account);
    };

    return {
        setWallet: saveWallet,
        wallet
    }
}

export default useLogin;
