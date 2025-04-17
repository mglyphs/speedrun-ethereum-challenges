const hre = require("hardhat");
const { ethers } = require("ethers");

// Interact with the deployed contract
async function main() {
    const contractAddress = "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6";
    const greeter = await hre.ethers.getContractAt("Greeter", contractAddress);

    console.log("Initial greeting", await greeter.greet());

    console.log("Setting greeting...");
    const setTx = await greeter.setGreeting("Is this working?");
    await setTx.wait();

    console.log("setTx mined!");
    console.log("New greeting", await greeter.greet());
}

main()
.then(() => process.exit())
.catch((error) => {
    console.log(error);
    process.exit();
});