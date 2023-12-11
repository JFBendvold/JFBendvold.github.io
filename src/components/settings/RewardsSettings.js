import { useState, useEffect, useLayoutEffect } from "react";
import styles from "../../style/settings/settingsContent.module.css";
import { Tooltip } from 'react-tooltip';
import LoadingScreen from '@/components/LoadingScreen';
import { openNotificationError, openNotificationSuccess, openNotificationInfo } from '@/utils/Notifications.js';
import { getReferralCode, generateReferralCode } from "@/services/RewardService.js";
import { addAffiliation } from "@/services/AffiliationService.js";

export default function RewardsSettings(user) {
    const [referralCode, setReferralCode] = useState("...");
    const [referralCodeInput, setReferralCodeInput] = useState("");

    useEffect(() => {
        // Get referral code
        getReferralCode().then((response) => {
            if (response.status == 200) {
                setReferralCode(response.data);
            }
            else if (response.status == 404) {
                setReferralCode(null);
            }
            else {
                setReferralCode(null);
                openNotificationError("Error", "Failed to get referral code.");
            }
        });
    }, []);

    const isMetamaskUser = () => {
        return user.user?.metamask;
    }

    const referralCodeClick = () => {
        // If user got a referral code, copy it to clipboard
        if (referralCode) {
            const textarea = document.createElement('textarea');
            textarea.value = referralCode;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            openNotificationSuccess("Referral code copied to clipboard.");
        }

        // If user doesn't have a referral code, get one
        else {
            generateReferralCode().then((response) => {
                console.log(response);
                if (response.status == 200) {
                    setReferralCode(response.data.code);
                    openNotificationSuccess("Success", "Referral code generated.");
                }
                else {
                    openNotificationError("Error", "Failed to generate referral code.");
                }
            });
        }
    }

    // Add affiliation
    const addAffiliationClick = () => {
        // Check if referral code is valid
        if (referralCodeInput.length != 6) {
            openNotificationError("Error", "Referral code is invalid.");
            return;
        }

        // Add affiliation
        addAffiliation(referralCodeInput).then((response) => {
            if (response.status == 200) {
                openNotificationSuccess("Success", "Affiliation added.");
            }
            else if (response.status == 404) {
                openNotificationError("Error", "Referral code is invalid.");
            }
            else if (response.status == 406) {
                openNotificationError("Error", "You can't add your own referral code.");
            }
            else if (response.status == 409) {
                openNotificationInfo("You already have this affiliation.");
            }
            else {
                openNotificationError("Error", "Failed to add affiliation.");
            }
        });
    }

    return (
        <div className={styles.container}>
            { (!isMetamaskUser()) &&
            <>
            <div className={styles.profile}>
                    <h2>
                        Affiliate Program
                    </h2>
                </div>
                <div className={styles.box}>
                    <div className={styles.rewardBox}>
                        <h2 data-tooltip-content="Share your referral code with your friends and earn 2% of their earnings." data-tooltip-id="tooltip">
                            Referral Code
                        </h2>
                        <div className={styles.rewardBoxContent} onClick={referralCodeClick}>
                            <p>{referralCode ? referralCode : "Get Referral Code"}</p>
                        </div>
                    </div>
                    <div className={styles.rewardBox}>
                        <h2 data-tooltip-content="Enter your friend's referral code" data-tooltip-id="tooltip">
                            Enter Referral Code
                        </h2>
                        <input type="text" placeholder="Enter Referral Code" value={referralCodeInput} onChange={(e) => setReferralCodeInput(e.target.value)} />
                        <button onClick={addAffiliationClick}>
                            Submit
                        </button>
                    </div>
                </div>
                <LoadingScreen />
            </>
            }
            { isMetamaskUser() &&
                <div className={styles.box}>
                    <h2>Metamask User</h2>
                    <p>You are logged in with Metamask.</p>
                </div>
            }
            <Tooltip id="tooltip" />
        </div>
    )
}