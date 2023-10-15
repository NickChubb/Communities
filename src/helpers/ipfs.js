const IPFS_BASEURL = process.env.IPFS_BASEURL || "https://ipfs.io/ipfs"

/**
 * Takes in an IPFS CID and returns IPFS URL from baseurl.
 * @param {String} cid
 * @returns
 */
export const cidToUrl = cid => {
  return `${IPFS_BASEURL}/${cid}`
}

export const getMetadata = async cid => {
  const response = await fetch(cid)
  console.log(response)
}
