import { playersData } from "../Data/playersData";
import { useRef, useState } from "react";

export default function HigherOrLowerGame({onClick}) {
    const randomNumber1 = Math.floor((Math.random()*73))
    const randomNumber2 = Math.floor((Math.random()*73))

    const [randomConditionNum, setrandomConditionNum] = useState(Math.floor((Math.random()*4)))
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [player1, setPlayer1] = useState(playersData[randomNumber1])
    const [player2, setPlayer2] = useState(playersData[randomNumber2])

    const score = useRef(0)

    let condition = ""

    if(randomConditionNum === 0){
        condition = "goals"
    }
    else if(randomConditionNum === 1){
        condition = "asissts"
    }
    else{
        condition = "appearances"
    }

    function handleClickHigher(){
        setWrongAnswer(player1[condition] > player2[condition]? true: false)
        if(player1[condition] < player2[condition]){
        score.current = score.current + 1
        }
        setPlayer1(player2)
        setPlayer2(playersData[Math.floor((Math.random()*73))])
        setrandomConditionNum(Math.floor((Math.random()*4)))
    }

    function handleClickLower(){
        setWrongAnswer(player1[condition] < player2[condition]? true: false)
        if(player1[condition] > player2[condition]){
        score.current = score.current + 1
        }
        setPlayer1(player2)
        setPlayer2(playersData[Math.floor((Math.random()*73))])
    }

    function handleOnRestart(){
        setWrongAnswer(false)
        score.current = 0
    }


    return(
        <>
            {wrongAnswer &&
            <div className="overlay">
                <dialog className="dialog" open>

                    <h2>GAME OVER!</h2>
                    <h3>Your Score: {score.current}</h3>

                    <div className="dialog-button-div">

                        <button onClick={handleOnRestart}>Restart</button>
                        <button onClick={onClick}>Leave Game</button>

                    </div>

                </dialog>
            </div>
            }
            <div className="container">

                <div className="player-card">

                    <h2>{player1.name}</h2>
                    <img src={player1.img} />
                    <p>{player1[condition]}</p>

                </div>

                <div className="middle-div">

                <div className="high-low-div">
                    <button onClick={handleClickHigher}>Higher <i className="fa-solid fa-arrow-up"></i></button>
                    <button onClick={handleClickLower}>Lower <i className="fa-solid fa-arrow-down"></i></button>
                </div>

                    <p>{condition.toUpperCase()}</p>

                    <p>Score: {score.current}</p>

                </div>

                <div className="player-card">

                    <h2>{player2.name}</h2>
                    <img src={player2.img} />
                    <p>???</p>

                </div>
            </div>
        </>
    )
}