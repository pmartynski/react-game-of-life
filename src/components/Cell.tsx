import { useContext } from "react";
import "../App.css"
import { BoardContext } from "../App";

type Params = {
    index: number;
    onClick: (index: number) => void 
}

function Cell({
    index,
    onClick
}: Params) {
    const cells = useContext(BoardContext);
    const className = (cells[index] ? 'alive ' : '') + 'grid-cell'
    return <div onClick={() => onClick(index)} className={className} />
}

export default Cell
