import { ethers } from "ethers";
import communityAbi from "@Abi/Community.json";

// Address of CommunityHub contract
const address = process.env.CH_CONTRACT_ADDRESS;

// Maintain an array of contracts, to save time fetching from chain
// for contracts which are frequently referenced.
const contractCache = [];

/**
 * Gets a community contract.
 * @param {Web3Provider} provider 
 * @param {String} address 
 * @returns {Object} contract
 */
export const getCommunityContract = (provider, address) => {
    // Check if contract already saved locally
    let contract = contractCache.find(c => c.address == address);
    if (contract) return contract;

    // Otherwise return contract from on-chain provider
    contract = new ethers.Contract(address, communityAbi, provider);
    contractCache.push(contract);
    return contract;
}

/**
 * 
 * @param {Web3Provider} provider   
 * @param {String} address
 * @returns {Object} Community information
 */
export const getCommunityObject = async (provider, address) => {
    let contract = getCommunityContract(provider, address);
    const [ 
        name, 
        size,
        totalMemberCount, 
        metadata ] = await Promise.all([
            contract.communityName(),
            contract.communitySize(),
            contract.getTokenCount(),
            contract.communityMetadata()
        ]);
    
    return {
        address: address,
        name: name,  
        size: size,
        totalMemberCount: totalMemberCount,
        metadata: metadata
    };
}

/**
 * Directly return CommunityName from contract corresponding to address.
 * @param {*} provider 
 * @param {*} address 
 * @returns 
 */
export const getCommunityName = async (provider, address) => {
    let contract = getCommunityContract(provider, address);
    return (await contract.communityName());
}

export const updateCommunity = async (signer, data) => {
    //!TODO
}

export const mintCommunityToken = async () => {
    //!TODO
}


