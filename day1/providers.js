import "dotenv/config";
import {ethers} from "ethers";

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
// const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const provider = ethers.getDefaultProvider(infuraUrl);

// console.log("Current block number", await provider.getBlockNumber());
// console.log("Eth address is: ", await provider.resolveName("edatweets.eth"));
// console.log("Eth address is: ", await provider.lookupAddress("0xc4Ac4174AA9A93d9eef02621cE8205C75D003dE5"));

const vitalikBalance = await provider.getBalance("vitalik.eth");
console.log("vitalik.eth has ", ethers.formatEther(vitalikBalance));
// console.log("1.5 eth is", ethers.parseEther("1.5"));

const edaBalance = await provider.getBalance("edatweets.eth");
console.log("edatweets.eth has ", ethers.formatEther(edaBalance));

if (vitalikBalance > edaBalance) {
    console.log("Vitalik has more ETH");
} 
else {
    console.log("Eda has more ETH");
}

console.log("eda and vitalik combined is: ", ethers.formatEther(vitalikBalance+edaBalance) )