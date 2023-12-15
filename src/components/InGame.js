import styles from '@/style/inGame.module.css'
import { useEffect, useState } from 'react'
import { getLobbyUsers } from '@/services/UserService'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'
import { useReward } from 'react-rewards';
import Bubbles from '@/components/Bubbles'
import { getUserId } from '@/services/UserService'

export default function InGame(data) {
    const [stage, setStage] = useState(0) // 0 = intro, 1 = waiting for question, 2 = question, 3 = won, 4 = lost
    const [game, setGame] = useState(null) // [game, setGame]
    const [revealedCategory, setRevealedCategory] = useState(false)
    const [pot, setPot] = useState(400) // [pot, setPot]
    const [lobby, setLobby] = useState(null)
    const [ws, setWs] = useState(null)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [category, setCategory] = useState("Random")
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const router = useRouter()
    
    // Game variables
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0) // [questionNumber, setQuestionNumber]
    const [isPlaying, setIsPlaying] = useState(true) // [isPlaying, setIsPlaying]
    const [isCorrect, setIsCorrect] = useState(false) // [isCorrect, setIsCorrect]
    const [funFact, setFunFact] = useState("") // [funFact, setFunFact
    const [answerIndex, setAnswerIndex] = useState(-1) // index of answer
    const [timeLeft, setTimeLeft] = useState(15) // [timeLeft, setTimeLeft
    const [timeLeftPercentage, setTimeLeftPercentage] = useState(100) // [timeLeftPercentage, setTimeLeftPercentage
    const [correctAnswer, setCorrectAnswer] = useState(-1) // [correctAnswer, setCorrectAnswer
    const [lost, setLost] = useState(false) // [lost, setLost
    const [playersLeft, setPlayersLeft] = useState(0) // [playersLeft, setPlayersLeft
    let qNum = 0
    let isOut = false

    useEffect(() => {
        //testData()
        setLobby(data.lobby)
        setWs(data.websocket)
        setGame(data.game)
        setLost(false)
        isOut = false

        if (data.game) {
            setCategory(data.game.category.name)
            setPot(data.game.pot)
        }

        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)

        setUser(JSON.parse(localStorage.getItem('user')))
        fetchUserId()

        setTimeout(() => {
            setRevealedCategory(true)
        }, 15000)
    }, [])

    async function fetchUserId() {
        const userId = await getUserId()
        setUserId(userId)
    }

    // Update users
    useEffect(() => {
        if (lobby) {
            //setUsers(getLobbyUsers(lobby.users));
            getLobbyUsers(lobby.users).then((response) => {
                console.log('Got lobby users', response)
                setUsers(response)
            })
        }
    }, [lobby])

    // Listen for new question
    useEffect(() => {
        if (ws) {
            ws.on('question', (question) => {
                if (lost || isOut) { // if lost, don't show new question
                    return
                }
                console.log('New question', question);
                setQuestion(question.text);
                setAnswers(question.answers);
                setFunFact(question.fact);
                setAnswerIndex(-1);
                setIsPlaying(true);
                setQuestionNumber(question.number+1);
                qNum++;
                setStage(2);
            });

            ws.on('timer', (time) => {
                //console.log('Timer', time);
                setTimeLeft(time);
                setTimeLeftPercentage((time / 10) * 100);
            });

            ws.on('answerResponse', (answerResponse) => {
                console.log('Answer response', answerResponse);
                setIsCorrect(answerResponse);
                //setStage(1);
            });

            ws.on('closeQuestion', () => {
                if (lost || isOut) { // if lost, don't show new question
                    return
                }
                console.log('Closing question');
                setIsPlaying(false);
                //TODO: Show correct answer
                setTimeout(() => {
                    setStage(1);
                }, 5000);
            });

            ws.on('wrongAnswer', () => {
                console.log('Wrong answer');
                setLost(true);
                isOut = true
                setStage(4); // show lost screen
            });

            ws.on('kickedUsers', (kickedUsers) => {
                console.log('Kicked users', kickedUsers);
                if (kickedUsers.includes(user.name)) {
                    console.log('You were kicked');
                    setLost(true);
                    isOut = true
                    setStage(4); // show lost screen
                }
            });

            ws.on('numPlayers', (playersRemaining) => {
                console.log('Players left:', playersRemaining);
                setPlayersLeft(playersRemaining.length);
            });

            ws.on('endGame', (endObject) => {
                if (lost || isOut) { // if lost, don't show the end screen
                    return
                }
                console.log('End game', endObject);
                setPot(endObject.pot);
                setStage(3); // show won screen
            });
        }
    }, [ws]);

    function testData() {
        setQuestion("What is the capital of Sweden?")
        setAnswers(["Stockholm", "Gothenburg", "Malmö", "Uppsala"])
        setFunFact("The capital of Sweden is Stockholm")
        setStage(2)
    }

    function submitAnswer(index) {
        if (ws) {
            setAnswerIndex(index)
            console.log('Submitting answer in game:', game.id)
            ws.emit('answer', { gameId: game.id, userId: userId.data, answer: index, questionNumber: (questionNumber-1) })
        }
    }

    function goToDashboard() {
        router.push('/dashboard')
    }


    return (
        <div className={styles.container}>
            {stage === 0 && (
                <>
                    <div className={styles.intro}>
                        <h1>Welcome to Trivia, with a twist of crypto!</h1>
                        <p>Answer 10 questions correctly to win the pot of {pot} Tokens!</p>
                    </div>
                    <div className={styles.categories}>
                        <h2>Let's find out what category you'll be playing in!</h2>
                        <div className={styles.categoryBoxes}>
                            <div className={`${styles.categoryBox} ${category === 'Sport' ? styles.selectedCategory : ''}`}>
                                <p>
                                    Sport
                                </p>
                            </div>
                            <div className={`${styles.categoryBox} ${category === 'Arts and Culture' ? styles.selectedCategory : ''}`}>
                                <p>
                                    Arts and Culture
                                </p>
                            </div>
                            <div className={`${styles.categoryBox} ${category === 'History' ? styles.selectedCategory : ''}`}>
                                <p>
                                    History
                                </p>
                            </div>
                            <div className={`${styles.categoryBox} ${category === 'Science' ? styles.selectedCategory : ''}`}>
                                <p>
                                    Science
                                </p>
                            </div>
                            <div className={`${styles.categoryBox} ${category === 'Random' ? styles.selectedCategory : ''}`}>
                                <p>
                                    Random
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.end}>
                        <h2>Get ready to play!</h2>
                    </div>
                    <Confetti
                        width={windowWidth}
                        height={windowHeight}
                        numberOfPieces={100}
                        recycle={false}
                        run={revealedCategory}
                        />

                </>
            )}
            {stage === 1 && (
                <div className={styles.waiting}>
                    <h1>Waiting for next question</h1>
                    <h2>{playersLeft} players left</h2>
                    <h2 className={styles.funFact}>
                        <span className="material-symbols-outlined">
                            info
                        </span>
                        {funFact}
                    </h2>
                </div>
            )}
            {stage === 2 && (
                <div className={styles.question}>
                    <h1>{question}</h1>
                    <div className={styles.answers}>
                        {answers.map((answer, index) => (
                            <div key={index} className={`
                                ${styles.answer} ${answerIndex === index ? styles.selectedAnswer : ''} ${!isPlaying && index === correctAnswer ? styles.correctAnswer : ''} ${!isPlaying && answerIndex === index && !isCorrect ? styles.wrongAnswer : ''}
                                `} 
                            onClick={() => {
                                if (isPlaying && answerIndex === -1 && !lost) {
                                    submitAnswer(index)
                                }
                            }}>
                                {answerIndex === index && (
                                <span className="material-symbols-outlined">
                                    done
                                </span>
                                )}
                                <p>{answer.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.questionNumber}>
                        <p>{questionNumber}/10</p>
                    </div>
                    {isPlaying && (
                    <div className={styles.timerCircle} style={{ background: `conic-gradient(#FF70A600, #fff ${timeLeftPercentage}%, #FFD67000 ${timeLeftPercentage}%, #FFD67000)`, transition: 'all 1s linear' }}>
                        <div className={styles.timerContainer}>
                            <h2>{timeLeft}</h2>
                        </div>
                    </div>
                    )}
                </div>
            )}
            {!isPlaying && (
                    <Confetti
                        width={windowWidth}
                        height={windowHeight}
                        numberOfPieces={100}
                        recycle={false}
                        run={isCorrect}
                        />
            )}
            {stage === 3 && (
                <>
                <div className={styles.wonContainer}>
                    <h1>Congratulations!</h1>
                    <h2>You managed to answer all questions correctly and won the pot of {pot} Tokens!</h2>
                    <button onClick={() => {
                        console.log('Going back to dashboard')
                        goToDashboard()
                    }}>Leave game
                    </button>
                    <Bubbles content="🥳"/>
                </div>
                <Confetti
                    width={windowWidth}
                    height={windowHeight}
                    numberOfPieces={100}
                    recycle={true}
                    run={true}
                    />
                </>
            )}
            {stage === 4 && (
                <div className={styles.lostContainer}>
                    <h1>You lost.</h1>
                    <h2>Better luck next time!</h2>
                    <button onClick={() => {
                        console.log('Going back to dashboard')
                        goToDashboard()
                    }}>Leave game
                    </button>
                    <Bubbles content="😭"/>
                </div>
            )}
        </div>
    )
}