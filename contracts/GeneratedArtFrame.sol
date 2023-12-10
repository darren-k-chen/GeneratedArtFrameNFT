// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/openzeppelin-contracts/contracts/access/Ownable.sol";
import "contracts/openzeppelin-contracts/contracts/utils/Strings.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "contracts/ERC721A/contracts/ERC721A.sol";

contract GeneratedArtFrame is ERC721A, Ownable {
    constructor() 
    ERC721A("GeneratedArtFrame", "GAF") Ownable(msg.sender) {}
    function mint(address to) external onlyOwner { _mint(to, 1); }

    // metadata URI
    string private _baseTokenURI;
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns(string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"))
            : '';
    }
}
