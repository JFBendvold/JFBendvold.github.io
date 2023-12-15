import { useEffect, useState } from "react";
import styles from "../../style/settings/settingsContent.module.css";
import Web3 from "web3";
import Link from "next/link.js";
import ABI from "../../utils/ABI.json";
import { Tooltip } from 'react-tooltip';
import { getUserId } from "../../services/UserService.js";
import LoadingScreen from '@/components/LoadingScreen';
import { showLoadingScreen, hideLoadingScreen } from '@/utils/LoadingProvider'
import { openNotificationError, openNotificationSuccess, openNotificationInfo } from '@/utils/Notifications.js';
import { getTransactions } from "@/utils/Web3Connection";

export default function WalletSettings(user) {
    const [tokens, setTokens] = useState(50);
    const [address, setAddress] = useState("");
    const [web3Instance, setWeb3Instance] = useState(null);
    const [connected, setConnected] = useState(false);
    const [depositOpen, setDepositOpen] = useState(false);
    const [withdrawOpen, setWithdrawOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [error, setError] = useState("");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if(user && user.user) {
            setTokens(user.user.tokens);
        }
    }, [user]);

    useEffect(() => {
        fetchTransactions();

        try {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                // User disconnected their wallet
                setConnected(false);
                setAddress("");
                } else {
                // User connected their wallet
                setConnected(true);
                setAddress(accounts[0]);
                }
            });
        } catch (error) {
            console.error(error);
        }

        connectWallet();
    }, []);

    async function fetchTransactions() {
        try {
            const fetchedTransactions = await getTransactions();
            console.log(fetchedTransactions);
            setTransactions(fetchedTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        // Set web3 instance
        if (window && window.ethereum) {
            setWeb3Instance(new Web3(window.ethereum));

            // Get address
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log("Address found: " + accounts[0]); // TODO: Remove this line
                setAddress(accounts[0]);
                setConnected(true);
            } catch (error) {
                console.error("No address found");
                setConnected(false);
            }
        }
    };

    function openDeposit() {
        if (transactions.length === 0) {
            openNotificationInfo('Deposit disabled', 'You need to wait for your first transaction to be confirmed before you can deposit tokens.');
            return;
        }

        setDepositOpen(true);
        setError("");
    }

    function closeDeposit() {
        setDepositOpen(false);
        setError("");
    }

    function openWithdraw() {
        if (transactions.length === 0) {
            openNotificationInfo('Withdraw disabled', 'You need to wait for your first transaction to be confirmed before you can withdraw tokens.');
            return;
        }
        setWithdrawOpen(true);
        setError("");
    }

    function closeWithdraw() {
        setWithdrawOpen(false);
        setError("");
    }

    async function deposit() {
        console.log("Depositing " + depositAmount + " tokens");

        // Check if deposit amount is a number
        if (isNaN(depositAmount)) {
            setError("Please enter a valid number");
            return;
        }

        // Check if deposit amount is greater than 100
        if (depositAmount < 100) {
            setError("Minimum deposit is 100 tokens");
            return;
        }

        // Create contract instance
        const contract = new web3Instance.eth.Contract(ABI, "0x4c464b13E66071f852a115C5A0611f2585E21f88"); // Assuming contractAddress is defined

        // Deposit tokens
        showLoadingScreen();
        const ethAmount = depositAmount * 0.0001;

        let userId = await getUserId();
        userId = userId.data;

        const txObject = {
            from: address,
            to: "0x4c464b13E66071f852a115C5A0611f2585E21f88",
            value: web3Instance.utils.toWei(ethAmount.toString(), "ether"),
            data: contract.methods.deposit(userId).encodeABI(),
            gas: 3000000,
        }

        const transaction = web3Instance.eth.sendTransaction(txObject);

        transaction.once('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);
            hideLoadingScreen();
            openNotificationSuccess('Deposit successful', 'Your tokens will be added to your wallet shortly.');
            closeDeposit();
        });

        transaction.once('receipt', (receipt) => {
            console.log('Receipt:', receipt);
            openNotificationSuccess('Deposit successful', 'Your tokens have been added to your wallet.');
            if (receipt.status) {
                let newTokens = parseInt(depositAmount) + parseInt(user.user.tokens);
                setTokens(newTokens);
            }
            setError("");
        });

        transaction.catch((error) => {
            console.log('Error:', error);
            hideLoadingScreen();
            if (error.code === 4001) { // User rejected the transaction
                setError("Transaction was rejected by the user");
                openNotificationError('Deposit failed', 'Transaction was rejected by the user');
            } else {
                setError("Transaction failed");
                openNotificationError('Deposit failed', 'Transaction failed');
            }
        });
    }

    async function withdraw() {
        console.log("Withdrawing " + withdrawAmount + " tokens");

        // Check if withdraw amount is a number
        if (isNaN(withdrawAmount)) {
            setError("Please enter a valid number");
            return;
        }

        // Check if withdraw amount is greater than 100
        if (withdrawAmount < 100) {
            setError("Minimum withdrawal is 100 tokens");
            return;
        }

        // Check if withdraw amount is greater than tokens
        if (withdrawAmount > tokens) {
            setError("You don't have enough tokens");
            openNotificationError('Withdraw failed', 'You don\'t have enough tokens');
            return;
        }

        // Withdraw tokens
        showLoadingScreen();
        const ethAmount = withdrawAmount * 0.0001;

        let userId = await getUserId();
        userId = userId.data;

        const contract = new web3Instance.eth.Contract(ABI, "0x4c464b13E66071f852a115C5A0611f2585E21f88"); // Assuming contractAddress is defined
        const txObject = {
            from: address,
            to: "0x4c464b13E66071f852a115C5A0611f2585E21f88",
            data: contract.methods.withdraw(userId, web3Instance.utils.toWei(ethAmount.toString(), "ether")).encodeABI(),
            gas: 3000000,
            value: 0,
        }

        const transaction = web3Instance.eth.sendTransaction(txObject);

        transaction.once('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);
            hideLoadingScreen();
            openNotificationSuccess('Withdraw successful', 'Your tokens will be removed from your wallet shortly.');
            closeWithdraw();
        });

        transaction.once('receipt', (receipt) => {
            console.log('Receipt:', receipt);
            setTokens(tokens - withdrawAmount);
            setError("");
        });

        transaction.catch((error) => {
            console.log('Error:', error);
            hideLoadingScreen();
            if (error.code === 4001) { // User rejected the transaction
                setError("Transaction was rejected by the user");
                openNotificationError('Withdraw failed', 'Transaction was rejected by the user');
            } else {
                setError("Transaction failed");
                openNotificationError('Withdraw failed', 'Transaction failed');
            }
        });
    }

    function convertUNIX(unix) {
        let date = new Date(unix * 1000);

        return date.toLocaleString();
    }

    // Convert tokens to ETH, max 2 decimals
    function convertTokensToETH(tokens) {
        return Number(tokens * 0.0001).toFixed(2);
    }

    return (
        <div className={styles.container} style={{paddingTop: "20px"}}>
            <div className={styles.tokensHeader}>
                <h2 className={styles.tokens} data-tooltip-content="1 Token = 0.0001 ETH" data-tooltip-id="tokens">
                    {tokens} Tokens  ({convertTokensToETH(tokens)} ETH)

                </h2>
                <div className={styles.buttons}>
                    {!connected && <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>}
                    {connected && <button className={styles.button} onClick={openDeposit}>Deposit</button>}
                    {connected && <button className={styles.button} onClick={openWithdraw}>Withdraw</button>}
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.transactions}>
                    <h2>Transactions:</h2>
                    <div className={styles.table}>
                        <div className={styles.tableRow}>
                            <div className={styles.tableHeader}>
                                <p>Transaction</p>
                            </div>
                            <div className={styles.tableHeader}>
                                <p>Amount</p>
                            </div>
                            <div className={styles.tableHeader}>
                                <p>Date</p>
                            </div>
                        </div>
                        {transactions?.map((transaction, index) => {
                            let type = transaction[0];
                            let amount = Number(transaction[1]) * 0.00000000000001;
                            let date = convertUNIX(Number(transaction[2]));

                            if (type === "addBalance") {
                                type = "Bonus";
                            } else if (type === "deposit") {
                                type = "Deposit";
                            } else if (type === "withdraw") {
                                type = "Withdraw";
                                amount = amount * -1;
                            } else if (type === "game") {
                                type = "Game Buy-in";
                                amount = amount * -1;
                            }

                            return (
                                <div className={styles.tableRow} key={index}>
                                    <div className={styles.tableData}>
                                        <p>{type}</p>
                                    </div>
                                    <div className={styles.tableData}>
                                        <p>{amount} Tokens</p>
                                    </div>
                                    <div className={styles.tableData}>
                                        <p>{date}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <Link href="https://sepolia.etherscan.io/address/0x4c464b13E66071f852a115C5A0611f2585E21f88" passHref target="_blank">
                    <p className={styles.link}>View on Etherscan</p>
                </Link>
            </div>
            <div className={styles.popup} style={{top: depositOpen ? "0" : "100%"}}>
                <span className="material-symbols-outlined" onClick={closeDeposit}>
                    close
                </span>
                <h2>Deposit</h2>
                <h3>1 Token = 0.0001 ETH</h3> {/*TODO: ADD amount of real ethereum the user has to the display*/}
                <p>How many tokens would you like to deposit?</p>
                <input type="text" placeholder="Tokens" className={styles.input} value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                <p className={styles.eth}>You will deposit {depositAmount * 0.0001} ETH</p>
                <button className={styles.button} onClick={deposit}>Deposit</button>
                <p className={styles.error}>{error}</p>
                <p className={styles.footer}>© 2023 TokenTrivia</p>
            </div>
            <div className={styles.popup} style={{top: withdrawOpen ? "0" : "100%"}}>
                <span className="material-symbols-outlined" onClick={closeWithdraw}>
                    close
                </span>
                <h2>Withdraw</h2>
                <h3>1 Token = 0.0001 ETH</h3>
                <p>How many tokens would you like to withdraw?</p>
                <input type="text" placeholder="Tokens" className={styles.input} value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} 
                data-tooltip-content="Minimum withdrawal is 100 tokens" data-tooltip-id="withdraw"
                />
                <p className={styles.eth}>You will withdraw {withdrawAmount * 0.0001} ETH</p>
                <button className={styles.button} onClick={withdraw}>Withdraw</button>
                <p className={styles.error}>{error}</p>
                <p className={styles.footer}>© 2023 TokenTrivia</p>
                <Tooltip id="withdraw" />
            </div>
            <Tooltip id="tokens" />
            <LoadingScreen />
        </div>
    )
}