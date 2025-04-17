import "dotenv/config";
import {ethers} from "ethers";


const getProvider = (mainnet = false) => {
    const providerUrl = mainnet
    ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
    : `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;

    return new ethers.JsonRpcProvider(providerUrl);
};

const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    console.log("address: ", wallet.address);
    console.log("private key: ", wallet.privateKey);
    console.log("Mnemonic: ", wallet.mnemonic.phrase);
};

const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);

    return new ethers.Wallet(process.env.GLYPHSDEV_KEY, provider);
};

//es 6 module syntax

export {getProvider, generateNewWallet, getSigner};

