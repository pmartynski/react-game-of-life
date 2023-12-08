import Cell from "./Cell"
import "../App.css"
import { useMemo } from "react";

function Board({ onClick }: { onClick: (index: number) => void }) {
    const keys = useMemo(() => [...Array(10_000).keys()], []);


    return (
        <div className="grid-container">
            {keys.map(k => <Cell onClick={onClick} index={k} key={k} />)}        
        </div>
    )
}

export default Board
