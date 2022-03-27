const log = (content) => console.log(content);
log('Node Starts')
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const merkleConfig = {
    sortPairs: true
};

log('======================')

const whitelistAddressList = [
    '0xB92CCc983DFdbB0E22303031d772513C7D5692b7',
    '0x1551AD0a4f658D3F66a55F1B6bAbac3300A81351',
    '0x8Fa461074FC99D7B874569869b2559Addd00d9AD',
    "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC"
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
const claimingAddress = leafNodeList[3];

// getHexProof returns the neighbour leaf and all parent nodes hashes that will
// be required to derive the MerkleTree root hash of the
const hexProof = merkleTree.getHexProof(claimingAddress);

// Verifying hex proof to see if the address is in the whitelist
const verify = merkleTree.verify(hexProof, claimingAddress, rootHash);

// log(merkleTree.toString()) // TO get merkle root
// log(hexProof) // TO get proof hashes for Smart Contract

const proofHashes = ["0xae6aff81f64c5fe1ee77af4d7d2f724505316744298d1752c5236721594e3a77","0xefd8509d26063d6661b7e283898d49bc6dc5191443d73fb628fa858f4ece5310"];