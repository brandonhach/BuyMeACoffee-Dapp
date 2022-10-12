const hre = require("hardhat");

// Returns the Ether balance of a given address
async function getBalance(address) {
	const balanceBigInt = await hre.waffle.provider.getBalance(address);
	return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
	let idx = 0;
	for (const address of addresses) {
		console.log(`Address ${idx} balance: `, await getBalance(address));
		idx++;
	}
}

// Logs the memo stored on-chain from coffee purchases.
async function printMemos(memos) {
	for (const memo of memos) {
		const timestamp = memo.timestamp;
		const tipper = memo.name;
		const tipperAddress = memo.from;
		const message = memo.message;
		console.log(
			`At ${timestamp}, ${tipper}, ${tipperAddress} said: "${message}"`
		);
	}
}

async function main() {
	// Get example accounts.
	const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
	// Get the contract to deploy.
	const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
	const buyMeACoffee = await BuyMeACoffee.deploy();
	await buyMeACoffee.deployed();
	console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);
	// Deploy contracts.
	const addresses = [owner.address, tipper.address, buyMeACoffee.address];
	console.log("== start ==");
	await printBalances(addresses);

	// Check balances before the coffee purchase.

	// Buy the owner a few coffees.

	// Check balances after coffee purchase.

	// Withdraw funds.

	// Check balance after withdraw.

	// read all the memos left for the owner
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
