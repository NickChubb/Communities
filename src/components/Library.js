import { useState, useEffect } from 'react';

import styles from '@Styles/Home.module.css';
import { getAllNfts } from '@Helpers/eth';
import LibraryCard from './CommunityCard'

const Library = ({wallet, provider, signer}) => {

  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    
    setNFTs(await getAllNfts(wallet));
    setLoading(false);

  }, [])

  return (
    <div >

      <h1 className={styles.content_title}>
        My Communities
      </h1>

      <div className={styles.grid}>

        {
          NFTs && NFTs.length > 0 ?
            NFTs.map((nft) => {
              return <LibraryCard nft={nft} />
            })
            :
            <p>No NFTs in Library</p>
        }
      </div>
    </div>
  )
}

export default Library
