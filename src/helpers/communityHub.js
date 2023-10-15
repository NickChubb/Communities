import { ethers } from "ethers"
import { getCommunityObject } from "./community"
import communityHubAbi from "@Abi/CommunityHub.json"

const address = process.env.CH_CONTRACT_ADDRESS

/**
 * Creates a new Community contract from the CommunityHub contract
 * @param {Web3Provider} signer 
 * @param {Object} data { string name, string symbol, string description, 
                        uint size, string image, bool visibility }
 */
export const createCommunity = async (signer, data) => {
  const communityHub = new ethers.Contract(address, communityHubAbi, signer)
  const response = await communityHub
    .createCommunity(data.name, data.symbol, data.size, data.metadata)
    .catch(err => {
      console.log(err)
    })
  return response
}

export const getAllCommunityAddrs = async provider => {
  const communityHub = new ethers.Contract(address, communityHubAbi, provider)
  const communities = await communityHub.getAllCommunities()
  return communities
}

/**
 * Gets all community contracts created by the CommunityHub Contract
 * @param {Web3Provider} provider
 * @returns
 */
export const getAllCommunityObjects = async provider => {
  const communities = await getAllCommunityAddrs(provider)

  // Map community addresses to community contract objects
  return Promise.all(
    communities.map(address => getCommunityObject(provider, address))
  )
}

/**
 * Queries CommunityHub contract to find communities associated
 * with wallet ID
 * @param {*} provider
 * @param {*} wallet
 */
export const getAllUserCommunities = async (provider, walletId) => {
  const communityHub = new ethers.Contract(address, communityHubAbi, provider)
  const communities = await communityHub.getCommunities(walletId)
  return Promise.all(
    communities.map(community => getCommunityObject(provider, community))
  )
}
