import { ethers } from "ethers"
import { getAllCommunityAddrs } from "./community"

/**
 *
 * @returns
 */
export const requestAccount = async handleAccountsChanged => {
  const accounts = await ethereum
    .request({ method: "eth_requestAccounts" })
    // .then(handleAccountsChanged)
    .catch(err => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.")
      } else {
        console.error(err)
      }
    })

  if (!accounts || accounts.length == 0) return false
  return accounts[0]
}

/**
 * !DEPRECIATED use @Helpers/communityHub.js/getAllUserCommunities
 * @param {*} wallet
 * @returns
 */
export const getAllUserCommunities = async (wallet, provider) => {
  let url = `https://api-ropsten.etherscan.io/api?${new URLSearchParams({
    module: "account",
    action: "tokennfttx",
    apikey: process.env.ETHERSCAN_API_KEY,
    address: wallet,
  })}`

  // Build headers
  const headers = new Headers({
    "Content-Type": "application/json",
  })

  let res = await fetch(url, {
    method: "GET",
    headers: headers,
    // body: body
  })

  let [nfts, communities] = await Promise.all([
    res.json(),
    getAllCommunityAddrs(provider),
  ])

  //? Do we want to instead map the community address to lower in getAllCommunityAddrs?
  return nfts.result.filter(nft => communities.includes(nft.contractAddress))
}
