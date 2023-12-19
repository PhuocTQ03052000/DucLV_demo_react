import { caculateWinner } from '../utils/Common';
import Square from './Square';

function Board({ xIsNext, squares, onPlay }) {

    function handleClick(i) {
        if (squares[i] || caculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = caculateWinner(squares);
    let result;
    if (winner) {
        result = "Winner : " + winner;
    } else {
        result = "Next player : " + (xIsNext ? 'X' : 'O');
        if (!squares.flat().includes(null)) {
            result = "Draw";
        }
    }

    return (
        <>
            <div className='result'>
                {result}
            </div>
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}

export default Board;