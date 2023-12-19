import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from './components/Square';
import Board from './components/Board';
import Game from './components/Game';

// npm install jest @testing-library/react --save-dev để cài đặt thư viện @testing-library/react
// sử dụng npm test -- --coverage để gen báo cáo.

// case test for Square
describe('Square', () => {
  it('renders square value is X', () => {
    const value = 'X';
    const { getByText } = render(<Square value={value} />);
    const button = getByText(value);
    expect(button).toBeInTheDocument();
  });

  it('call function onSquareClick when clicked', () => {
    const value = 'X';
    const onSquareClick = jest.fn();
    const { getByText } = render(<Square value={value} onSquareClick={onSquareClick} />);
    const button = getByText(value);
    fireEvent.click(button);
    expect(onSquareClick).toHaveBeenCalled();
  });
});

// case test for Board
describe('Board', () => {
  // Next player is X
  it('renders next player is X', () => {
    const squares = ["X", "O", "X", "O", null, null, null, null, null];
    const { getByText } = render(<Board xIsNext={true} squares={squares} onPlay={() => { }} />);
    const resultElement = getByText('Next player : X');
    expect(resultElement).toBeInTheDocument();
  });

  // Next player is O
  it('renders next player is O', () => {
    const squares = ["X", "O", "X", "O", "X", null, null, null, null];
    const { getByText } = render(<Board xIsNext={false} squares={squares} onPlay={() => { }} />);
    const resultElement = getByText('Next player : O');
    expect(resultElement).toBeInTheDocument();
  });

  // Draw
  it('renders draw', () => {
    const squares = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    const { getByText } = render(<Board xIsNext={true} squares={squares} onPlay={() => { }} />);
    const resultElement = getByText('Draw');
    expect(resultElement).toBeInTheDocument();
  });

  // Winner is X
  it('renders winner is X', () => {
    const squares = ["X", "O", null, "X", "O", null, "X", null, null];
    const { getByText } = render(<Board xIsNext={true} squares={squares} onPlay={() => { }} />);
    const resultElement = getByText('Winner : X');
    expect(resultElement).toBeInTheDocument();
  });

  // Click on first square
  it('calls onPlay with the correct nextSquares when first square is clicked', () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    const onPlayMock = jest.fn();
    const { container } = render(<Board xIsNext={true} squares={squares} onPlay={onPlayMock} />);
    const squareElement = container.querySelector('.board-row button:first-child');
    fireEvent.click(squareElement);
    expect(onPlayMock).toHaveBeenCalledWith(["X", null, null, null, null, null, null, null, null]);
  });
});

// case test for Game
test('clicking replay resets the game', () => {
  const { getByText } = render(<Game />);
  const replayButton = getByText('Play again');
  fireEvent.click(replayButton);
  expect(replayButton).toBeInTheDocument();
});

test('clicking on a move jumps to the corresponding step', () => {
  const { getByText } = render(<Game />);
  const moveButton = getByText('Go to start');
  fireEvent.click(moveButton);
  expect(moveButton).toBeInTheDocument();
});
