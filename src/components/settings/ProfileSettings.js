import { useState, useEffect, useLayoutEffect } from "react";
import styles from "../../style/settings/settingsContent.module.css";
import Image from "next/image";
import { Tooltip } from 'react-tooltip';
import { updateStyle, changeCountry } from "@/services/UserService";
import LoadingScreen from '@/components/LoadingScreen';
import { showLoadingScreen, hideLoadingScreen } from '@/utils/LoadingProvider'
import { updateProfilePicture } from "@/services/UserService";
import { getAverageQuestionOfUser } from "@/utils/Web3Connection";
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications.js';
import Select from 'react-select';
import { localUrl } from "@/utils/ApiClientSetup";

export default function ProfileSettings(user) {
    const [xp, setXp] = useState(0);
    const xpPercentage = (xp / 1000) * 100;
    const [creationDate, setCreationDate] = useState("");
    const [style, setStyle] = useState("FF70A6");
    const [countries, setCountries] = useState([]) //List of countries for 
    const [country, setCountry] = useState("")

    const isMetamaskUser = () => {
        return user.user?.metamask;
    }
   
    useLayoutEffect(() => {
        if(user && user.user) {
            setStyle(user.user.style);
            setCountry(user.user.country);
            setCreationDate(new Date(user.user.timestamp).toLocaleDateString());

            // Get list of countries
            fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
            .then(response => response.json())
            .then(data => {
                setCountries(data.countries)
            })
        }

        getXp();
    }, [user]);

    async function getXp() {
        const average = Number(await getAverageQuestionOfUser(user.user.id));
        setXp(average);
    }

    async function newAvatar() {
        try {
            const response = await updateProfilePicture();
            //Refresh page
            if(response.status === 200)
            {
                window.location.reload();
            }
            
        }
        catch(error) {
            openNotificationError("Could not generate new avatar");
        }

    }

    async function changeStyle(newStyle) {
        console.log("change style to " + newStyle);
        setStyle(newStyle);
        showLoadingScreen();
        await updateStyle(newStyle).then((response) => {
            console.log(response);
            
            // Update style in local storage
            const userFromStorage = JSON.parse(localStorage.getItem('user'));
            userFromStorage.style = newStyle;
            localStorage.setItem('user', JSON.stringify(userFromStorage));

            // update background color
            document.body.style.background = `${newStyle}`;
        } ).catch((error) => {
            console.log(error);
        });
        hideLoadingScreen();
    }

    async function updateCountry(newCountry) {
        console.log("change country to " + newCountry);
        showLoadingScreen();
        await changeCountry(newCountry).then((response) => {
            console.log(response);
            
            // Update country in local storage
            const userFromStorage = JSON.parse(localStorage.getItem('user'));
            userFromStorage.country = newCountry;
            localStorage.setItem('user', JSON.stringify(userFromStorage));
            setCountry(newCountry);
            openNotificationSuccess("Country changed successfully", "Your country has been changed successfully")
        } ).catch((error) => {
            console.log(error);
        });
        hideLoadingScreen();
    }

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.left}>
                    <Image src={`${localUrl}/users/image/${user.user.name}`} alt="Profile" width={64} height={64} className={styles.profilePicture} />
                    <div className={styles.innerSection}>
                        <h1>{user.user.name}
                            <Image src={'flags/' + country + '.svg'} alt="Country" width={24} height={24} />
                        </h1>

                        { !isMetamaskUser() &&
                            <button className={styles.editProfile} onClick={newAvatar} data-tooltip-content="Generate new random avatar" data-tooltip-id="newAvatar">
                                Generate new avatar
                            </button>
                        }

                    </div>
                </div>
                <div className={styles.right}>
                <div className={styles.levelBackground} style={{ background: `conic-gradient(#FF70A6, #FF70A6 ${xpPercentage}%, #FFD670 ${xpPercentage}%, #FFD670)` }}
                        data-tooltip-content={`${xp} / 1000`} data-tooltip-id="xp">
                        <div className={styles.levelContainer}>
                            <h1>{xp}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <h2>Change style</h2>
                <div className={styles.styleContainer}>
                    <div className={styles.style} style={{ background: "linear-gradient(45deg, #FF70A6 0%, #FFD670 100%)" }} onClick={() => changeStyle("linear-gradient(45deg, #FF70A6 0%, #FFD670 100%)")} data-tooltip-content="Default" data-tooltip-id="default">
                        { style === "linear-gradient(45deg, #FF70A6 0%, #FFD670 100%)" ? 
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(60deg, #333 0%, #000 100%)" }} onClick={() => changeStyle("linear-gradient(60deg, #333 0%, #000 100%)")}
                    data-tooltip-content="Dark" data-tooltip-id="dark">
                        { style === "linear-gradient(60deg, #333 0%, #000 100%)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(60deg, #70FFA6 0%, #70D6FF 100%)" }} onClick={() => changeStyle("linear-gradient(60deg, #70FFA6 0%, #70D6FF 100%)")}
                     data-tooltip-content="Green/Blue" data-tooltip-id="green">
                        { style === "linear-gradient(60deg, #70FFA6 0%, #70D6FF 100%)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(60deg, #FF70A6 0%, #70D6FF 100%)" }} onClick={() => changeStyle("linear-gradient(60deg, #FF70A6 0%, #70D6FF 100%)")}
                    data-tooltip-content="Pink/Blue" data-tooltip-id="blue">
                        { style === "linear-gradient(60deg, #FF70A6 0%, #70D6FF 100%)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                </div>
                <div className={styles.styleContainer}>
                    <div className={styles.style} style={{ background: "linear-gradient(60deg, rgb(0, 0, 0) 0%, rgb(24, 130, 173) 100%)" }} onClick={() => changeStyle("linear-gradient(60deg, rgb(0, 0, 0) 0%, rgb(24, 130, 173) 100%)")} data-tooltip-content="Ocean" data-tooltip-id="default">
                        { style === "linear-gradient(60deg, rgb(0, 0, 0) 0%, rgb(24, 130, 173) 100%)" ? 
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(to right top, #ff3758, #004460)" }} onClick={() => changeStyle("linear-gradient(to right top, #ff3758, #004460)")}
                    data-tooltip-content="Alpha" data-tooltip-id="dark">
                        { style === "linear-gradient(to right top, #ff3758, #004460)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8993e3, #758ee6, #5b88e8, #3c6fe6, #1c54e1, #0036d8, #0500cc)" }} onClick={() => changeStyle("linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8993e3, #758ee6, #5b88e8, #3c6fe6, #1c54e1, #0036d8, #0500cc)")}
                     data-tooltip-content="Galaxy" data-tooltip-id="green">
                        { style === "linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8993e3, #758ee6, #5b88e8, #3c6fe6, #1c54e1, #0036d8, #0500cc)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                    <div className={styles.style} style={{ background: "linear-gradient(60deg, rgb(197, 255, 158) 0%, rgb(230, 188, 86) 100%)" }} onClick={() => changeStyle("linear-gradient(60deg, rgb(197, 255, 158) 0%, rgb(230, 188, 86) 100%)")}
                    data-tooltip-content="Cactus" data-tooltip-id="blue">
                        { style === "linear-gradient(60deg, rgb(197, 255, 158) 0%, rgb(230, 188, 86) 100%)" ?
                        <span className="material-symbols-outlined">
                            done
                        </span>
                        : null
                        }
                    </div>
                </div>
            </div>
            { !isMetamaskUser() &&
            <div className={styles.box}>
                <h2>Change country</h2>
                <Select
                        options={countries}
                        onChange={(e) => updateCountry(e.value)}
                        placeholder="New country"
                        className={styles.select}
                        classNamePrefix="select"
                />
            </div>
            }
            <div className={styles.box}>
                <h3>Member since {creationDate}</h3>
            </div>
            <Tooltip id="newAvatar" />
            <Tooltip id="xp" />
            <Tooltip id="default" />
            <Tooltip id="dark" />
            <Tooltip id="green" />
            <Tooltip id="blue" />
            <LoadingScreen />
        </div>
    )
}