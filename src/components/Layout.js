import React from 'react';
import Loader from 'react-loader-spinner';
import { useEthers } from '@usedapp/core';

import Head from 'next/head'
import NavBar from './NavBar'
import Image from 'next/image'
import styles from '@Styles/Home.module.css'
import AccountButton from './AccountModal'
import useEth from '@Hooks/useEth'
import Login from './login/Login'

const Layout = (props) => {

    // const { wallet, loading } = useEth();
    const { account, active } = useEthers();

    return (
        <div className={styles.container}>
            <Head>
                <title>Communities</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AccountButton />

            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Communities
                    </h1>

                    <NavBar />
                </div>
        
                {
                    // loading?
                    //     <Loader
                    //         type="BallTriangle"
                    //         style={{marginTop: '100px'}}
                    //         // type="Puff"
                    //         color="#00BFFF"
                    //         height={150}
                    //         width={150} //3 secs
                    //     />
                    //     :
                        !account ?
                            <Login />
                            :
                            <div className={styles.content} >
                                {props.children}
                            </div>
                        
                }

                


            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default Layout
