import { useEffect, useRef, useState } from "react";
import styles from "../style/wallet.module.css";
import Header from "@/components/header/Header";
import Web3 from "web3";

export default function Wallet() {
    const mainRef = useRef(null);
    const [tokens, setTokens] = useState(50);
    const [address, setAddress] = useState("");
    const [web3Instance, setWeb3Instance] = useState(null);
    const [connected, setConnected] = useState(false);
    
    useEffect(() => {
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

        // Change opacity of main element
        mainRef.current.style.opacity = 1;
            
        // Set background color
        mainRef.current.style.backgroundColor = "#FF70A6";

        connectWallet();
    }, []);

    const connectWallet = async () => { //TODO: MOVE THIS AND METAMASK.jS TO UTIL 
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
    
    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>{tokens} tokens</h1>
                <h2 className={styles.subtitle}>{tokens/2} transferable tokens</h2>
                {!connected &&
                <div className={styles.buttons}>
                    <button className={styles.longButton} onClick={connectWallet}>Connect Wallet</button>
                </div>
                }
                {connected &&
                <div className={styles.buttons}>
                    {!connected && <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>}
                    <button className={connected ? styles.button : styles.buttonDisabled} disabled={!connected}>Deposit</button>
                    <button className={connected ? styles.button : styles.buttonDisabled} disabled={!connected}>Withdraw</button>
                </div>
                }
            </div>
        </main>
    );
}