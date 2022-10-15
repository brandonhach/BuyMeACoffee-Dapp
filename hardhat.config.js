// require hardhat-ethers & dotenv.config for secret
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/**
 * The reason why coding within this config setting is to keep your addresses hidden from the actual files.
	Keep it separate from other developers and won't know what our api key is.
 */
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	//add your network here
	networks: {
		goerli: {
			url: GOERLI_URL,
			accounts: [PRIVATE_KEY],
		},
	},
};
