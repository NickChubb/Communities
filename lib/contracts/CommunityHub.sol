// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./Community.sol";

// Contract which allows users to create new communities,
// which are contracts that define a set of ERC-721 tokens
// that can be purchased from the community website.
contract CommunityHub {

    string public constant VERSION = "0.1";
    string public constant NAME = "CommunityHub";

    // index of created contracts
    address[] public _communities;

    function getCommunityCount() public returns(uint communityCount) {
        return _communities.length;
    }

    /**
    * 
    */
    function createCommunity(string name, string description, uint size, string image, string visibility) public returns(address newCommunity) {
        Community community = new Community(name, size, banner, image, visibility);
        _communities.push(community);
        return community;
    }
}