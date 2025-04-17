const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Counter", function () {
    it("Should increase by one when incremented", async function() {
        [signer0] = await ethers.getSigners();
        // I guess because the test chooses the first address by default?
        console.log ("Deploying as", signer0.address);

        const Counter = await ethers.getContractFactory("Counter");
        const counter = await Counter.deploy(10);
        await counter.waitForDeployment();

        expect(await counter.count()).to.equal(10);

        const incTx = await counter.inc();
        await incTx.wait();

        expect(await counter.count()).to.equal(11);
        expect(await counter.bro()).to.equal(signer0.address);
    });

    it("Should increase by one when incremented", async function() {
        [signer0, signer1] = await ethers.getSigners();
        // I guess because the test chooses the first address by default?
        console.log ("Deploying as", signer0.address);

        const Counter = await ethers.getContractFactory("Counter");
        const counter = await Counter.deploy(10);
        await counter.waitForDeployment();

        const decTx = await counter.connect(signer1).dec();
        // expect(await counter.count()).to.equal(10);
    })
});
