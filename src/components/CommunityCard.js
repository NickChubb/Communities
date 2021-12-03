import React from 'react'

import Image from 'next/image';
import styles from '@Styles/Home.module.css'

const LibraryCard = ({nft}) => {
    return (
        <a href={`/community/${nft.contractAddress}`} className={styles.card}>
            <div className={styles.card_image} >
                <Image src="/placeholder.png" alt="Community Placeholder" width={'300'} height={'150'}layout="intrinsic" />
            </div>
            <div className={styles.card_body} >
                <h2>{nft.tokenName || nft.contractAddress}</h2>
                <p>Enter...</p>
            </div>
        </a>
    )
}

export default LibraryCard