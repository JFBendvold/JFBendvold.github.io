import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/admin/admins.module.css";
import Header from "@/components/header/Header";
import { openNotificationError, openNotificationSuccess, openNotificationInfo } from "@/utils/Notifications";
import { showLoadingScreen, hideLoadingScreen } from "@/utils/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";
import { searchUsers } from "@/services/UserService";
import { Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { localUrl } from "@/utils/ApiClientSetup";
import { addAdmin } from "@/services/AuthorityService";
import { Tooltip } from 'react-tooltip';

export default function Admins() {
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

    // Add admin
    const addNewAdmin = async (username) => {
        console.log("Adding admin: ", username);

        showLoadingScreen();
        const response = await addAdmin(username);

        if (response.status === 200) {
            openNotificationSuccess("Successfully added admin", "");
            setUsers([]);
        }
        else {
            openNotificationError("Error adding admin", response.data);
        }

        hideLoadingScreen();
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Add Admins by Username
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
                                            <p className={styles.userName}>{user.name}</p>
                                            <p className={styles.userEmail}>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.userButtons}>
                                        {user.authority === "user" ? (
                                        <Popconfirm
                                            title="Are you sure you want to add this user as an admin?"
                                            icon={<UserOutlined style={{ color: '#FF70A6' }} />}
                                            onConfirm={() => addNewAdmin(user.name)}
                                            okText="Yes"
                                            cancelText="No"
                                            okButtonProps={{ style: { backgroundColor: '#FF70A6', color: '#FFFFFF' } }}
                                        >
                                            <button className={styles.userButton}>
                                                <span className="material-symbols-outlined">
                                                    add_circle
                                                </span>
                                            </button>
                                        </Popconfirm>
                                        ) : (
                                            <button className={styles.userButton} onClick={() => openNotificationInfo("User is already an admin", "")}
                                            data-tooltip-content="This user is already an admin" data-tooltip-id="admin"
                                            >
                                                <span className="material-symbols-outlined">
                                                    verified
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <LoadingScreen />
            <Tooltip id="admin" />
        </main>
    )
}