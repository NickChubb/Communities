import { ethers } from "ethers";

/**
 * 
 * @param {*} wallet 
 * @param {*} provider 
 * @param {*} signer 
 * @param {*} data 
 */
export const createCommunity = async (signer, data) => {

    const bytecode = "";

    // A Human-Readable ABI; we only need to specify relevant fragments,
    // in the case of deployment this means the constructor
    const abi = [
        "constructor(uint totalSupply)"
    ];
    
    const factory = new ethers.ContractFactory(abi, bytecode, signer)

}

export const updateCommunity = async (signer, data) => {

}

export const mintCommunityToken = async () => {

}