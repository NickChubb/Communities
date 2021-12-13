// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub {

    string public constant VERSION = "0.1";
    string public constant NAME = "CommunityHub";

    // index of created contracts
    address[] public _communities;

    function getCommunityCount() public view returns(uint communityCount) {
        return _communities.length;
    }

    function getCommunities() public view returns (uint[] memory) {
        return _communities;
    }
    /**
    * 
    */
    function createCommunity(string memory name, string memory symbol, string memory description, uint size, string memory image, bool visibility) public returns(address newCommunity) {
        Community community = new Community(name, symbol, description, size, image, visibility);
        _communities.push(address(community));
        return address(community);
    }
}

/**
* Smart Contract which manages Community
*/
contract Community is ERC721, Pausable, AccessControl, ERC721Burnable {
    using Counters for Counters.Counter;

    // Admin
    Counters.Counter private _tokenIdCounter;
    address public _owner;

    // Community Information
    string public _communityName;
    string public _communitySymbol;
    string public _communityDescription; // !TODO Maybe we want this on IPFS instead?
    uint   public _communitySize;
    string public _communityImage; // IPFS link
    bool public _communityVisibility;

    constructor(string memory name, string memory symbol, string memory description, uint size, string memory image, bool visibility) ERC721(name, symbol) {

        _owner = msg.sender;

        _communityName = name;
        _communitySymbol = symbol;
        _communityDescription = description;
        _communitySize = size;
        _communityImage = image;
        _communityVisibility = visibility;
    }

    function getTokenCount() public view returns (uint256 currentTokenCount) {
        return _tokenIdCounter.current();
    }

    // /**
    // * Pause token -- indicates a user is banned
    // * !TODO paused token is non-transferrable
    // */
    // function pause() public onlyRole(PAUSER_ROLE) {
    //     _pause();
    // }

    // /**
    // * Unpause token
    // */
    // function unpause() public onlyRole(PAUSER_ROLE) {
    //     _unpause();
    // }

    /**
    * 
    */
    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= _communitySize, "All tokens have been minted.");

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /**
    * 
    */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // Transfer ownership of Contract

    // Make Moderator
    // Revoke Moderator


    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
