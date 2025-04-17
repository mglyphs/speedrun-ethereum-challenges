import { ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
const sepoliaSigner = getSigner();

console.log(sepoliaSigner.address);

const myBalance = await sepoliaSigner.provider.getBalance(sepoliaSigner.address);

console.log("My balance", ethers.formatEther(myBalance));

const mglyphsAddress = await mainnetProvider.resolveName("mglyphs.eth");

console.log("Sending ETH to", mglyphsAddress);

const tx = await sepoliaSigner.sendTransaction({
    to: mglyphsAddress,
    value: myBalance/10n
});

console.log("TX SENT!", tx);

await tx.wait();

console.log("TX MINED");