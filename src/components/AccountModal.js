import React, { useContext, useState } from 'react';
import Loader from "react-loader-spinner";
import Link from 'next/link';
import { GiHamburgerMenu, GiExitDoor } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiLogoutBoxRFill } from 'react-icons/ri'

import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'
import { useEthers } from "@usedapp/core";
import { TransactionPendingContext } from '@Helpers/context';
import { fmtUserAddr } from '@Helpers/format';

const AccountModal = () => {
    
    const { account, deactivate } = useEthers();
    const [ pending ] = useContext(TransactionPendingContext);
    const [ showDropdown, setShowDropdown ] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }
 
    return (
        <div className={styles.account_modal}>
            <div className={styles.account_modal_wrapper} onClick={toggleDropdown}>
                {
                    pending?
                        <div className={`${styles.account_modal_pending} ${styles.account_pending_transaction}`}>
                            <Loader
                                type="BallTriangle"
                                // type="Puff"
                                color="#282828"
                                height={20}
                                width={20} //3 secs
                            />
                        </div>
                        :
                        <></>
                }
                <div className={styles.account_modal_button}>
                    {
                        account?
                            <span className={styles.account_modal_text} >
                                { fmtUserAddr(account) }
                            </span>
                            :
                            <span className={styles.account_modal_text}>
                                Connect Wallet
                            </span>
                    }
                    <div className={styles.account_dropdown_icon}>
                        <GiHamburgerMenu />
                    </div>
                </div>             
            </div>
            {
                showDropdown?
                    <div className={styles.account_modal_popup}>
                        <ul>
                            <li>
                                <Link href={`/u/${account}`}>
                                    <a>
                                        <BsFillPersonFill /> My account
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
                                        <RiLogoutBoxRFill /> Disconnect
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    :
                    <></>
            }
            
        </div>
    )
}

export default AccountModal;
