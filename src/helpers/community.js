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
    return ( await communityHub.createCommunity(data.name, data.symbol, data.description, data.size, data.image, true));
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
        symbol, 
        description, 
        size,
        totalMemberCount, 
        image, 
        visibility ] = await Promise.all([
            contract._communityName(),
            contract._communitySymbol(),
            contract._communityDescription(),
            contract._communitySize(),
            contract.getTokenCount(),
            contract._communityImage(),
            contract._communityVisibility()
        ]);
    
    return {
        address: address,
        name: name, 
        symbol: symbol, 
        description: description, 
        size: size,
        totalMemberCount: totalMemberCount,
        image: image,
        visibility: visibility 
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