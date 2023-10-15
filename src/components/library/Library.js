import { useState, useEffect } from "react"
import Loader from "react-loader-spinner"
import { useEthers } from "@usedapp/core"

import styles from "@Styles/Home.module.css"
import CommunityCard from "@Components/explore/CommunityCard"
import { getAllUserCommunities } from "@Helpers/communityHub"

const Library = () => {
  const { account, library } = useEthers()
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (!account || !library) return
    setCommunities(await getAllUserCommunities(library, account))
    setLoading(false)
  }, [library])

  return (
    <div>
      <h1 className={styles.content_title}>My Communities</h1>
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
            return <CommunityCard key={key} community={community} />
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
  )
}

export default Library
