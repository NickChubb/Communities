# EthCommunities (Inactive 🚫)

Communities was a project that I started in an effort to learn and understand Ethereum Smart Contracts (with [Solidity](https://soliditylang.org/)) and interacting with a Blockchain as a decentralized backend service. 

The intention was to be a sort of "Social Network" in which access to community channels (groups) was controlled by holding [ERC-721 (Non-fungible) tokens](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). The intention of this being that the number of access cards to a group would be limited. Communities can be either public (any user can see posts in the community, but only users with an access token can make posts) or private (only users with an access token can post or view the community).

### How the backend works

1. Login, community structure and access are managed on a decentralized blockchain network
2. Meta-information about Communities, such as the community image, is hosted on the [Inter Planetary File System (IPFS)](https://ipfs.tech/)
3. Posts in a community are stored on a separate backend database, for example MongoDB

To see the Contracts created for this project, see here: [Contracts](https://github.com/NickChubb/Communities/blob/main/contracts).

## Final Progress

By the time I stopped working on this project, I had implemented several features and have a bare-bones example live on the Ropsten Test-Network (currently not working, see below...)

### Features Implemented:
- Creating Community Access Tokens
- Public Communities where anyone even without the token can see posts, but only users with an access token can post
- Private Communities where only users with the access token can see posts
- See all current users Communities
- Browse all created Communities
- Upload images for communities to the IPFS

  
### Photos

#### Homepage before wallet is connected

<img width="1800" alt="Screenshot 2023-10-12 at 3 43 35 PM" src="https://github.com/NickChubb/Communities/assets/4172020/27ceec6c-b939-4fb7-929d-f73e08c44904">

#### Create a new Community

<img width="1800" alt="Screenshot 2023-10-12 at 3 44 48 PM" src="https://github.com/NickChubb/Communities/assets/4172020/90f055a7-d6d2-4f8a-a526-2bc66717b1f0">

## Live Demo

Since the depreciation of the Ropsten test network, there is no longer a live demo of the site. I am working on uploading the contracts to a different test network currently.
