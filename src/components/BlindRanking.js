import { playersData } from "../Data/playersData"
import { playersOrderArray } from "../Data/playersData"
import { useRef, useState } from "react"


export default function BlindRanking({onClick}){

    const randomNumber1 = Math.floor((Math.random()*73))

    const [randomPlayer, setRandomPlayer] = useState(playersData[randomNumber1])
    const [playersOrder, setPlayersOrder] = useState(playersOrderArray)
    const [playersInAList, setPlayersInAList] = useState(0)

    function handlePutHere(event){
        setPlayersOrder(prevState => {
            let newArray = [...prevState]
            let target = Number(event.target.id)

            newArray[target].name = randomPlayer.name
            newArray[target].goals = randomPlayer.goals
            newArray[target].disabled = true

            return newArray

        })

        setRandomPlayer(playersData[Math.floor((Math.random()*73))])

        setPlayersInAList(prevState => prevState + 1)
    }

    let restartPlayersOrder = [
        {
            id: 0,
            name: "Player1",
            goals: 0,
            disabled: false,
            isCorrect: false
        },
        {
            id: 1,
            name: "Player2",
            goals: 0,
            disabled: false,
            isCorrect: false
        },
        {
            id: 2,
            name: "Player3",
            goals: 0,
            disabled: false,
            isCorrect: false
        },
        {
            id: 3,
            name: "Player4",
            goals: 0,
            disabled: false,
            isCorrect: false
        },
        {
            id: 4,
            name: "Player5",
            goals: 0,
            disabled: false,
            isCorrect: false
        },
        {
            id: 5,
            name: "Player6",
            goals: 0,
            disabled: false,
            isCorrect: false
        }
    ]

    function handleOnRestart(){

        setPlayersOrder(restartPlayersOrder)

        setPlayersInAList(0)

    }

    function handleOnClick(){
        
        setPlayersOrder(restartPlayersOrder)

        setPlayersInAList(0)
    }

    let goalsArray = []
    let rightAndWrongList = []
    let perfectScore = false
    let gameScore = 0

    for (let i = 0; i < playersOrder.length; i++) {
        
        goalsArray.push(playersOrder[i].goals)
        
    }

    let correctGoalsArray = [...goalsArray]

    correctGoalsArray.sort((a, b) => b - a)

    for (let i = 0; i < goalsArray.length; i++) {
        const element1 = goalsArray[i];
        const element2 = correctGoalsArray[i]

        if(element2 === element1){
            gameScore = gameScore + 1
            rightAndWrongList.push(true)
        }
        else{
            rightAndWrongList.push(false)
        }
    }

    if(gameScore >= 6){
        perfectScore = true
    }

    const playersListElements = playersOrder.map(item => <li key={item.id}>{item.name}{!item.disabled && <button id={item.id} onClick={handlePutHere}>Put Here</button>}</li>)
    const playersScoreListElements = playersOrder.map(item => <li key={item.id}>{item.name} - {item.goals} goals  {rightAndWrongList[item.id]? <i className="fa-solid fa-check"></i>: <i className="fa-solid fa-x"></i>}</li>)


    return(
        <>
            {playersInAList >= 6 &&

                <div className="overlay">
                    <dialog className="dialog blind-ranking-dialog" open>
                        <h2>GAME OVER!</h2>

                        <div>
                            <h3>Your Score: {gameScore}</h3>
                            {perfectScore && <h4>Well Done, Perfect Score!</h4>}
                        </div>

                        <ol>
                            {playersScoreListElements}
                        </ol>

                        <div className="dialog-button-div">

                            <button onClick={handleOnRestart}>Restart</button>
                            <button onClick={handleOnClick}>Leave Game</button>

                        </div>

                    </dialog>
                </div>

            }

            <div className="blind-ranking-container">

                <div className="player-card">

                    <h2>{randomPlayer.name}</h2>
                    <img src={randomPlayer.img} />

                </div>

                <div className="player-list-div">

                    <ol>
                        {playersListElements}
                    </ol>

                </div>

            </div>
        </>
    )
}