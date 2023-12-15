import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/admin/questions.module.css";
import Header from "@/components/header/Header";
import { Select } from "antd";
import { openNotificationError, openNotificationSuccess } from "@/utils/Notifications";
import { useRouter } from "next/router";
import { getAllCategories } from "@/services/CategoryService";
import { addQuestion } from "@/services/QuestionService";
import { showLoadingScreen, hideLoadingScreen } from "@/utils/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";

export default function Questions() {
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const [input, setInput] = useState("");
    const [categories, setCategories] = useState([]); // [{id: 1, name: "Bug"}, {id: 2, name: "Suggestion"}, {id: 3, name: "Other"}
    const [selectedCategory, setSelectedCategory] = useState("");
    const [answer0, setAnswer0] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0); // 0, 1, 2, 3
    const [funFact, setFunFact] = useState("");
    const [difficulty, setDifficulty] = useState(0); // 0, 1, 2
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

        // Get all categories
        getAllCategories().then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setCategories(response.data);
            } else {
                console.error("Error getting categories");
            }
        });
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            document.body.style.background = `${user.style}`;
        }
    }, [user]);

    function handleCategoryChange(value) {
        console.log(`selected ${value}`);
        setSelectedCategory(value);
    }

    function handleDifficultyChange(value) {
        console.log(`selected ${value}`);
        setDifficulty(value);
    }

    function handleSubmit() {
        if (input === "") {
            openNotificationError("Error", "Please enter a question");
            return;
        }

        if (answer0 === "") {
            openNotificationError("Error", "Please enter answer 1");
            return;
        }

        if (answer1 === "") {
            openNotificationError("Error", "Please enter answer 2");
            return;
        }

        if (answer2 === "") {
            openNotificationError("Error", "Please enter answer 3");
            return;
        }

        if (answer3 === "") {
            openNotificationError("Error", "Please enter answer 4");
            return;
        }

        if (funFact === "") {
            openNotificationError("Error", "Please enter a fun-fact");
            return;
        }

        if (selectedCategory === "") {
            openNotificationError("Error", "Please select a category");
            return;
        }

        if (difficulty === "") {
            openNotificationError("Error", "Please select a difficulty");
            return;
        }

        const body = {
            question: input,
            answers: [answer0, answer1, answer2, answer3],
            correctAnswer: correctAnswer,
            funFact: funFact,
            category: selectedCategory,
            difficulty: difficulty,
        };

        console.log(body);

        showLoadingScreen();
        addQuestion(body).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                openNotificationSuccess("Success", "Question added successfully");
                hideLoadingScreen();
                router.push("/dashboard");
            } else {
                console.error("Error adding question");
                openNotificationError("Error", "Error adding question");
                hideLoadingScreen();
            }
        });
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Add new question
                </h1>
                <div className={styles.selectContainer}>
                    <Select
                        className={styles.select}
                        bordered={false}
                        onChange={handleCategoryChange}
                        options={categories.map((category) => {
                            return { value: category._id, label: category.name };
                        })}
                    />
                    <Select
                        defaultValue={0}
                        className={styles.select}
                        bordered={false}
                        onChange={handleDifficultyChange}
                        options={[
                            { value: 0, label: 'Easy' },
                            { value: 1, label: 'Medium' },
                            { value: 2, label: 'Hard' },
                        ]}
                    />
                </div>
                <input
                    type="text"
                    className={styles.question}
                    placeholder="Enter your question"
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className={styles.answers}>
                    <input
                        type="text"
                        className={styles.answer}
                        placeholder="Enter answer 1 (correct answer)"
                        onChange={(e) => setAnswer0(e.target.value)}
                    />
                    <input
                        type="text"
                        className={styles.answer}
                        placeholder="Enter answer 2"
                        onChange={(e) => setAnswer1(e.target.value)}
                    />
                    <input
                        type="text"
                        className={styles.answer}
                        placeholder="Enter answer 3"
                        onChange={(e) => setAnswer2(e.target.value)}
                    />
                    <input
                        type="text"
                        className={styles.answer}
                        placeholder="Enter answer 4"
                        onChange={(e) => setAnswer3(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    className={styles.funFact}
                    placeholder="Enter fun-fact"
                    onChange={(e) => setFunFact(e.target.value)}
                />
                <button className={styles.submit} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <LoadingScreen />
        </main>
    )
}