import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/admin/feedbacks.module.css";
import Header from "@/components/header/Header";
import { openNotificationError, openNotificationSuccess } from "@/utils/Notifications";
import { useRouter } from "next/router";
import { getAllFeedbacks, deleteFeedback } from "@/services/FeedbackService";
import { showLoadingScreen, hideLoadingScreen } from "@/utils/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function Feedbacks() {
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const [input, setInput] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [numFeedbacks, setNumFeedbacks] = useState(0); // Number of feedbacks in the database
    const [currentPage, setCurrentPage] = useState(1); // Current page
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

        // Get all feedbacks
        showLoadingScreen();
        getAllFeedbacks().then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setFeedbacks(response.data.feedbacks);
                setNumFeedbacks(response.data.count);
            } else {
                openNotificationError("Error getting feedbacks", "Please try again later");
                console.error("Error getting feedbacks");
            }
            hideLoadingScreen();
        });
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            document.body.style.background = `${user.style}`;
        }
    }, [user]);

    // Format timestamp
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    // Delete feedback
    function handleDeleteFeedback(id) {
        showLoadingScreen();
        deleteFeedback(id).then((response) => {
            if (response.status === 200) {
                openNotificationSuccess("Feedback deleted successfully");
                setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
                setNumFeedbacks(numFeedbacks - 1);
            } else {
                openNotificationError("Error deleting feedback", "Please try again later");
                console.error("Error deleting feedback");
            }
            hideLoadingScreen();
        });
    }

    // Get feedbacks for next page and append them to the current feedbacks
    function handleNextPage() {
        console.log("Getting next page");
        showLoadingScreen();
        getAllFeedbacks(currentPage + 1).then((response) => {
            if (response.status === 200) {
                setFeedbacks([...feedbacks, ...response.data.feedbacks]);
                setCurrentPage(currentPage + 1);
            } else {
                openNotificationError("Error getting feedbacks", "Please try again later");
                console.error("Error getting feedbacks");
            }
            hideLoadingScreen();
        });
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Review feedbacks
                </h1>
                <div className={styles.feedbackContainer}>
                    {feedbacks.map((feedback) => {
                        return (
                            <div className={styles.feedback} key={feedback._id}>
                                <div className={styles.feedbackHeader}>
                                    <h2 className={styles.feedbackTitle}>{feedback.title}</h2>
                                    <p className={styles.feedbackDate}>
                                        {formatDate(feedback.timestamp)}
                                    </p>
                                </div>
                                <p className={styles.feedbackContent}>{feedback.comment}</p>
                                <div className={styles.feedbackFooter}>
                                    <p className={styles.feedbackId}>ID: {feedback._id}</p>
                                    <Popconfirm
                                        title="Are you sure you want to delete this feedback?"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        onConfirm={() => handleDeleteFeedback(feedback._id)}
                                        okText="Yes"
                                        cancelText="No"
                                        okButtonProps={{ style: { backgroundColor: '#FF70A6', color: '#FFFFFF' } }}
                                    >
                                        <button className={styles.deleteButton}>Delete</button>
                                    </Popconfirm>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
                {feedbacks.length < numFeedbacks && (
                    <button className={styles.nextButton} onClick={handleNextPage}>
                        Load more
                    </button>
                )}
            </div>
            <LoadingScreen />
        </main>
    )
}