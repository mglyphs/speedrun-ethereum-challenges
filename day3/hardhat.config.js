require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  // This will run scripts AND tests on localhost
  // To have test run an ephemeral chain (in the background) get rid of this
  // defaultNetwork: "localhost",
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${vars.get("INFURA_KEY")}`,
      accounts: [vars.get("GLYPHSDEV_KEY")],
    },
  },
};
