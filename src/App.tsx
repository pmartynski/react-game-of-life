import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Board from './components/Board'

type BoardState = {
  cells?: boolean[];
  onClick?: (index: number) => void;
}

export const BoardContext = createContext<BoardState>({})

function randomizeCells() : boolean[] {
  const boardState = cleanCells()
  for(let i = 0; i < (boardState.length ?? 0); ++i) {
    boardState[i] = Math.random() > 0.66;
  }

  return boardState;
}

function cleanCells() : boolean[] {
  return [...Array(10_000).map(() => false)];
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

function iterateState(boardState: boolean[]) : boolean[] {
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
  const cells = useRef(cleanCells());
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [running, setRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    if(running) {
      const timer = setTimeout(() => {
        cells.current = iterateState(cells.current);
        setTickCount(tickCount + 1);
      }, 1);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [running, tickCount])
  
  const toggleCell = (index: number) => {
    cells.current[index] = !cells.current[index];
  };

  const handleRand = () => {
    if (running) {
      return;
    }

    setUpdateTrigger(!updateTrigger);
    cells.current = randomizeCells();
  }

  const handleClean = () => {
    if (running) {
      return;
    }

    setUpdateTrigger(!updateTrigger);
    cells.current = cleanCells();
  }

  const handleStartStop = () => {
    if(running) {
      setTickCount(0);
    }
  
    setRunning(!running);
  }

  return (
    <>
      <div>
        <BoardContext.Provider value={{ cells: cells.current, onClick: toggleCell }}>
          <div className="controls">
            <button onClick={handleStartStop}>{running ? 'Stop' : 'Start'}</button>
            <button onClick={handleRand}>Rand</button>
            <button onClick={handleClean}>Clean</button>
            <span className="label">Ticks:</span>
            <span className="display" id="ticks">{tickCount}</span>
            <span className="label">Alive:</span>
            <span className="display" id="alive">{cells.current.filter(c => c).length}</span>
          </div>
          <Board />
        </BoardContext.Provider>
      </div>
    </>
  )
}

export default App
