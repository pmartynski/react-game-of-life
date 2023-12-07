import Cell from "./Cell"
import "../App.css"
import { useMemo } from "react";

function Board() {
    const keys = useMemo(() => [...Array(10_000).keys()], []);


    return (
        <div className="grid-container">
            {keys.map(k => <Cell index={k} key={k} />)}        
        </div>
    )
}

export default Board
