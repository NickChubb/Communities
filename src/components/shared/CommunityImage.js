import React, { useState, useEffect } from "react"
import { useEthers } from "@usedapp/core"
import styles from "@Styles/Home.module.css"
import { getCommunityObject } from "@Helpers/community"

const CommunityImage = ({ communityProp, communityId }) => {
  const [community, setCommunity] = useState(communityProp)
  const { library } = useEthers()
  const [metadata, setMetadata] = useState({})
  const [imageLink, setImageLink] = useState("")

  useEffect(() => {
    if (!communityId) return
    getCommunityObject(library, communityId).then(res => {
      setCommunity(res)
    })
  }, [communityId, library])

  useEffect(() => {
    if (!community || !community.metadata) return
    const cid = community.metadata.substring(7)
    const gatewayUrl = `https://ipfs.io/ipfs/${cid}`

    fetch(gatewayUrl).then(data => {
      data.json().then(json => {
        setMetadata(json)
        const imageCid = json.image.substring(7)
        setImageLink(`https://ipfs.io/ipfs/${imageCid}`)
      })
    })
  }, [community])

  return (
    <div
      className={styles.community_image}
      style={{ backgroundImage: `url("${imageLink}")` }}
    />
  )
}

export default CommunityImage
