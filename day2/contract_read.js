import {ethers} from "ethers";
import {getProvider} from "./utils.js";
import vikingsNFTAbi from "./abi/glyphsNFTAbi.js";

// Viking NFT contract
const vikingsNFTAddress = "0x79c2cF4D921a13176d2491AF669FF2Bb76008614";
const sepoliaProvider = getProvider();

const vikingsContract = new ethers.Contract(vikingsNFTAddress, vikingsNFTAbi, sepoliaProvider);

const price = await vikingsContract.getVikingPrice();

console.log("Viking mint price", ethers.formatEther(price));

//Vikings NFT have a 20 eth mint price, so I can't actually run this...
console.log("Minting NFT");

const mintTx = await sanfordContract.mint({
    value: mintPrice,
});

console.log("Tx sent", mintTx.hash);

await mintTx.wait();




