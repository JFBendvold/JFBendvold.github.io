import styles from "../style/search.module.css";
import Header from "@/components/header/Header";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Tooltip } from 'react-tooltip';
import Confetti from 'react-confetti'
import { openNotificationInfo } from "@/utils/Notifications";
import { getTokens } from '@/utils/Web3Connection.js';
import { getUserId } from "@/services/UserService";

export default function Search(websocket) {
    const mainRef = useRef(null);
    const [style, setStyle] = useState("#FF70A6");
    const searchOptions = [50, 100, 250, 500, 1000, 2500, 5000, 10000];
    const [tokens, setTokens] = useState(0);
    const [selectedOption, setSelectedOption] = useState(searchOptions[0]);
    const [expanded, setExpanded] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchingText, setSearchingText] = useState("Searching for a lobby...");
    const [user, setUser] = useState(null);
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    // Game variables
    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const gridRef = useRef(null);
    const [emptyGrid, setEmptyGrid] = useState([]);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setStyle(JSON.parse(localStorage.getItem("user")).style);

        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)

        mainRef.current.style.background = `${style}`;
    }, []);

    async function search() {
        if (tokens < selectedOption) {
            openNotificationInfo("Insufficient funds", "You don't have enough tokens to join this lobby.");
            return;
        }

        setSearching(true);
        console.log("Searching for a lobby...");
        let userId = await getUserId();
        websocket.websocket.emit('join', { price: selectedOption, username: user.name, userId: userId.data });
    }

    useEffect(() => {
        if (user) {
            checkUser();

            setStyle(JSON.parse(localStorage.getItem("user")).style);

            mainRef.current.style.background = `${style}`;
        }
    }, [user]);

    async function checkUser() {
        let userId = await getUserId();

        websocket.websocket.emit('checkUser', { username: user.name, userId: userId.data });
    }

    // Get tokens from blockchain
    useEffect(() => {
        if (user) {
            getTokens().then((tokens) => {
                if (tokens === -1) {
                    console.error("Error getting tokens from blockchain");
                    return;
                }
                setTokens(tokens);
    
                const updatedUser = user;
                updatedUser.tokens = tokens;
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            });
        }
    }, [user]);

    // Websocket events
    useEffect(() => {
        if (websocket.websocket) {
            websocket.websocket.on('searchingUpdated', (data) => {
                if (data == "Creating new Lobby!") {
                    console.log(data);
                    setSearchingText(data);
                }

                if (data == "Adding user to the Lobby!") {
                    console.log(data);
                    setSearchingText(data);
                }
            });
        }
    });

    function Cell({x, y, revealCell}) {
        const cellData = grid[x][y];
        const { isMine, revealed, flagged, adjacentMines } = cellData;

        const handleClick = () => {
            if (gameOver || gameWon) return;

            let isZero = adjacentMines === 0;

            revealCell(isMine, isZero, x, y);
        }

        return (
            <div
                onClick={handleClick}
                onContextMenu={e => {
                        e.preventDefault();
                        if (gameOver || gameWon) return;
                        placeFlag(x, y);
                    }
                }
                className={revealed ? styles.cellRevealed : styles.cell}
            >
                {revealed && (isMine ? "💣" : adjacentMines)}
                {(!revealed && flagged) && "🚩"}
            </div>
        );
    }

    function placeFlag(x, y) {
        const newGrid = [...grid];
        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        setGrid(newGrid);
    }

    function revealCell(isMine, isZero, x, y) {
        const newGrid = [...grid];
        newGrid[x][y].revealed = true;

        if (isMine) {
            setGameOver(true);
            console.log("Game over!");
            revealAllBombs(newGrid);
        }
        else if (isZero) {
            revealAdjacentCells(newGrid, x, y);
        }

        //Check if the game is won
        let safeCellsToReveal = 0;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (!newGrid[x][y].revealed) {
                    safeCellsToReveal++;
                }
            }
        }

        if (safeCellsToReveal === 15) {
            setGameWon(true);
            console.log("Game won!");
        }

        setGrid(newGrid);
    }

    //Reveal adjacent cells
    function revealAdjacentCells(newGrid, x, y) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
    
        for (let [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
    
            if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10 && !newGrid[newX][newY].revealed) {
                newGrid[newX][newY].revealed = true;
    
                if (newGrid[newX][newY].adjacentMines === 0) {
                    revealAdjacentCells(newGrid, newX, newY);
                }
            }
        }
    }

    //Reveal all bombs
    function revealAllBombs(newGrid) {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (newGrid[x][y].isMine) {
                    newGrid[x][y].revealed = true;
                }
            }
        }
    }

    //Initialize the grid
    useEffect(() => {
        fillEmptyGrid();
    }, []);

    function fillEmptyGrid() {
        const newGrid = [];
        for (let i = 0; i < 10; i++) {
            newGrid.push(Array(10).fill().map(() => ({
                isMine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0
            })));
        }
        setEmptyGrid(newGrid);
    }

    //Place the mines
    useEffect(() => {
        if (emptyGrid.length === 0) return;

        // Create a copy of the empty grid and place the mines
        const newGrid = [...emptyGrid];
        let minesPlaced = 0;
        while (minesPlaced < 15) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);
            if (!newGrid[randomX][randomY].isMine) {
                newGrid[randomX][randomY].isMine = true;
                minesPlaced++;

                //Add the adjacent mine count
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (randomX + i >= 0 && randomX + i < 10 && randomY + j >= 0 && randomY + j < 10) {
                            newGrid[randomX + i][randomY + j].adjacentMines++;
                        }
                    }
                }
            }
        }
        
        setGrid(newGrid);
    }, [emptyGrid]);

    //Restart the game
    function restartGame() {
        setGameOver(false);
        setGameWon(false);
        fillEmptyGrid();
    }
    
    return (
        <main className={styles.main} ref={mainRef}>
            {!searching && <Header />}
            <div className={styles.content} style={{transform: searching ? "translateY(-100vh) scale(0.5)" : "translateY(0vh) scale(1)", opacity: searching ? 0 : 1}}>
                <div className={styles.searchFilter}>
                    <h1 className={styles.pottitle} data-tooltip-content="The pot is the amount of tokens you can win." data-tooltip-id="pot">
                        <span className="material-symbols-outlined">
                            trophy
                        </span>
                        {selectedOption * 10 * 0.8} <span className={styles.currency}>Tokens</span>
                    </h1>
                    <h1 className={styles.feetitle} data-tooltip-content="The fee is the amount of tokens you pay to enter a lobby." data-tooltip-id="buyInFee">
                        <span className="material-symbols-outlined">
                            payments
                        </span>
                        {selectedOption} <span className={styles.currency}>Tokens</span>
                    </h1>
                    <div className={styles.timeEstimateContainer} data-tooltip-content="The time estimate is based on the average time it takes to find a lobby." data-tooltip-id="searchTime">
                        <span className="material-symbols-outlined">
                            hourglass_empty
                        </span>
                        <p className={styles.timeEstimate}>
                            1-5 minutes
                        </p>
                    </div>
                    <div className={styles.searchOptionsContainer} style={{height: expanded ? "100px" : "0px"}}>
                        {searchOptions.map((option, index) => {
                            return (
                                <div className={styles.searchOption} key={index} onClick={() => 
                                    {
                                        if (tokens < option) {
                                            openNotificationInfo("Insufficient funds", "You don't have enough tokens to join this lobby.");
                                            return;
                                        }
                                        setSelectedOption(option)
                                    }
                                    } style={{backgroundColor: selectedOption == option ? "#FF70A6" : "#FFFFFF", color: selectedOption == option ? "#FFFFFF" : "#000000"}}>
                                    {option} <span className={styles.currency}>Tokens</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.expandButtonContainer}>
                        <span className="material-symbols-outlined" onClick={() => setExpanded(!expanded)}>
                            {expanded ? "expand_less" : "expand_more"}
                        </span>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={search}>
                        Join a lobby
                    </button>
                </div>
                <Tooltip id="searchTime"/>
                <Tooltip id="buyInFee"/>
                <Tooltip id="pot"/>
            </div>
            <div className={styles.searchingContainer} style={{transform: (searching && !start) ? "translateY(0vh) scale(1)" : "translateY(100vh) scale(0.5)", opacity: (searching && !start) ? 1 : 0}}>
                <div className={styles.searching}>
                    <div className={styles.spinner} data-tooltip-content="Click to start the minigame!" data-tooltip-id="gameStart" onClick={() => setStart(true)} />
                    <div className={styles.searchingText}>
                        <h1 className={styles.searchingTitle}>
                            {searchingText}
                        </h1>
                    </div>
                </div>
            </div>
            <div className={styles.miniGameContainer} style={{transform: start ? "translateY(0vh) scale(1)" : "translateY(100vh) scale(0.5)", opacity: start ? 1 : 0}}>
                <div className={styles.searchingStatus}>
                    <h1 className={styles.searchingTitle}>
                        {searchingText}
                    </h1>
                </div>
                <div className={styles.miniGame}>
                    <div className={styles.grid} ref={gridRef}>
                        {grid.map((row, rowIndex) => {
                            return row.map((col, colIndex) => {
                                return (
                                    <Cell
                                        key={`${rowIndex}-${colIndex}`}
                                        x={rowIndex}
                                        y={colIndex}
                                        revealCell={revealCell}
                                    />
                                );
                            });
                        })}
                    </div>
                </div>
                <div className={styles.restartButtonContainer}>
                    <button className={styles.restartButton} onClick={restartGame}>
                        Restart
                    </button>
                </div>
            </div>
            <div className={styles.bubbleContainer}>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
                <div className={styles.bubble}></div>
            </div>
            <Tooltip id="gameStart"/>
            <Confetti
                width={windowWidth}
                height={windowHeight}
                numberOfPieces={100}
                recycle={false}
                run={gameWon}
            />
        </main>
    );
}