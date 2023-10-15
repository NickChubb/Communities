import { useRouter } from "next/router"
import Layout from "@Components/Layout"
import styles from "@Styles/Home.module.css"
import UserIcon from "@Components/shared/UserIcon"
import { useEffect, useState } from "react"
import { getAllUserCommunities } from "@Helpers/communityHub"
import { useEthers } from "@usedapp/core"
import Loader from "react-loader-spinner"
import CommunityCard from "@Components/explore/CommunityCard"

const AccountPage = () => {
  const { query } = useRouter()
  const { walletId } = query
  const { library } = useEthers()
  const [loading, setLoading] = useState(true)
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    if (!library || !walletId) return
    getAllUserCommunities(library, walletId).then(res => {
      setCommunities(res)
      setLoading(false)
    })
  }, [library, walletId])

  return (
    <Layout>
      <div className={styles.profile_grid_container}>
        <div className={styles.profile_image_section}>
          {walletId && (
            <div className={styles.profile_image_container}>
              <UserIcon address={walletId} className={styles.profile_image} />
            </div>
          )}
        </div>
        <div className={styles.profile_info_section}>
          <div className={styles.profile_info_title}>{walletId}</div>
        </div>
      </div>

      <div className={styles.profile_info_communities}>
        <h1>User&apos;s Communities</h1>
        <div className={styles.grid}>
          {loading ? (
            <Loader
              type="BallTriangle"
              style={{ marginTop: "100px" }}
              // type="Puff"
              color="#00BFFF"
              height={150}
              width={150} //3 secs
            />
          ) : communities && communities.length > 0 ? (
            communities.map((community, key) => {
              return <CommunityCard className={styles.card} key={key} community={community} />
            })
          ) : (
            <div>
              <p>
                You are not currently part of any Communities. <span>😔</span>
              </p>
              <p>
                Check out the <a href={`/explore`}>explore</a> page to find new
                communities!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default AccountPage
