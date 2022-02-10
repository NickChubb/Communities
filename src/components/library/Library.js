import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useEthers } from '@usedapp/core';

import styles from '@Styles/Home.module.css';
import LibraryCard from '@Components/library/LibraryCard';
import CommunityCard from '@Components/explore/CommunityCard';
import { getAllUserCommunities } from '@Helpers/communityHub';

const Library = () => {

  const { account, library } = useEthers();

  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    if (!account || !library) return;
    setNFTs(await getAllUserCommunities(library, account));
    setLoading(false);

  }, [library])

  return (
    <div >

      <h1 className={styles.content_title}>
        My Communities
      </h1>

      <div className={styles.grid}>

        {
          loading?
            <Loader
                type="BallTriangle"
                style={{marginTop: '100px'}}
                // type="Puff"
                color="#00BFFF"
                height={150}
                width={150} //3 secs
            />
            :
            NFTs && NFTs.length > 0 ?
              NFTs.map((nft, key) => {
                console.log(nft);
                // return <LibraryCard key={key} community={nft} />
                return <CommunityCard key={key} community={nft} />
              })
              :
              <div>
                <p>You are not currently part of any Communities. <span>😔</span></p>
                <p>Check out the <a href={`/explore`}>explore</a> page to find new communities!</p>   
              </div>
        }

      </div>
    </div>
  )
}

export default Library
