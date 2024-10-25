import { useEffect, useRef, useState } from "react";
import { playersData } from "../Data/playersData";
import { lettersData } from "../Data/lettersData";


export default function GuessThePlayer({onClick}){

    const [randomPlayer, setRandomPlayer] = useState(playersData[Math.floor((Math.random()*73))].name)
    const [playerObject, setPlayerObject] = useState()
    const [lettersArray, setLettersArray] = useState(JSON.parse(JSON.stringify(lettersData)))
    const [clickedLetters, setClickedLetters] = useState("")
    const [wrongLettersNum, setWrongLettersNum] = useState(0)

    const score = useRef(0)

    let playerNameForApi = ""
    let playerName = ""
    let playerClub = ""
    let playerNationality = ""
    let playerImg = ""
    let playerPosition = ""
    let playerNumber = ""


    for (let i = 0; i < randomPlayer.length; i++) {
        const element = randomPlayer[i];

        if(element === " "){
            playerNameForApi = playerNameForApi + "_"
        }
        else{
            playerNameForApi = playerNameForApi + element
        }
        
    }
    

    if(playerObject){
        if(playerObject.strTeam === "_Retired Soccer"){
            playerClub = "Retired"
        }
        else if(playerObject.strTeam === "_Deceased Soccer"){
            playerClub = "Retired"
        }
        else{
            playerClub = playerObject.strTeam
        }
        playerName = playerObject.strPlayer
        playerNationality = playerObject.strNationality
        playerImg = playerObject.strThumb
        playerPosition = playerObject.strPosition
        playerNumber = playerObject.strNumber
    }


    function handleLetterClick(event){

        setLettersArray(prevState => {
            const eventText = event.target.innerText
            let newArray = [...prevState]

            for (let i = 0; i < newArray.length; i++) {
                const element = newArray[i];
                
                if(element.letter === eventText){
                    element.disabled = true
                }
            }

            return newArray

        })

        setClickedLetters(prevState => prevState + event.target.innerText)

        setWrongLettersNum(prevState => {
            if(randomPlayer.toUpperCase().indexOf(event.target.innerText) === -1){
                return prevState + 1
            }
            else{
                return prevState
            }
        })

    }

    function handleOnRestart(){
        setWrongLettersNum(0)
        setClickedLetters("")
        setRandomPlayer(playersData[Math.floor((Math.random()*73))].name)
        setLettersArray(lettersArray.map(item => ({letter: item.letter, disabled: false})))
        score.current = 0
    }

    function handleOnLeaveGame(){
        handleOnRestart()
        onClick()
    }


    useEffect(() => {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerNameForApi}`)
        .then(response => response.json())
        .then(data => setPlayerObject(playerNameForApi === "Eusebio"? data.player[1]: data.player[0]))

    },[randomPlayer, playerNameForApi]
    )


    let codeWordArray = []

    for (let i = 0; i < randomPlayer.length; i++) {
        const element = randomPlayer[i];

        if(element !== "'"){
            codeWordArray.push({letter: element.toUpperCase(), found: false})
        }
        
    }

    let codeGuessedCorrectly = true

    for (let i = 0; i < codeWordArray.length; i++) {
        const element = codeWordArray[i];

        if(clickedLetters){

            for (let j = 0; j < clickedLetters.length; j++) {

                if(clickedLetters[j] === element.letter){
                    element.found = true
                }
                
            }

        }

        if(!element.found && element.letter !== " "){
            codeGuessedCorrectly = false
        }
        
    }

    if(codeGuessedCorrectly){
        score.current = score.current + 0.5
        setRandomPlayer(playersData[Math.floor((Math.random()*73))].name)
        setClickedLetters("")
        setLettersArray(lettersArray.map(item => ({letter: item.letter, disabled: false})))
    }

    console.log(score,randomPlayer)


    const lettersElements = lettersArray.map(item => 
        <button 
            key={item.letter}
            onClick={handleLetterClick} 
            className={item.disabled? "letter-button-disabled": "letter-button"} 
            disabled={item.disabled}
        >
                {item.letter}
        </button>
    )

    const codeWordElements = codeWordArray.map(item => {

        let codeClass = ""

        if(item.found){
            codeClass = "code-bg-color"
        }
        else if(item.letter !== " " && item.letter !== "-"){
            codeClass = "border-bottom"
        }


        return (
            <h2 
                key={Math.random()} 
                className={codeClass}
            >
                {item.found && item.letter}
            </h2>)
    })


    return(
        <>
        {wrongLettersNum >= 3 &&
            <div className="overlay">
                <dialog className="dialog" open>

                    <h2>GAME OVER!</h2>
                    <h3>Your Score: {score.current}</h3>

                    <div className="dialog-button-div">

                        <button onClick={handleOnRestart}>Restart</button>
                        <button onClick={handleOnLeaveGame}>Leave Game</button>

                    </div>

                </dialog>
            </div>
        }

        <div className="guess-the-player-container">

            <div className="score-lives-container">
                <div className="remaining-lives">
                    <i className={wrongLettersNum > 0 ? "fa-regular fa-heart": "fa-solid fa-heart"}></i>
                    <i className={wrongLettersNum > 1 ? "fa-regular fa-heart": "fa-solid fa-heart"}></i>
                    <i className={wrongLettersNum > 2 ? "fa-regular fa-heart": "fa-solid fa-heart"}></i>
                </div>
            
                <h2>Score: {score.current}</h2>
            </div>

            <div className="player-info-container">

                <img src={playerImg} className="player-info-img" />

                <div className="player-info-headers">

                    <h2>Club: {playerClub}</h2>
                    <h2>Nationality: {playerNationality}</h2>
                    <h2>Position: {playerPosition}</h2>
                    {playerNumber && <h2>Jersey Number: {playerNumber}</h2>}

                </div>

            </div>

            <div className="code-word">
                {codeWordElements}
            </div>

            <div className="letters-container">

                {lettersElements}

            </div>

        </div>
        </>
    )

}