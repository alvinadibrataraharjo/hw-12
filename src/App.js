import * as React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <Container centerContent>
    <Box>
      <Box>{status}</Box>
      <Box className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Box>
      <Box className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Box>
      <Box className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Box>
      <Button>
        <button onClick={restart}>restart</button>
      </Button>
    </Box>
    </Container>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
