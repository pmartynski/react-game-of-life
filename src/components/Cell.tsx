import { useContext } from "react";
import "../App.css"
import { BoardContext } from "../App";

type Params = {
    index: number;
}

function Cell({
    index,
}: Params) {
    const { cells, onClick } = useContext(BoardContext);
    const className = (cells && cells[index] ? 'alive ' : '') + 'grid-cell'
    return <div onClick={() => { if (onClick) { onClick(index) } }} className={className} />
}

export default Cell
