const log = (content) => console.log(content);
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const merkleConfig = {
    sortPairs: true
};

log('======================')

const whitelistAddressList = [
    '0xB92CCc983DFdbB0E22303031d772513C7D5692b7',
    '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
];

// Creating new array with hashing all whitelist addresses using keccak256
const leafNodeList = whitelistAddressList.map(address => keccak256(address));

// Creating Merkle Tree algorithm using keccak256
const merkleTree = new MerkleTree(leafNodeList, keccak256, merkleConfig);
// log merkleTree with toString() method to see the root hash

// Getting root hash of the merkle tree in hex format (0x) and print it out
const rootHash = merkleTree.getRoot();

// Client Side: use msg.sender address to query and API that returns merkle proof hash
// required to derive the root hash of the MerkleTree
const claimingAddress = leafNodeList[1];

// getHexProof returns the neighbour leaf and all parent nodes hashes that will
// be required to derive the MerkleTree root hash of the
const hexProof = merkleTree.getHexProof(claimingAddress);

// Verifying hex proof to see if the address is in the whitelist
// const verify = merkleTree.verify(hexProof, claimingAddress, rootHash);

// log(merkleTree.toString()) // TO get merkle root
log(hexProof) // TO get proof hashes for Smart Contract

// console.log(merkleTree.verify(hexProof,claimingAddress, rootHash))


// Example of proofed hash [ "0xe4aa63f87306767c7dca38d95089fd748b4c3b2b793034bf5ea88843a5f09c7b", "0x39a01635c6a38f8beb0adde454f205fffbb2157797bf1980f8f93a5f70c9f8e6"]