// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub is Ownable {
    // using SafeMath for uint256;
    // using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    // Events
    event CardTransfer(
        address from, 
        address to, 
        uint256 tokenId,
        address communityAddress
    );

    event Log(
        string text
    );

    // Metadata
    string public constant VERSION = "0.3.0";
    string public constant NAME = "CommunityHub";

    // Constants 
    uint256 public constant REWARD_FREQUENCY = 60 * 60 * 24;
    uint256 public constant BASE_REWARD = 1;

    // Community Token
    CommunityToken public token = new CommunityToken();

    // index of created Community addresses
    address[] private communities;

    /// The User struct
    struct UserInfo {
        EnumerableSet.AddressSet communities;
        // Mapping community address to card number to since 
        mapping ( address => mapping ( uint256 => uint256 ) ) cards;

        /* TODO */

        // User information, allows user to associate information in
        // the form of strings associated with their web3 account
        // Eg. 'username' =>  'User12345'
        //mapping ( string => string ) userInfo;
        // Allows user information in the form of integers to be
        // stored and accessed by string key.
        //mapping ( string => uint256 ) userValues;
    }

    // Mapping of user addresses to array of communities membership cards they own
    mapping ( address => UserInfo ) internal users;

    // constructor ( 

    // ){
        
    // }

    function getAllCommunityCount() public view returns(uint communityCount) {
        return communities.length;
    }

    function getAllCommunities() public view returns (address[] memory) {
        return communities;
    }

    /// Get user's communities
    function getCommunities(
        address _user
    ) public view returns (address[] memory) {
        return users[_user].communities.values();
    }

    /// Create a new instance of the Community Contract
    /// Sets caller as owner of the new contract
    function createCommunity(
        string memory _name, 
        string memory _symbol, 
        uint _size, 
        string memory _metadata
    ) public returns(address _newCommunity) {
        Community community = new Community(_name, _symbol, _size, _metadata, msg.sender, address(this));
        communities.push(address(community));
        return address(community);
    }

    /* Internal */

    /// Handles card ownership transfers, including modifying _users mapping
    /// Called from _afterTokenTransfer in Community contracts, so it fires
    /// on Community Access Cards being created or burned too, not just
    /// transferred from one user to another. 
    function _transferCardOwnership(
        address _from, 
        address _to, 
        uint256 _tokenId,
        address _communityAddress
    ) external {

        emit Log("_transferCardOwnership.");
        emit CardTransfer(_from, _to, _tokenId, _communityAddress); 

        // Requires function call to be from Community
        require(msg.sender == _communityAddress, "Only the community may change it\'s card ownership.");

        if (_from != address(0)) {

            // Get balance of user for community 
            Community community = Community(_communityAddress);
            require ( community.balanceOf(_from) > 0, "User must hold token in wallet.");

            // Calculate reward and remove card from sender
            uint256 reward = _calculateReward(users[_from].cards[_communityAddress][_tokenId], community.communitySize());
            users[_from].cards[_communityAddress][_tokenId] = 0x0;
            users[_from].communities.remove(_communityAddress);
            
            // Add reward to from user
            token.mint(_from, reward);
        }

        // push to array for 'to' address
        users[_to].communities.add(_communityAddress);
        // add new community card to mapping for 'to' address
        users[_to].cards[_communityAddress][_tokenId] = block.timestamp;
    }

    /// Calculates a reward for 
    function _calculateReward( 
        uint256 _since, 
        uint256 _communityMultiplier 
    ) internal returns (uint256 reward) {
        return (( block.timestamp - _since ) / REWARD_FREQUENCY ) * BASE_REWARD * _communityMultiplier;
    }
}

/**
* Smart Contract which manages Community
* Community contract mints NFTs for users when they
* join.
*/
contract Community is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Events
    event Log(
        string text
    );

    // Metadata
    Counters.Counter private tokenIdCounter;
    CommunityHub private communityHubContract;

    // Community Information
    string public communityName;
    uint   public communitySize;
    string public communityMetadata;

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint _size, 
        string memory _metadata, 
        address _creator, 
        address _hubAddress
    ) ERC721(_name, _symbol) {

        // Transfer Ownership of Community to Creator address
        transferOwnership(_creator);
        communityHubContract = CommunityHub(_hubAddress);

        // Save community information which is relevant for other functions.
        communityName = _name;
        communitySize = _size;

        // All other community information is stored as JSON in IPFS.
        // Should be of the form "ipfs://cid" where cid is the content
        // ID of the file.
        communityMetadata = _metadata;
    }

    function getTokenCount() public view returns (uint256 _currentTokenCount) {
        return tokenIdCounter.current();
    }

    /**
    * Safely mint a Community Access Token, as long as number of tokens which exist
    * does not exceed the Community Size
    * 
    * {String} uri - is the URI of the individual token metadata, presumably
    *                       stored with IPFS, and is of the form "ipfs://cid"
    */
    function safeMint(
        address _to, 
        string memory _uri
    ) public {
        require(tokenIdCounter.current() <= communitySize, "All tokens have been minted.");

        emit Log("SAFEMINT1.");
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _uri);

        communityHubContract._transferCardOwnership(address(0), _to, tokenId, address(this));
        emit Log("SAFEMINT2.");
    }

    /// ERC721 OVERRIDES
    /// Overiding the ERC721 interface functions to update User mapping
    /// in the CommunityHub contract, which allows users to gain tokens
    /// for holding Membership Cards.

    function _beforeTokenTransfer(
        address _from,
        address _to
    ) internal {

        // Require payment -> depends on size of Community?

    }

    function _afterTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        emit Log("AFTER TOKEN TRANSFER.");
        communityHubContract._transferCardOwnership(_from, _to, _tokenId, address(this));
    }

    /* The following functions are overrides required by Solidity. */

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }
}

/// The CommunityToken
/// 
///
contract CommunityToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor() ERC20("CommunityToken", "COM") ERC20Permit("CommunityToken") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}