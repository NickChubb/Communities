import React from 'react'
import styles from '../../styles/Home.module.css'

const LibraryCard = () => {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
        </a>
    )
}

export default LibraryCard
