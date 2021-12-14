import { useState, useEffect } from 'react';

import styles from '@Styles/Home.module.css';
import { getAllUserCommunities } from '@Helpers/eth';
import LibraryCard from '@Components/library/LibraryCard';

const Library = ({wallet, provider, signer}) => {

  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    
    setNFTs(await getAllUserCommunities(wallet, provider));
    setLoading(false);

  }, [])

  return (
    <div >

      <h1 className={styles.content_title}>
        My Communities
      </h1>

      <div className={styles.grid}>

        {
          loading?
            <p>Loading...</p>
            :
            NFTs && NFTs.length > 0 ?
              NFTs.map((nft, key) => {
                console.log(nft)
                return <LibraryCard key={key} community={nft} />
              })
              :
              <div>
                <p>You're not currently part of any Communities. <span>😔</span></p>
                <p>Check out the <a href={`/explore`}>explore</a> page to find new communities!</p>   
              </div>
        }

      </div>
    </div>
  )
}

export default Library
