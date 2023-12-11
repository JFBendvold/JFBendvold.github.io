import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "../../style/settings/settingsContent.module.css";
import Image from "next/image";
import { Tooltip } from 'react-tooltip';
import { updatePassword } from "@/services/UserService";
import { generateTwoFactor, checkTwoFactor, disableTwoFactor, verifyTwoFactor } from "@/services/TwoFactorService";
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications.js';
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function SecuritySettings(user) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [activated2FA, setActivated2FA] = useState(true);
    const [error, setError] = useState('Passwords do not match') //Error message
    const [qrCode, setQrCode] = useState('') //QR code for 2FA
    const [enablingOpen, setEnablingOpen] = useState(false) //2FA enabling popup
    const [openPopConfirm, setOpenPopConfirm] = useState(false) //2FA enabling popup
    const [confirmLoading, setConfirmLoading] = useState(false) //2FA enabling popup
    const [twoFactorCode, setTwoFactorCode] = useState(""); //2FA code
    const [isChecking2FA, setIsChecking2FA] = useState(true);

    const isMetamaskUser = () => {
        return user.user?.metamask;
    }

    useLayoutEffect(() => {
        checkTwoFactor().then((response) => {
            if(response.status !== 200 && response.status !== 423) {
                console.log("Error checking 2FA");
                openNotificationError("Error checking 2FA", "Please try again later");
                return;
            }

            console.log(response.data);

            if(response.data)
            {
                setActivated2FA(true);
            } else {
                setActivated2FA(false);
            }

            setIsChecking2FA(false);
        })
    }, []);

    useEffect(() => {
        console.log(user.user.name);
    }, []);

    async function changePassword() {   
        try {
            if(!validate()) {
                return;
            }
            const response = await updatePassword(oldPassword, newPassword);
            console.log(response);
            if(response.status === 200)
            {
                openNotificationSuccess("Password changed", "Your password has been changed");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                openNotificationError("Error changing password", "Please try again later");
            }
        }
        catch(error) {
            openNotificationError("Error changing password", "Please try again later");
        }
    }

    function validate() {
        if(!oldPassword || !newPassword || !confirmPassword) {
            openNotificationError("Invalid password", "Please fill in all fields");
            return false
        }
        if (newPassword !== confirmPassword) {
            openNotificationError("Invalid password", "Passwords do not match");
            return false
        }
        else if (newPassword.length < 8) {
            openNotificationError("Invalid password", "Password must be at least 8 characters long");
            return false
        } else if (newPassword.search(/[a-z]/i) < 0 || newPassword.search(/[0-9]/) < 0) {
            openNotificationError("Invalid password", "Password must contain at least one letter and one number");
            return false
        } else {
            return true
        }
    }

    function generate2FA() {
        setEnablingOpen(true);
        generateTwoFactor().then((response) => {
            let qrCodeData = response.data.qrCodeData;

            if(qrCodeData === null) {
                console.log("Error generating 2FA");
                openNotificationError("Error generating 2FA", "Please try again later");
                setEnablingOpen(false);
                return;
            }

            setQrCode(qrCodeData);
        })
    }

    function closeEnablingPopup() {
        setEnablingOpen(false);
    }

    function openConfirm() {
        setOpenPopConfirm(true);
    }

    function disable2FA() {
        setConfirmLoading(true);

        disableTwoFactor().then((response) => {
            if(response.status !== 200) {
                console.log("Error disabling 2FA");
                openNotificationError("Error disabling 2FA", "Please try again later");
                setOpenPopConfirm(false);
                setConfirmLoading(false);
                return;
            } else {
                setActivated2FA(false);
                setOpenPopConfirm(false);
                setConfirmLoading(false);
                openNotificationSuccess("2FA disabled", "You can now login without 2FA");
            }
        })
    }

    function validate2FA() {
        verifyTwoFactor(user.user.name, twoFactorCode).then((response) => {
            if(response.status !== 200) {
                console.log("Error verifying 2FA");
                openNotificationError("Error verifying 2FA", "Please try again later");
                return;
            } else {
                console.log(response.data);
                if(!response.data) {
                    console.log("Invalid 2FA code");
                    openNotificationError("Invalid 2FA code", "Please try again");
                    return;
                }

                setActivated2FA(true);
                setEnablingOpen(false);
                openNotificationSuccess("2FA enabled", "You can now login with 2FA");
            }
        })
    }

    return (
        <div className={styles.container}>
            {!isChecking2FA && !isMetamaskUser() && (
            <div className={styles.profile}>
                {activated2FA ? (
                    <div className={styles.row}>
                        <p>2FA is activated</p>
                        <Popconfirm
                            title="Are you sure you want to disable 2FA?"
                            description="This action is not recommended"
                            onConfirm={() => disable2FA()}
                            open={openPopConfirm}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ loading: confirmLoading, style: { backgroundColor: '#FF70A6', color: '#FFFFFF' } }}
                            onCancel={() => setOpenPopConfirm(false)}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <button className={styles.editProfile} onClick={() => openConfirm()}>
                                Disable 2FA
                            </button>
                        </Popconfirm>
                    </div>
                ) : (
                    <div className={styles.row}>
                        <p>2FA is not activated</p>
                        <button className={styles.editProfile} onClick={() => generate2FA()} data-tooltip-content="2FA is a security feature that requires you to enter a code from your phone when logging in." data-tooltip-id="2fa">
                            Enable 2FA (Recommended)
                        </button>
                    </div>
                )}
                <div className={styles.popup} style={{top: enablingOpen ? "0" : "100%"}}>
                    <span className="material-symbols-outlined" onClick={closeEnablingPopup}>
                        close
                    </span>
                    <h2>
                        Enable 2FA
                    </h2>
                    <h3>
                        Scan the QR code below with your authenticator app
                    </h3>
                    {qrCode && (
                    <Image src={qrCode} width={200} height={200} alt="QR code" />
                    )}
                    <input type="text" placeholder="Enter 2FA code" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)}
                    className={styles.input} />
                    <button className={styles.button} onClick={() => validate2FA()}>
                        Enable 2FA
                    </button>
                    <p className={styles.footer}>© 2023 TokenTrivia</p>
                </div>
            </div>
            )}
            {isChecking2FA && (
                <div className={styles.profile}>
                    <p>Loading...</p>
                </div>
            )}
            {!isMetamaskUser() &&
                <div className={styles.box}>
                    <h2>Change Password</h2>
                    <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={styles.passwordInput} />
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={styles.passwordInput} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.passwordInput} />
                    <button onClick={() => changePassword(true)} className={styles.passwordButton} data-tooltip-content="Change your password" data-tooltip-id="changePassword">
                        Change Password
                    </button>
                </div>
            } 
            { isMetamaskUser() &&
                <div className={styles.box}>
                    <h2>Metamask User</h2>
                    <p>You are logged in with Metamask.</p>
                </div>
            }     
            <Tooltip id="2fa" />
            <Tooltip id="changePassword" />
        </div>
    )
}