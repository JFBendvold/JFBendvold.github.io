import { useState, useEffect, useLayoutEffect } from "react";
import styles from "../../style/settings/settingsContent.module.css";
import Link from "next/link";
import LoadingScreen from '@/components/LoadingScreen';
import { getAuthority } from "@/services/AuthorityService";

export default function AdminSettings(user) {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        getAuthority().then((response) => {
            console.log(response.data);
            if (response?.data === "admin") {
                console.log("User is admin");
                setAdmin(true);
            } else {
                console.log("User is not admin");
                setAdmin(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const isMetamaskUser = () => {
        return user.user?.metamask;
    }

    return (
        <div className={styles.container}>
            { (!isMetamaskUser() && admin) &&
            <><div className={styles.profile}>
                    <h2>
                        Welcome back {user.user.name}!<br />With great power comes great responsibility.
                    </h2>
                </div><div className={styles.box}>
                        <h2>Admin Panel</h2>
                        <div className={styles.adminLinks}>
                            <Link href="/admin/feedbacks">
                                <p className={styles.adminLink}>
                                    Feedbacks
                                </p>
                            </Link>
                            <Link href="/admin/users">
                                <p className={styles.adminLink}>
                                    Users
                                </p>
                            </Link>
                            <Link href="/admin/questions">
                                <p className={styles.adminLink}>
                                    Questions
                                </p>
                            </Link>
                            <Link href="/admin/admins">
                                <p className={styles.adminLink}>
                                    Admins
                                </p>
                            </Link>
                        </div>
                    </div><LoadingScreen /></>
            }
            { isMetamaskUser() &&
                <div className={styles.box}>
                    <h2>Metamask User</h2>
                    <p>You are logged in with Metamask.</p>
                </div>
            } 
            { !admin &&
                <div className={styles.box}>
                    <h2>Not an admin</h2>
                    <p>You are not an admin.</p>
                </div>
            }
        </div>
    )
}