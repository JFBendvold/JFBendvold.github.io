import { useState, useEffect } from "react";
import styles from "@/style/game.module.css";
import Search from "@/components/Search";
import { showLoadingScreen, hideLoadingScreen } from '@/utils/LoadingProvider'
import LoadingScreen from '@/components/LoadingScreen'
import io from 'socket.io-client';
import Lobby from "@/components/Lobby";
import InGame from "../components/InGame";
import { openNotificationError } from "@/utils/Notifications";
import { useRouter } from "next/router";
import { localUrl } from "@/utils/ApiClientSetup";

export default function Game() {
    const [stage, setStage] = useState(0);
    const [upComingStage, setUpComingStage] = useState(0); // [stage, setStage]
    const [ws, setWs] = useState(null);
    const [lobby, setLobby] = useState(null);
    const [game, setGame] = useState(null); // [game, setGame]
    const router = useRouter();

    // Connect to websocket
    useEffect(() => {
        showLoadingScreen()
        connectToWebsocket();
    }, []);

    useEffect(() => {
        return () => {
            if (ws) {
                ws.disconnect();
            }
        };
    }, [ws]);

    function connectToWebsocket() {
        if (ws) {
            return;
        }
        const socket = io(localUrl, { transports: ['websocket'] });
        setWs(socket);

        socket.on('error', (error) => {
            console.log(error);

            if (error === 'busyBlockchain') {
                openNotificationError('Error', 'Blockchain is busy, please try again later.');
                //router.push('/dashboard');
            }

            else if (error !== 'lobbyNotFound' && error !== 'alreadyInLobby' && error !== 'gameNotFound') {
                openNotificationError('Error', "Couldn't connect to server.");
                router.push('/dashboard');
            }
        });

        socket.on('connect_error', (error) => {
            console.log(error);
            openNotificationError('Error', "Couldn't connect to server.");
            router.push('/dashboard');
        });

        socket.on('connect', () => {
            console.log('Connected to server');
            hideLoadingScreen()
        });

        socket.on('lobby', (lobby) => {
            console.log('Joined lobby', lobby);
            setLobby(lobby);
            setUpComingStage(1);
            setTimeout(() => {
                setStage(1);
            }, 500);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('startGame', (game) => {
            console.log('Starting game');
            console.log(game);
            setGame(game);
            setUpComingStage(2);
            setTimeout(() => {
                setStage(2);
            }, 500);
        });
    }

    return (
        <main className={`${styles.main} ${upComingStage != stage ? styles.disappear : ''}`} >
            {stage === 0 && (
            <Search websocket={ws} />
            )}
            {stage === 1 && (
            <Lobby websocket={ws} lobby={lobby} />
            )}

            {stage === 2 && (
            <div>
                <InGame websocket={ws} lobby={lobby} game={game} />
            </div>
            )}

            {stage === 3 && (
            <div>
                <h1>Results</h1>
            </div>
            )}
            <LoadingScreen />
        </main>
    );
}