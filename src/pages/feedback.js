import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/feedback.module.css";
import Header from "@/components/header/Header";
import { Select } from "antd";
import { openNotificationError, openNotificationSuccess } from "@/utils/Notifications";
import { showLoadingScreen, hideLoadingScreen } from "@/utils/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";
import { sendFeedback } from "@/services/FeedbackService";
import { useRouter } from "next/router";

export default function Tutorial() {
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState("Bug");
    const router = useRouter();

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

    function handleChange(value) {
        console.log(`selected ${value}`);
        setSelected(value);
    }

    function handleSubmit() {
        if (input === "") {
            openNotificationError("Please enter some feedback");
            return;
        }

        showLoadingScreen();
        sendFeedback(selected, input).then((response) => {
            if (response.status === 200) {
                openNotificationSuccess("Feedback sent successfully");
                setInput("");
                hideLoadingScreen();
                router.push('/dashboard');
            } else {
                openNotificationError("Error sending feedback");
                hideLoadingScreen();
            }
        });
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Feedback
                </h1>
                <Select
                    defaultValue="Bug"
                    className={styles.select}
                    bordered={false}
                    onChange={handleChange}
                    options={[
                        { value: 'Bug', label: 'Bug' },
                        { value: 'Suggestion', label: 'Suggestion' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />
                <textarea
                    className={styles.textarea}
                    rows="5"
                    placeholder="Enter your feedback here..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className={styles.submit} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <LoadingScreen />
        </main>
    )
}