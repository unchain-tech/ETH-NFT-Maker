// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

//OpenZeppelinが提供するヘルパー機能をインポートします。
import '@openzeppelin/contracts/utils/Counters.sol';

import './libraries/Base64.sol';
import 'hardhat/console.sol';

contract Web3Mint is ERC721 {
  struct NftAttributes {
    string name;
    string imageURL;
  }

  NftAttributes[] public Web3Nfts;

  using Counters for Counters.Counter;
  // tokenIdはNFTの一意な識別子で、0, 1, 2, .. N のように付与されます。
  Counters.Counter private _tokenIds;

  constructor() ERC721('NFT', 'nft') {
    console.log('This is my NFT contract.');
  }

  // ユーザーが NFT を取得するために実行する関数です。

  function mintIpfsNFT(string memory name, string memory imageURI) public {
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    Web3Nfts.push(NftAttributes({name: name, imageURL: imageURI}));
    console.log('An NFT w/ ID %s has been minted to %s', newItemId, msg.sender);
    _tokenIds.increment();
  }

  function tokenURI(
    uint256 _tokenId
  ) public view override returns (string memory) {
    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            Web3Nfts[_tokenId].name,
            ' -- NFT #: ',
            Strings.toString(_tokenId),
            '", "description": "An epic NFT", "image": "ipfs://',
            Web3Nfts[_tokenId].imageURL,
            '"}'
          )
        )
      )
    );
    string memory output = string(
      abi.encodePacked('data:application/json;base64,', json)
    );
    return output;
  }
}
