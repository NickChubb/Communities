import { getCommunityName } from "./community";

// Maintain map of addresses to common display names. 
const addrCache = new Map();

/**
 * Returns Community's CommunityName field or shortened form if not found
 * @param {String} addr - an ETH address of the form '0x1234567890ABCD...'
 */
export const fmtComAddr = async (provider, addr) => {
    // Create cache of addresses
    // let addrCache = JSON.parse(localStorage.getItem('addrCache')) || new Map();
    // let name = addrCache.get(addr);

    // Find address name from cache
    let name = addrCache.get(addr);
    if (!name) {
        // Search contracts for addr
        name = await getCommunityName(provider, addr);
        if (name) { 
            addrCache.set(addr, name);
            return name;
        }
        // Common name not found, return shorted address
        return fmtAddr(addr);
    }
    return name;
} 

/**
 * Returns Users's UserName field or shortened address form if not found.
 * TODO Lens? Disco? ENS name? Another one?
 * 
 * @param {*} addr 
 * @returns 
 */
export const fmtUserAddr = (addr) => {
    //TODO implement way to index user addresses
    // Do we want to use Lens? Disco? or another protocol?
    return fmtAddr(addr);
}

/**
 * Formats an address string to '0x1234...7890'
 * @param {*} addr - an ETH address of the form '0x1234567890ABCD...'
 * @returns 
 */
export const fmtAddr = (addr) => {
    return addr?.substring(0,6) + '...' + addr?.substring(addr?.length - 4);
}