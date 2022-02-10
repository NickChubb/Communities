// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    // Metadata
    string public constant VERSION = "0.3.0";
    string public constant NAME = "CommunityHub";

    // Constants 
    uint256 public constant REWARD_FREQUENCY = 60 * 60 * 24;
    uint256 public constant BASE_REWARD = 1;

    // index of created Community addresses
    address[] public _communities;

    /// The User struct
    struct User {
        EnumerableSet.AddressSet communities;
        // Mapping community address to card number to since 
        mapping ( address => mapping ( uint256 => uint256 ) ) cards;

        /* ALPHA */

        // User information, allows user to associate information in
        // the form of strings associated with their web3 account
        // Eg. 'username' =>  'User12345'
        //mapping ( string => string ) userInfo;
        // Allows user information in the form of integers to be
        // stored and accessed by string key.
        //mapping ( string => uint256 ) userValues;
    }

    // Mapping of user addresses to array of communities membership cards they own
    // mapping (address => Community[] ) public _users;
    mapping ( address => User ) public _users;

    function getAllCommunityCount() public view returns(uint communityCount) {
        return _communities.length;
    }


    function getAllCommunities() public view returns (address[] memory) {
        return _communities;
    }

    /// Get user's communities
    function getCommunities(
        address user
    ) public view returns (Community[] memory communities) {
        return _users[user];
    }

    /// Create a new instance of the Community Contract
    /// Sets caller as owner of the new contract
    function createCommunity(
        string memory name, 
        string memory symbol, 
        uint size, 
        string memory metadata
    ) public returns(address newCommunity) {
        Community community = new Community(name, symbol, size, metadata, msg.sender, address(this));
        _communities.push(address(community));
        return address(community);
    }

    /* Internal */

    /// Handles card ownership transfers, including modifying _users mapping
    /// Called from _afterTokenTransfer in Community contracts, so it fires
    /// on Community Access Cards being created or burned too, not just
    /// transferred from one user to another. 
    function _transferCardOwnership(
        address from, 
        address to, 
        uint256 tokenId,
        address communityAddress
    ) internal {

        // Get balance of user   for community      
        Community community = Community(communityAddress);
        require ( community.balanceOf(from) > 0, "User must hold token in wallet.");

        // Calculate reward and remove card from sender
        uint256 reward = _calculateReward(_users[from].cards[communityAddress][tokenId], community.rewardMultiplier());
        _users[from].cards[communityAddress][tokenId] = 0x0;
        EnumerableSet.remove(_users[from].communities, address);
        
        // Add reward to from user
        Token._mint(from, reward);

        // push to array for 'to' address
        EnumerableSet.add(_users[to].communities, address);
        // add new community card to mapping for 'to' address
        _users[to].cards[communityAddress][tokenId] = block.timestamp;
    }

    /// Calculates a reward for 
    function _calculateReward( uint256 since, uint256 communityMultiplier ) internal returns (uint256 reward) {
        return (( block.timestamp - since ) / REWARD_FREQUENCY ) * BASE_REWARD * communityMultiplier;
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

    constructor(
        string memory name, 
        string memory symbol, 
        uint size, 
        string memory metadata, 
        address creator, 
        address hubAddress
    ) ERC721(name, symbol) {

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

    function _beforeTokenTransfer(
        address from,
        address to
    ) internal override {

        // Require payment -> depends on size of Community?

    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        _communityHubContract._transferCardOwnership(from, to, tokenId, address(this));
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
