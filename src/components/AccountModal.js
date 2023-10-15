import React, { useContext, useState } from 'react';
import Loader from "react-loader-spinner";
import Link from 'next/link';
import { BsFillPersonFill, BsGithub } from 'react-icons/bs'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { FaEthereum } from 'react-icons/fa'

import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'
import { useEthers } from "@usedapp/core";
import { TransactionPendingContext } from '@Helpers/context';
import { shortenAddress } from '@Helpers/social';
import UserIcon from './shared/UserIcon';

const AccountModal = () => {
    
    const { account, deactivate } = useEthers();
    const [ pending ] = useContext(TransactionPendingContext);
    const [ showDropdown, setShowDropdown ] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }
 
    return (
        <div  className={styles.account_modal}>

            <div className={styles.account_dropdown_button} onClick={toggleDropdown}>
                
                {
                    account?
                        <div className={styles.account_dropdown_address}>
                            { shortenAddress(account) }
                        </div>
                        :
                        <div className={styles.account_dropdown_address}>
                            Connect Wallet
                        </div>
                }

                <div className={styles.account_dropdown_icon}>
                    {/* <GiHamburgerMenu /> */}
                    <UserIcon address={account || 'dfgadfd'} height={32} width={32} />
                </div>
            </div>
            {
                showDropdown && account?

                    <div className={styles.account_modal_popup}>
                        <ul>
                            <li>
                                <Link href={`/u/${account}`}>
                                    <a>
                                        <BsFillPersonFill /> My account
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href={`https://sepolia.etherscan.io/address/${account}`}
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <FaEthereum /> Etherscan
                                </a>
                            </li>
                            {/* <li>
                                <a 
                                    href={`https://github.com/NickChubb/Communities`}
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <BsGithub /> Github
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
