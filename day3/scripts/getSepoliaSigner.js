const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
    const signer = (await hre.ethers.getSigners())[0];

    console.log(signer);

    const myBalance = await signer.provider.getBalance(signer.address);

    console.log("My balance", ethers.formatEther(myBalance));
}

main()
.then(() => process.exit())
.catch((error) => {
    console.log(error);
    process.exit();
});