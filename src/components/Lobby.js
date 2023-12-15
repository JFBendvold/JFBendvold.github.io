import styles from "@/style/lobby.module.css";
import { useEffect, useState, useRef } from "react";
import { getLobbyUsers } from "@/services/UserService";
import Image from "next/image";
import { localUrl } from "@/utils/ApiClientSetup";

export default function Lobby(data) {
    const [lobby, setLobby] = useState(null);
    const [ws, setWs] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [sentEmote, setSentEmote] = useState(null); // [emote, setEmote]
    const [activeEmotes, setActiveEmotes] = useState({});
    const [time, setTime] = useState(null); // [time, setTime]
    const [counting, setCounting] = useState(false); // [counting, setCounting]
    const [isMuted, setIsMuted] = useState(false); // [isMuted, setIsMuted]

    useEffect(() => {
        setLobby(data.lobby);
        setWs(data.websocket);

        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    // Update users
    useEffect(() => {
        if (lobby) {
            //setUsers(getLobbyUsers(lobby.users));
            getLobbyUsers(lobby.users).then((response) => {
                console.log('Got lobby users', response);
                setUsers(response);
            });
        }
    }, [lobby]);

    // Listen websocket
    useEffect(() => {
        if (ws) {
            ws.on('emoji', (emoji) => {
                console.log('Got emoji', emoji);

                setActiveEmotes(prev => ({
                    ...prev,
                    [emoji.username]: emoji.emoji
                }));

                setTimeout(() => {
                    setActiveEmotes(prev => ({
                        ...prev,
                        [emoji.username]: null
                    }));
                }, 3000);
            });

            ws.on('timer', (time) => {
                console.log('Got timer', time);

                setTime(time);
                setCounting(true);
            });
        }
    }, [ws]);

    useEffect(() => {
        if (ws) {
            ws.on('lobby', (newLobby) => {
                console.log('Updated lobby', newLobby);
                setLobby(newLobby);
            });
        }
    }, [ws]);

    function sendEmote(emote) {
        console.log('Sending emote', emote);
        ws.emit('emoji', { emoji: emote, id: lobby.id, username: user.name });
        setSentEmote(emote);

        setTimeout(() => {
            setSentEmote(null);
        }, 3000);
    }

    return (
        <div className={styles.lobby}>
            <div className={styles.top}>
                {!counting &&
                <h1>Waiting for players
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                </h1>
                }
                {time>0 && <h2>Game starts in {time}</h2>}
                {time==0 && <h2>The game is starting!</h2>}
            </div>
            <div className={styles.mid}>
                {
                    users.map((user, index) => (
                        <div key={index} className={styles.user}>
                            {
                                activeEmotes[user.name] &&
                                <div className={styles.activeEmote}>
                                    <span>{activeEmotes[user.name]}</span>
                                </div>
                            }
                            <Image src={`${localUrl}/users/image/${user.name}`} width={128} height={128} alt="User image" />
                            <h2>
                                {user.name}
                                <Image className={styles.flag} src={`/flags/${user.country}.svg`} width={32} height={32} alt="User country" />
                            </h2>
                        </div>
                    ))
                }
            </div>
            <div className={styles.bottom}>
                <div className={styles.emotes}>
                    <div className={styles.emote} onClick={() => sendEmote('😁')}>
                        <span>😁</span>
                    </div>
                    <div className={styles.emote} onClick={() => sendEmote('😂')}>
                        <span>😂</span>
                    </div>
                    <div className={styles.emote} onClick={() => sendEmote('💩')}>
                        <span>💩</span>
                    </div>
                    <div className={styles.emote} onClick={() => sendEmote('🤡')}>
                        <span>🤡</span>
                    </div>
                    <div className={styles.emote} onClick={() => sendEmote('💀')}>
                        <span>💀</span>
                    </div>
                    <div className={styles.emote} onClick={() => sendEmote('🔥')}>
                        <span>🔥</span>
                    </div>
                </div>
                <div className={styles.mute} onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? 
                <span className="material-symbols-outlined">
                volume_off
                </span>
                : 
                <span className="material-symbols-outlined">
                volume_up
                </span>
                }
            </div>
            </div>
            {sentEmote &&
                <div className={styles.sentEmote}>
                    <span>{sentEmote}</span>
                </div>
            }
            <audio autoPlay loop muted={isMuted}>
                <source src="/sfx/lobbySong.mp3" type="audio/mpeg" />
            </audio>
        </div>
    );
}
