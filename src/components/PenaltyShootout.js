import goalkeeper from "../goalkeeper1.png"
import goalkeeperStanding from "../goalkeeper-standing1.png"
import penaltySaved from "../penalty-saved.png"
import { useRef, useState } from "react"
import { prettyDOM } from "@testing-library/react"

export default function PenaltyShootout({onClick}){

    let shotSaved = false
    let shotDirection = ""
    let transparentClass = "blue"

    const [goalkeeperSave, setGoalkeeperSave] = useState()

    const [penaltyData, setPenaltyData] = useState([
        {
            id: 0,
            direction: "top-left",
            selected: false
        },
        {
            id: 1,
            direction: "middle",
            selected: false
        },
        {
            id: 2,
            direction: "top-right",
            selected: false
        },
        {
            id: 3,
            direction: "bottom-left",
            selected: false
        },
        {
            id: 4,
            direction: "bottom-right",
            selected: false
        }
    ])

    const score = useRef(0)
    const errors = useRef(0)


    function onBallClick(shotDirection){
        setPenaltyData(prevState => {
            return (
                    prevState.map(item => ({id: item.id, direction: item.direction, selected: item.direction === shotDirection? true: false}))
            )
        })
        setGoalkeeperSave(Math.floor(Math.random()*5))

    }

    function onNextPenalty(){
        setPenaltyData(prevState => prevState.map(item => ({...item, selected: false})))
        setGoalkeeperSave()
    }

    function onRestart(){
        setPenaltyData(prevState => prevState.map(item => ({...item, selected: false})))
        setGoalkeeperSave()
        score.current = 0
        errors.current = 0
    }

    penaltyData.forEach(element => {
        if(element.id === goalkeeperSave){
            shotDirection = element.direction
        }

        if(element.id === goalkeeperSave && element.selected){
            return shotSaved = true
        }
    });

    if(shotDirection){
        transparentClass = "transparent"
    }

    if(shotDirection && !shotSaved){
        score.current = score.current + 0.5
    }
    else if(shotDirection && shotSaved){
        errors.current = errors.current + 0.5
    }

    const shootingDirectionElements = penaltyData.map(item => {
        return (
            <div className={item.direction}>
                <i className={`fa-regular fa-futbol ${item.selected? "green": transparentClass}`} 
                    onClick={() => onBallClick(item.direction)}></i>
            </div>
    )})

    let showMessage = false
    
    if(shotDirection && errors.current < 3){
        showMessage = true
    }



    console.log(shotSaved, penaltyData, goalkeeperSave, shotDirection)

    return(
        <div className="penalty-shootout-container">

            {errors.current >= 3 &&
            <div className="overlay">
                <dialog className="dialog" open>

                    <h2>GAME OVER!</h2>
                    <p>All three shots are saved!</p>
                    <h3>Your Score: {score.current}</h3>

                    <div className="dialog-button-div">

                        <button onClick={onRestart}>Restart</button>
                        <button onClick={onClick}>Leave Game</button>

                    </div>

                </dialog>
            </div>
            }

            {
                showMessage && 
                <div className="goal-saved-message">
                    <img src={shotSaved? penaltySaved: "https://www.pngmart.com/files/21/Football-PNG-Image.png"} />
                    <h1>{shotSaved? "Saved!": "Goaaaal!!!"}</h1>
                    <button onClick={onNextPenalty}>Next penalty <i class="fa-solid fa-angles-right"></i></button>
                </div>
            }
    

            {
                shotDirection && shotDirection !== "middle" ? 
                    <img className={`goalkeeper-${shotDirection}`} src={goalkeeper} /> :
                    <img className="goalkeeper-standing" src={goalkeeperStanding} />
            }

            <h2 className="score">Score: {score.current}</h2>
            <div className="icon-football-div">
                {errors.current < 3 && <i className="fa-regular fa-futbol"></i>}
                {errors.current < 2 && <i className="fa-regular fa-futbol"></i>}
                {errors.current < 1 && <i className="fa-regular fa-futbol"></i>}
            </div>

            <img className="ball" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/750px-Soccerball.svg.png" /> 
            
            <div className="shooting-direction-grid">

                {shootingDirectionElements}

            </div>
        </div>
    )
}