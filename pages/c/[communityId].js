import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useEthers } from "@usedapp/core"

import styles from "@Styles/Home.module.css"
import Layout from "@Components/Layout"
import useEth from "@Hooks/useEth"
import { TransactionPendingContext } from "@Helpers/context"

import { getCommunityContract, getCommunityObject } from "@Helpers/community"
import { getAllUserCommunities } from "@Helpers/communityHub"
import CommunityHomePage from "@Components/community/CommunityHomePage"
import CommunityImage from "@Components/shared/CommunityImage"

const CommunityPage = () => {
  const router = useRouter()
  const { communityId } = router.query

  const { account, library } = useEthers()
  const { signer } = useEth()
  const [community, setCommunity] = useState({})
  const [contract, setContract] = useState({})
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pending, updatePending] = useContext(TransactionPendingContext)

  useEffect(() => {
    if (!account || !library || !signer) return

    // get community by ID
    // Runs async functions at the same time and sets loading to false after
    // both resolve
    Promise.all([
      getCommunityContract(signer, communityId),
      getCommunityObject(library, communityId),
      getAllUserCommunities(library, account),
    ]).then(res => {
      setContract(res[0])
      setCommunity(res[1])

      // If the user's communities contains an NFT which has a contract
      // Address that matches the community ID, allow access.
      if (
        res[2]
          .map(communityObject => communityObject.address)
          .includes(res[1].address)
      ) {
        setAllowed(true)
      }

      setLoading(false)
    })
  }, [account, library, signer])

  const handleJoin = async () => {
    // mint token for user
    let transaction = await contract.safeMint(account, "")
    updatePending(true)
    transaction.wait().then(receipt => {
      updatePending(false)
    })
  }

  return (
    <Layout>
      <h1 className={`${styles.content_title} ${styles.community_title}`}>
        {community.name || communityId}
      </h1>

      <div className={styles.community_section}>
        {!loading ? (
          !allowed ? (
            <div>
              <CommunityImage communityProp={community} />
              <p>{community.description}</p>
              <p>
                Members:
                <span>{community.totalMemberCount.toString()}</span>/
                <span>{community.size.toString()}</span>
              </p>
              <button className={styles.button} onClick={handleJoin}>
                Join Community
              </button>
            </div>
          ) : (
            <CommunityHomePage userId={account} communityId={communityId} />
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  )
}

export default CommunityPage
