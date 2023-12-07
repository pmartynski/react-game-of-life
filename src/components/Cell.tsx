import { useContext } from "react";
import "../App.css"
import { BoardContext } from "../App";

type Params = {
    index: number;
}

function Cell({
    index,
}: Params) {
    const cells = useContext(BoardContext);
    const className = (cells[index] ? 'alive ' : '') + 'grid-cell'
    return <div className={className} />
}

export default Cell
