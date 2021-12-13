// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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
    string public _communityVisibility;

    constructor(string name, string symbol, string description, uint size, string image, bytes1 visibility) ERC721(name, symbol) {

        _owner = msg.sender;

        _communityName = name;
        _communitySymbol = symbol;
        _communityDescription = description;
        _communitySize = size;
        _communityImage = image;
        _communityVisibility = visibility;
    }

    function getTokenCount() public {
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
