import style from "./App.css"
import backgroundImage from "./football-pitch-background.jpg"
import { useRef, useState } from "react";
import HigherOrLowerGame from "./components/HigherOrLowerGame";
import BlindRanking from "./components/BlindRanking";
import GuessThePlayer from "./components/GuessThePlayer";
import PenaltyShootout from "./components/PenaltyShootout";


function App() {

  const [selectedGame, setSelectedGame] = useState()
  const [playGame, setPlayGame] = useState(false)

  let selectTheGameText = "Select a game you wish to play!"
  let selectedGameElement = ""

  function handleOnSelectedGame(game){
    setSelectedGame(game)
  }

  function handlePlayGame(){
    setPlayGame(() => {
      if(selectedGame && selectedGame !== "warning"){
        return true
      }
      return false
    })
    setSelectedGame(prevState => !prevState? "warning": prevState)
  }

  function handleLeaveGame(){
    setPlayGame(false)
    setSelectedGame("")
    console.log("Game Left")
  }

  if(selectedGame === "warning"){
    selectTheGameText = "You can not play until you select a game. Please select the game you wish to play!"
  }
  else if(selectedGame){
    selectTheGameText = `Selected game: ${selectedGame}`
  }

  if(selectedGame === "Higher Or Lower" && playGame){
    selectedGameElement = <HigherOrLowerGame key={HigherOrLowerGame} onClick={handleLeaveGame} />
  }
  else if(selectedGame === "Blind Ranking" && playGame){
    selectedGameElement = <BlindRanking key={BlindRanking} onClick={handleLeaveGame} />
  }
  else if(selectedGame === "Guess The Player" && playGame){
    selectedGameElement = <GuessThePlayer key={GuessThePlayer} onClick={handleLeaveGame} />
  }
  else if(selectedGame === "Penalty Shootout" && playGame){
    selectedGameElement = <PenaltyShootout key={PenaltyShootout} onClick={handleLeaveGame} />
  }

  return (
    <>
      {!playGame && 

      <menu className="menu">

        <h1>TotalFootball</h1>
        <button onClick={handlePlayGame}>Play</button>

        <div className="games-container">

          <p>
            {selectTheGameText}
          </p>

          <div className="game-selection-div">
            
            <button 
              onClick={() => handleOnSelectedGame("Higher Or Lower")} 
              className={selectedGame === "Higher Or Lower"? "active" : undefined}
            >
            Higher Or Lower
            </button>

            <button 
              onClick={() => handleOnSelectedGame("Guess The Player")} 
              className={selectedGame === "Guess The Player"? "active" : undefined}
            >
            Guess The Player
            </button>

            <button
              onClick={() => handleOnSelectedGame("Blind Ranking")} 
              className={selectedGame === "Blind Ranking"? "active" : undefined}
            >
            Blind Ranking
            </button>

            <button
              onClick={() => handleOnSelectedGame("Penalty Shootout")} 
              className={selectedGame === "Penalty Shootout"? "active" : undefined}
            >
            Penalty Shootout
            </button>

          </div>

        </div>

      </menu>
      }
      {selectedGameElement}
    </>
  );
}

export default App;
