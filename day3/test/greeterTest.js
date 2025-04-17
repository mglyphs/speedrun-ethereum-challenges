const {expect} = require("chai");
const {ethers} = require("hardhat");

let greeter;

// before just does before the next test below this code
// beforeEach runs before all tests
beforeEach(async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy("Hello, world!");
    await greeter.waitForDeployment();

});

describe("Greeter", function () {
    it("Should revert if the contract is locked", async function() {
        await expect(greeter.setGreeting("Hello pt2!")).to.be.reverted;
    })
});

describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function() {
        expect(await greeter.greet()).to.equal("Hello, world!");

        const unlockTx = await greeter.toggleUnlocked();
        await unlockTx.wait();

        const setGreetingTx = await greeter.setGreeting("Hello pt2!");
        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hello pt2!");
    })
});
