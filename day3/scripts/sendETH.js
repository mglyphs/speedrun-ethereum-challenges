const hre = require("hardhat");
const { ethers } = require("ethers");


async function main() {
    const hardhatSigner = (await hre.ethers.getSigners())[0]
    
    console.log(hardhatSigner.address);
    
    const myBalance = await hardhatSigner.provider.getBalance(hardhatSigner.address);
    
    console.log("My balance", ethers.formatEther(myBalance));
    
    const toAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    
    console.log("Sending ETH to", toAddress);
    
    const tx = await hardhatSigner.sendTransaction({
        to: toAddress,
        value: myBalance/10n
    });
    
    console.log("TX SENT!", tx);
    
    await tx.wait();
    
    console.log("TX MINED");
}

main()
.then(() => process.exit())
.catch((error) => {
    console.log(error);
    process.exit();
});