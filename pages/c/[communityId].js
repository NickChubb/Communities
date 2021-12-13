import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import styles from '@Styles/Home.module.css';
import Layout from '@Components/Layout'
import useEth from '@Hooks/useEth';

import { getCommunityContract,
          getCommunityObject } from '@Helpers/community';

const CommunityPage = () => {
  const router = useRouter()
  const { communityId } = router.query;

  const { provider, signer, wallet } = useEth();
  const [ community, setCommunity ] = useState({});
  const [ contract, setContract ] = useState({});
  const [ loading, setLoading ] = useState(true);

  useEffect(async () => {

    if (!communityId || !provider || !signer) return;

    // get community by ID
    // Runs async functions at the same time and sets loading to false after
    // both resolve
    Promise.all([getCommunityContract(signer, communityId), 
                  getCommunityObject(provider, communityId)]).then((res) => {
                    setContract(res[0]);
                    setCommunity(res[1]);
                    setLoading(false);
                  });

  }, [communityId, provider, signer])

  const handleJoin = async () => {
    // mint token for user
    await contract.safeMint(wallet);
  }
 
  return (
    <Layout>
      <h1 className={styles.content_title}>
        {community.name || communityId}
      </h1>

      {
        !loading ?
          (
            <div >
              <p>{community.description}</p>

              <p>Members: 
                <span>{community.totalMemberCount.toString()}</span>
                 /  
                <span>{community.size.toString()}</span>
              </p>

              <button onClick={handleJoin}>Join Community</button>

            </div>
          )
          :
          (<p>Loading...</p>)
      }

    </Layout>
  )
}

export default CommunityPage;