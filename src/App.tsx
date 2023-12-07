import { createContext, useState } from 'react'
import './App.css'
import Board from './components/Board'

type BoardState = boolean[];

export const BoardContext = createContext<boolean[]>([])

function randomizeCells() : BoardState {
  const boardState = [...Array(10_000).map(_ => false)]
  for(var i = 0; i < 10_000; ++i) {
    boardState[i] = Math.random() > 0.66;
  }

  return boardState;
}

function App() {
  const [boardState, setBoardState] = useState(randomizeCells());
  console.log(boardState)
  return (
    <>
      <div>
        <BoardContext.Provider value={boardState}>
          <div className="controls">
            <button id="start">Start</button>
            <button onClick={() => setBoardState(randomizeCells)}>Rand</button>
            <span className="label">Ticks:</span>
            <span className="display" id="ticks">0</span>
            <span className="label">Alive:</span>
            <span className="display" id="alive">0</span>
          </div>
          <Board />
        </BoardContext.Provider>
      </div>
    </>
  )
}

export default App
