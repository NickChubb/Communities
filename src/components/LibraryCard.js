import React from 'react'

import styles from '@Styles/Home.module.css'

const LibraryCard = ({nft}) => {
    return (
        <a href={`/community/${nft.contractAddress}`} className={styles.card}>
            <h2>{nft.tokenName || nft.contractAddress}</h2>
            <p>Enter...</p>
        </a>
    )
}

export default LibraryCard