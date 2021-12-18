import { ethers } from "ethers";
import communityHubAbi from "@Abi/CommunityHub.json";
import communityAbi from "@Abi/Community.json";

const address = process.env.CH_CONTRACT_ADDRESS;

/**
 * Creates a new Community contract from the CommunityHub contract
 * @param {Web3Provider} signer 
 * @param {Object} data { string name, string symbol, string description, 
                        uint size, string image, bool visibility }
 */
export const createCommunity = async (signer, data) => {
    
    const communityHub = new ethers.Contract(address, communityHubAbi, signer);
    const response = await communityHub.createCommunity(data.name, data.symbol, data.size, data.metadata).catch((err) => {
        console.log(err)
    });
    return response;
}

/**
 * 
 * @param {Web3Provider} provider 
 * @param {String} address 
 * @returns {Object} contract
 */
export const getCommunityContract = async (provider, address) => {
    return (await new ethers.Contract(address, communityAbi, provider));
}

/**
 * 
 * @param {Web3Provider} provider   
 * @param {String} address
 * @returns {Object} Community information
 */
export const getCommunityObject = async (provider, address) => {
    let contract = await getCommunityContract(provider, address);
    console.log(contract);
    const [ 
        name, 
        size,
        totalMemberCount, 
        metadata ] = await Promise.all([
            contract._communityName(),
            contract._communitySize(),
            contract.getTokenCount(),
            contract._communityMetadata()
        ]);
    
    return {
        address: address,
        name: name,  
        size: size,
        totalMemberCount: totalMemberCount,
        metadata: metadata
    };
}



export const updateCommunity = async (signer, data) => {
    //!TODO
}

export const mintCommunityToken = async () => {
    //!TODO
}


export const getAllCommunityAddrs = async (provider) => {

    const communityHub = new ethers.Contract(address, communityHubAbi, provider);
    const communities = await communityHub.getCommunities();
    return communities.map(address => address.toLowerCase());
}

/**
 * Gets all community contracts created by the CommunityHub Contract
 * @param {Web3Provider} provider 
 * @returns 
 */
export const getAllCommunityObjects = async (provider) => {
    
    const communities = await getAllCommunityAddrs(provider);

    // Map community addresses to community contract objects
    return Promise.all(communities.map( (address) =>  getCommunityObject(provider, address)));
}