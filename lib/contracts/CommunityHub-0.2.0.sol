// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub {

    string public constant VERSION = "0.2.0";
    string public constant NAME = "CommunityHub";

    // index of created contracts
    address[] public _communities;

    function getCommunityCount() public view returns(uint communityCount) {
        return _communities.length;
    }

    function getCommunities() public view returns (address[] memory) {
        return _communities;
    }
    /**
    * 
    */
    function createCommunity(string memory name, string memory symbol, uint size, string memory metadata) public returns(address newCommunity) {
        Community community = new Community(name, symbol, size, metadata);
        _communities.push(address(community));
        return address(community);
    }
}

/**
* Smart Contract which manages Community
*/
contract Community is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    // Admin
    Counters.Counter private _tokenIdCounter;
    address public _owner;

    // Community Information
    string public _communityName;
    uint   public _communitySize;
    string public _communityMetadata;

    constructor(string memory name, string memory symbol, uint size, string memory metadata) ERC721(name, symbol) {

        _owner = msg.sender;

        // Save community information which is relevant for other functions.
        _communityName   = name;
        _communitySize   = size;

        // All other community information is stored as JSON in IPFS.
        // Should be of the form "ipfs://cid" where cid is the content
        // ID of the file.
        _communityMetadata = metadata;
    }

    function getTokenCount() public view returns (uint256 currentTokenCount) {
        return _tokenIdCounter.current();
    }

    /**
    * Safely mint a Community Access Token, as long as number of tokens which exist
    * does not exceed the Community Size
    * 
    * {String} uri - is the URI of the individual token metadata, presumably
    *                       stored with IPFS, and is of the form "ipfs://cid"
    */
    function safeMint(address to, string memory uri) public {
        require(_tokenIdCounter.current() <= _communitySize, "All tokens have been minted.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }


    /**
     * Transfer ownership of Contract.  Can only be called by the owner.
     * Receiving address will be made owner and will be granted rights 
     * associated to that in the dapp.
     */
    function transferOwnership(address to) public {
        require(msg.sender == _owner, "Only the owner can transfer community ownership.");
        _owner = to;
    }
    
    /* The following functions are overrides required by Solidity. */

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
