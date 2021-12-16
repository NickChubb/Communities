import React, { useContext } from 'react';
import Link from 'next/link';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'
import { useEthers } from "@usedapp/core";
import { TransactionPendingContext } from '@Helpers/context';

const AccountModal = () => {
    
    const { account } = useEthers();
    const [ pending ] = useContext(TransactionPendingContext);

    return (
        <Link href={`/u/${account}`} >
            <a className={styles.account_button}>
                {account || "Log in"}
                <br />
                {
                    pending?
                        <p>Pending transaction.</p>
                        :
                        <></>
                }
                
            </a>
        </Link>
    )
}

export default AccountModal;
