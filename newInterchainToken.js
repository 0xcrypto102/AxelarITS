const hre = require("hardhat");
const crypto = require("crypto");
const ethers = hre.ethers;
const {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");

const interchainTokenServiceContractABI = require("./utils/interchainTokenServiceABI");
const interchainTokenFactoryContractABI = require("./utils/interchainTokenFactoryABI");
const interchainTokenContractABI = require("./utils/interchainTokenABI");

const interchainTokenServiceContractAddress =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";
const interchainTokenFactoryContractAddress =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";
const api = new AxelarQueryAPI({
  environment: Environment.TESTNET,
});

async function getSigner() {
  const [signer] = await ethers.getSigners();
  return signer;
}   

async function getContractInstance(contractAddress, contractABI, signer) {
    return new ethers.Contract(contractAddress, contractABI, signer);
}

// Register and deploy a new interchain token to the BSC testnet
async function registerAndDeploy() {
    // Generate random salt
    const salt = "0x" + crypto.randomBytes(32).toString("hex");
  
    // Create a new token
    const name = "New Interchain Token";
    const symbol = "NIT";
    const decimals = 18;
  
    // Initial token supply
    const initialSupply = ethers.utils.parseEther("1000");
  
    // Get a signer to sign the transaction
    const signer = await getSigner();
  
    // Create contract instances
    const interchainTokenFactoryContract = await getContractInstance(
      interchainTokenFactoryContractAddress,
      interchainTokenFactoryContractABI,
      signer,
    );
    const interchainTokenServiceContract = await getContractInstance(
      interchainTokenServiceContractAddress,
      interchainTokenServiceContractABI,
      signer,
    );
  
    // Generate a unique token ID using the signer's address and salt
    const tokenId = await interchainTokenFactoryContract.interchainTokenId(
      signer.address,
      salt,
    );
  
    // Retrieve new token address
    const tokenAddress =
      await interchainTokenServiceContract.interchainTokenAddress(tokenId);
  
    // Retrieve token manager address
    const expectedTokenManagerAddress =
      await interchainTokenServiceContract.tokenManagerAddress(tokenId);
  
    // Deploy new Interchain Token
    const deployTxData =
      await interchainTokenFactoryContract.deployInterchainToken(
        salt,
        name,
        symbol,
        decimals,
        initialSupply,
        signer.address,
      );
  
    console.log(
        `
            Deployed Token ID: ${tokenId},
            Token Address: ${tokenAddress},
            Transaction Hash: ${deployTxData.hash},
            salt: ${salt},
            Expected Token Manager Address: ${expectedTokenManagerAddress},
        `,
    );
}

// Estimate gas costs
async function gasEstimator() {
  const gas = await api.estimateGasFee(
    EvmChain.BINANCE,
    EvmChain.MOONBEAM,
    GasToken.ETH,
    10000000,
    1.1
  );
  return gas;
}

// Deploy to remote chain: Avalanche Fuji
async function deployToRemoteChain() {
  // Get a signer for authorizing transactions
  const signer = await getSigner();
  // Get contract for remote deployment
  const interchainTokenFactoryContract = await getContractInstance(
    interchainTokenFactoryContractAddress,
    interchainTokenFactoryContractABI,
    signer,
  );

  // Estimate gas fees
  const gasAmount = await gasEstimator();
  console.log(`Estimated Gas Amount: ${gasAmount}`);

  // Salt value from registerAndDeploy(). Replace with your own
  const salt =
    "0x076bf543d47a1c734acfc0876fd0e87c7bc75e1b6f2cd00474d767d28ebd8588";

  // Initiate transaction
  const txn = await interchainTokenFactoryContract[
    "deployRemoteInterchainToken(bytes32,string,uint256)"
  ](salt, "Moonbeam", gasAmount, { value: gasAmount });

  console.log(`Transaction Hash: ${txn.hash}`);
}

async function transferTokens() {
  // Get a signer for authorizing transactions
  const signer = await getSigner();

  const interchainToken = await getContractInstance(
    "0x80288bcC567de55fc13a2dAA2650E8b59eE48904", // Update with new token address
    interchainTokenContractABI,
    signer,
  );

  // Calculate the amount
  const gasAmount = await gasEstimator();

  // Initiate transfer via token
  const transfer = await interchainToken.interchainTransfer(
    "Moonbeam",
    "0x2f3f295370de918Dab1B17E46d572443A0310e81", // Update with your own wallet address
    ethers.utils.parseEther("25"), // Transfer 25 tokens
    "0x", // Update with your own payload
    { value: gasAmount }, // Transaction options
  );
  console.log("Trnsaction Hash: ", transfer.hash);
}

async function main() {
    const functionName = process.env.FUNCTION_NAME;
    switch (functionName) {
        case "registerAndDeploy":
            await registerAndDeploy();
            break;
        case "deployToRemoteChain":
            await deployToRemoteChain();
            break;
        case "transferTokens":
            await transferTokens();
            break;
        default:
            console.error(`Unknown function: ${functionName}`);
            process.exitCode = 1;
            return;
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});