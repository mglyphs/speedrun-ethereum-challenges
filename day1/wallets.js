import {ethers} from "ethers";

const wallet = ethers.Wallet.createRandom();
// const wallet = ethers.HDNodeWallet.createRandom();

console.log("address:", wallet.address);
console.log("private key:", wallet.privateKey);
console.log("mnemonic:", wallet.mnemonic);

let path, myWallet;

for (let i=0; i<10; i++){
    path = ethers.getIndexedAccountPath(i);
    console.log("path: ", path);
    myWallet = ethers.HDNodeWallet.fromPhrase(wallet.mnemonic.phrase, undefined, path)
    console.log("address: ",i, myWallet.address);
    console.log("private key:",i, myWallet.privateKey);
}