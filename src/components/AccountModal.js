import React, { useContext, useState } from 'react';
import Loader from "react-loader-spinner";
import Link from 'next/link';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'
import { useEthers } from "@usedapp/core";
import { TransactionPendingContext } from '@Helpers/context';

const AccountModal = () => {
    
    const { account, deactivate } = useEthers();
    const [ pending ] = useContext(TransactionPendingContext);
    const [ showDropdown, setShowDropdown ] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }
 
    return (
        <div  className={styles.account_modal}>
            {
                account?
                    <div className={styles.account_dropdown_button} onClick={toggleDropdown}>
                        { account?.substring(0,6) + '...' + account?.substring(account?.length - 4) }
                    </div>
                    :
                    <div className={styles.account_dropdown_button}>
                        Connect Wallet
                    </div>
            }
            {
                showDropdown?

                    <div className={styles.account_modal_popup}>
                        <ul>
                            <li>
                                <Link href={`/u/${account}`}>
                                    <a>
                                        My account
                                    </a>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href={`/u/${account}`}>
                                    <a>
                                        Recent transactions
                                    </a>
                                </Link>
                            </li> */}
                            {/* <li>
                                <a href={`https://etherscan.io/address/${account}`}>
                                    View on etherscan
                                </a>
                            </li> */}
                            <li onClick={deactivate}>
                                <Link href={`/`}>
                                    <a>
                                        Disconnect
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    :
                    <></>
            }
            {
                pending?

                    <div className={`${styles.account_modal_popup} ${styles.account_pending_transaction}`}>
                        
                        <Loader
                            type="BallTriangle"
                            // type="Puff"
                            color="#00BFFF"
                            height={20}
                            width={20} //3 secs
                        />
                        <span>Pending transaction</span>

                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default AccountModal;
