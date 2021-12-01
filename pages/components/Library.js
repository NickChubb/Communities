import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css'
import LibraryCard from './LibraryCard'

const Library = ({wallet, provider, signer}) => {

  

  return (
      <div className={styles.library}>

      <h1 className={styles.library_title}>
        My Library
      </h1>

      <div className={styles.grid}>

        {
          <LibraryCard />
        }
      </div>
    </div>
  )
}

export default Library
