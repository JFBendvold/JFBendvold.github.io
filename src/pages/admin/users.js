import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/admin/admins.module.css";
import Header from "@/components/header/Header";
import { openNotificationError, openNotificationSuccess, openNotificationInfo } from "@/utils/Notifications";
import { showLoadingScreen, hideLoadingScreen } from "@/utils/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";
import { searchUsers } from "@/services/UserService";
import Image from "next/image";
import { localUrl } from "@/utils/ApiClientSetup";
import { Tooltip } from 'react-tooltip';

export default function Users() {
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);

    const mainRef = useRef(null);

    useLayoutEffect(() => {
        // Get user from local storage
        const initialUser = localStorage.getItem('user') // Get user from local storage

        if (initialUser) { // If user is found in local storage
            setUser(JSON.parse(initialUser));
        } else {
            console.error("No user found in local storage");
        }
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            document.body.style.background = `${user.style}`;
        }
    }, [user]);

    // Search for users
    const search = async () => {
        if (!input) {
            openNotificationError("Error searching for users", "Please enter a username");
            return;
        }

        //Check if input contains at least one letter
        if (!input.match(/[a-z]/i)) {
            openNotificationError("Error searching for users", "Please enter a valid username");
            return;
        }

        showLoadingScreen();
        console.log("Searching for: ", input);
        const response = await searchUsers(input);

        if (response.status === 200) {
            console.log(response.data);
            setUsers(response.data);
        } else {
            openNotificationError("Error searching for users", response.data);
        }

        hideLoadingScreen();
    }

    // Format timestamp to date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Search for users
                </h1>
                <div className={styles.searchContainer}>
                    <input className={styles.searchInput} placeholder="Search for users" onChange={(e) => setInput(e.target.value)} />
                    <button className={styles.searchButton} onClick={search}>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </div>
                <div className={styles.usersContainer}>
                    {users.map((user, index) => {
                        return (
                            <div className={styles.userContainer} key={index}>
                                <div className={styles.user}>
                                    <div className={styles.userDetails}>
                                        <Image src={`${localUrl}/users/image/${user.name}`}
                                            alt="Profile Picture" width={50} height={50} className={styles.userProfilePicture} />
                                        <div className={styles.column}>
                                            <p className={styles.userName}>
                                                {user.name}
                                                <Image src={'../flags/' + user.country + '.svg'} alt="Country" width={24} height={24} className={styles.flag} />
                                            </p>
                                            <p className={styles.userEmail}>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.userButtons}>
                                        <div className={styles.column}>
                                            <p className={styles.time}>Last active: {formatDate(user.last_active)}</p>
                                            <p className={styles.time}>User created: {formatDate(user.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <LoadingScreen />
        </main>
    )
}