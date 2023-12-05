// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div className="controls">
          <button id="start">Start</button>
          <button id="rand">Rand</button>
          <span className="label">Ticks:</span>
          <span className="display" id="ticks">0</span>
          <span className="label">Alive:</span>
          <span className="display" id="alive">0</span>
        </div>
        <div className="grid-container">
          {/* ${keys.map(i => `<div id="c-${i}" class="grid-cell"></div>`).join("      \n")} */}
        </div>
      </div>
    </>
  )
}

export default App
