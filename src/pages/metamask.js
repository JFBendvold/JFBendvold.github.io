import styles from '../style/metamask.module.css'
import Image from 'next/image'
import Cookie from '@/components/Cookie'
import ArrowLink from '@/components/ArrowLink'
import { useState, useEffect, useRef } from 'react'
import { openNotificationError } from '@/utils/Notifications.js';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import Web3 from "web3";
import { metamaskOneTimeLogin } from '@/services/MetaMaskService'
import { useRouter } from 'next/router'
import names from '@/utils/names.json'

export default function Metamask() {
    const mainRef = useRef(null)
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState("");
    const [web3Instance, setWeb3Instance] = useState(null);
    const [askedForSignature, setAskedForSignature] = useState(false);
    let signatureCounter = 0;
    const router = useRouter();

    async function getFingerprint() {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    }

    async function signMessageMetaMask() {
        if (web3Instance && address) {
            try {
                if (askedForSignature) {
                    console.log("Already asked for signature");
                    return;
                }
                setAskedForSignature(true);

                signatureCounter++;
                if (signatureCounter > 1) {
                    console.log("Aborted action since no signature was provided. Please reconnect with MetaMask");
                    return;
                }
                console.log("Counter: ", signatureCounter);

                const username = getRandomName();
                const fingerPrint = await getFingerprint();
                const timestamp = Date.now();
                const message = `'Please sign this as a unique message: ${fingerPrint}${timestamp}'`;
                const signature = await web3Instance.eth.personal.sign(message, address, '');
                const tempUser = await metamaskOneTimeLogin(signature, fingerPrint, timestamp, username);

                //Parse as json in localstorage
                delete tempUser.data._id;
                const user = JSON.stringify(tempUser.data); 
                localStorage.setItem('user', user);

                router.push('/dashboard');
            } catch (error) {
                openNotificationError('Aborted action', 'Aborted action since no signature was provided. Please reconnect with MetaMask');
                setStep(2);
            }
        }
        else {
            openNotificationError("No web3 instance or address found");
            setStep(2);
        }
    };

    function getRandomName() {
        const firstnames = names.first_names;
        const lastnames = names.last_names;

        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];

        //Generate a random 4 digit number
        const randomNumber = Math.floor(1000 + Math.random() * 9000);

        return `${randomFirstName} ${randomLastName} @${randomNumber}`;
    }

    const connectWallet = async () => {
        // Set web3 instance
        if (window && window.ethereum) {
            setWeb3Instance(new Web3(window.ethereum));
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            console.log("Address: ", accounts[0]);
            setAddress(accounts[0]);
        }
    };

    useEffect(() => {
        if (!address) {
            //Get address and sign message
            try {
                connectWallet();
            }
            catch (error) {
                setStep(1);
                console.log("Could not connect to metamask: ", error);
                openNotificationError('Could not sign the connected wallet message due to: ', error);
            }
        }
        mainRef.current.style.opacity = 1;
    }, [])

    useEffect(() => {
        if (address && web3Instance && !askedForSignature) {
            //Wait 5 seconds before signing
            setTimeout(() => {
                console.log("Going to sign message");
                signMessageMetaMask();
            }, 2000);
        }
    }, [address])

    return (
        <main className={styles.main} ref={mainRef}>
            <div className={styles.loader}>
                <div className={styles.loaderCircle} style={{ display: step == 1 ? "flex" : "none" }}>
                </div>
                <Image src="/img/MetaMask_fox.svg" width={128} height={128} alt='MetaMask Fox Loading Icon'/>
            </div>
            <ArrowLink href="/" />
            <Cookie />
        </main>
    )
}