import React from 'react'

import Image from 'next/image';
import styles from '@Styles/Home.module.css'

const CommunityCard = ({community}) => {

    return (
        <a href={`/c/${community.contractAddress}`} className={styles.card}>
            <div className={styles.card_image} >
                <Image src="/placeholder.png" alt="Community Placeholder" width={'300'} height={'150'}layout="intrinsic" />
            </div>
            <div className={styles.card_body} >
                <h2>{community.tokenName || community.contractAddress}</h2>
                <p>Enter...</p>
            </div>
        </a>
    )
}

export default CommunityCard;