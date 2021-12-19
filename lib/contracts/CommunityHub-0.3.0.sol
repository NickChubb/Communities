// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Metadata
    string public constant VERSION = "0.3.0";
    string public constant NAME = "CommunityHub";

    // index of created Community addresses
    address[] public _communities;

    // Info for communities user has joined
    struct CommunityInfo {
        address communityAddress;
        uint256 since;
    }

    struct User {

    }

    // Mapping of addresses to array of communities they are in and since when
    mapping (address => User) public users;

    

    function getCommunityCount() public view returns(uint communityCount) {
        return _communities.length;
    }

    function getCommunities() public view returns (address[] memory) {
        return _communities;
    }

    // Leave Community

    // Join Community

    /**
    * 
    */
    function createCommunity(string memory name, string memory symbol, uint size, string memory metadata) public returns(address newCommunity) {
        Community community = new Community(name, symbol, size, metadata, msg.sender, address(this));
        _communities.push(address(community));
        return address(community);
    }
}

/**
* Smart Contract which manages Community
* Community contract mints NFTs for users when they
* join.
*/
contract Community is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Metadata
    Counters.Counter private _tokenIdCounter;
    CommunityHub private _communityHubContract;

    // Community Information
    string public _communityName;
    uint   public _communitySize;
    string public _communityMetadata;

    constructor(string memory name, string memory symbol, 
                uint size, string memory metadata, 
                address creator, address hubAddress) ERC721(name, symbol) {

        _owner = creator;
        _communityHubContract = CommunityHub(hubAddress);

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

    /// ERC721 OVERRIDES
    /// Overiding the ERC721 interface functions to update User mapping
    /// in the CommunityHub contract, which allows users to gain tokens
    /// for holding Membership Cards.

    // transfer
    // safeTransfer
    // etc.



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
