import { ethers } from "ethers"
import communityAbi from "@Abi/Community.json"

const address = process.env.CH_CONTRACT_ADDRESS

/**
 *
 * @param {Web3Provider} provider
 * @param {String} address
 * @returns {Object} contract
 */
export const getCommunityContract = async (provider, address) => {
  return await new ethers.Contract(address, communityAbi, provider)
}

/**
 *
 * @param {Web3Provider} provider
 * @param {String} address
 * @returns {Object} Community information
 */
export const getCommunityObject = async (provider, address) => {
  let contract = await getCommunityContract(provider, address)
  console.log(contract)
  const [name, size, totalMemberCount, metadata] = await Promise.all([
    contract.communityName(),
    contract.communitySize(),
    contract.getTokenCount(),
    contract.communityMetadata(),
  ])

  return {
    address: address,
    name: name,
    size: size,
    totalMemberCount: totalMemberCount,
    metadata: metadata,
  }
}

export const updateCommunity = async (signer, data) => {
  //!TODO
}

export const mintCommunityToken = async () => {
  //!TODO
}
