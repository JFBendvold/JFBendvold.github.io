import Web3 from "web3";
import { getUserId } from "../services/UserService.js";
import ABI from "./ABI.json";

const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/IA22Anj6b1Wd0KS5Lji_wZf4MwP3IQPP";
const CONTRACT_ADDRESS = "0x221772ff3DB4396820f9D9700F5aAE35DD3FA80f";

// Get Tokens from the blockchain using the userId
export async function getTokens() {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_RPC_URL));

        let contract = new web3.eth.Contract(
            ABI,
            CONTRACT_ADDRESS
        );


        // Get userId from database
        const userId = await getUserId();
        console.log("UserId:", userId);
        console.log(userId.data);


        // Get tokens from blockchain
        const tokensRaw = await contract.methods.getTokens(userId.data).call();

        // Convert tokens from bigint to int
        console.log("TokensRaw:", tokensRaw);
        const tokens = Number(tokensRaw);
        console.log("Tokens:", tokens);

        return tokens;
    } catch (error) {
        console.log(error);
        return -1;
    }
}

export async function getTransactions() {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_RPC_URL));

        let contract = new web3.eth.Contract(
            ABI,
            CONTRACT_ADDRESS
        );

        // Get userId from database
        const userId = await getUserId();

        // Get tokens from blockchain
        const transactions = await contract.methods.getTransactions(userId.data).call();

        return transactions;
    } catch (error) {
        console.log(error);
        return -1; //TODO: assess this implementation
    }
}

export async function getAverageQuestionOfUser() {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_RPC_URL));

        let contract = new web3.eth.Contract(
            ABI,
            CONTRACT_ADDRESS
        );

        // Get userId from database
        const userId = await getUserId();

        // Get tokens from blockchain
        const averageQuestion = await contract.methods.getAverageQuestionOfUser(userId.data).call();

        return averageQuestion;
    } catch (error) {
        console.log(error);
        return -1; //TODO: assess this implementation
    }
}