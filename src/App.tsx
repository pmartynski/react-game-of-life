import { createContext, useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'

type BoardState = boolean[];

export const BoardContext = createContext<BoardState>([])

function randomizeCells() : BoardState {
  const boardState = cleanCells()
  for(var i = 0; i < boardState.length; ++i) {
    boardState[i] = Math.random() > 0.66;
  }

  return boardState;
}

function cleanCells() : BoardState {
  return [...Array(10_000).map(_ => false)];
}

function getNeighbours(i: number): number[] {
  const result = [];
  const row = Math.floor(i / 100)
  const column = i % 100;

  // top left
  if (row > 0 && column > 0) {
    result.push(i - 101);
  }

  // top center
  if (row > 0) {
    result.push(i - 100);
  }

  // top right
  if (row > 0 && column < 99) {
    result.push(i - 99);
  }

  // middle left
  if (column > 0) {
    result.push(i - 1);
  }

  // middle right
  if (column < 99) {
    result.push(i + 1);
  }

  // bottom left
  if (column > 0 && row < 99) {
    result.push(i + 99);
  }

  // bottom center
  if (row < 99) {
    result.push(i + 100);
  }

  // bottom right
  if (row < 99 && column < 99) {
    result.push(i + 101);
  }

  return result;
}

function iterateState(boardState: BoardState) : BoardState {
  const newState = boardState.slice(0);

  for (let i = 0; i < boardState.length; ++i) {
    const neighbours = getNeighbours(i);
    const aliveNeighbours = neighbours.filter(n => boardState[n]).length;

    // underpopulation
    if (boardState[i] && aliveNeighbours < 2) {
      newState[i] = false;
      continue;
    }

    // overpopulation
    if (boardState[i] && aliveNeighbours > 3) {
      newState[i] = false;
      continue;
    }

    // reproduction
    if (!boardState[i] && aliveNeighbours === 3) {
      newState[i] = true;
    }
  }

  return newState;
}

function App() {
  const [boardState, setBoardState] = useState(cleanCells());
  
  const toggleCell = (index: number) => {
    const newState = boardState.slice(0);
    newState[index] = !newState[index];
    setBoardState(newState);
  }

  return (
    <>
      <div>
        <BoardContext.Provider value={boardState}>
          <div className="controls">
            <button onClick={() => setBoardState(iterateState(boardState))}>Start</button>
            <button onClick={() => setBoardState(randomizeCells())}>Rand</button>
            <button onClick={() => setBoardState(cleanCells)}>Clean</button>
            <span className="label">Ticks:</span>
            <span className="display" id="ticks">0</span>
            <span className="label">Alive:</span>
            <span className="display" id="alive">0</span>
          </div>
          <Board onClick={toggleCell} />
        </BoardContext.Provider>
      </div>
    </>
  )
}

export default App
