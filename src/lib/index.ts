import { SquareType } from "../types";

const winningMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const aiMark = "O";
const humanMark = "X";

export const getWin = (squares: SquareType[]) => {
  const moves = winningMoves.find(
    (c) => squares[c[0]] === squares[c[1]] && squares[c[1]] === squares[c[2]]
  );

  if (moves) {
    const winner = squares[moves[0]];

    if (winner) {
      return { moves, player: winner };
    }
  }

  return undefined;
};

export const getEmptySquares = (squares: SquareType[]): number[] => {
  const emptySquares: number[] = [];

  squares.forEach((value, index) => {
    if (!value) {
      emptySquares.push(index);
    }
  });

  return emptySquares;
};

interface PlayResultType {index: number, score: number}

function minmax(squares: SquareType[], player: SquareType) {
  const emptySquares = getEmptySquares(squares);
  const win = getWin(squares);

  if(win) {
    if(win.player === humanMark) {
      return {score: -1};
    } else {
      return {score: 1};
    }
  } else if(emptySquares.length === 0) {
    return {score: 0};
  }

  const allTestPlayResults: PlayResultType[] = [];

  for (let i = 0; i < emptySquares.length; i++) {
    const playResult: PlayResultType = {score: 0, index: emptySquares[i]};

    squares[emptySquares[i]] = player;

    const result = minmax(squares, player === aiMark ? humanMark: aiMark);
    playResult.score = result.score;

    squares[emptySquares[i]] = null;

    allTestPlayResults.push(playResult);
  }

  let bestSquare = emptySquares[0];

  if (player === aiMark) {
    let bestScore = -Infinity;
    for (let i = 0; i < allTestPlayResults.length; i++) {
      if (allTestPlayResults[i].score > bestScore) {
        bestScore = allTestPlayResults[i].score;
        bestSquare = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < allTestPlayResults.length; i++) {
      if (allTestPlayResults[i].score < bestScore) {
        bestScore = allTestPlayResults[i].score;
        bestSquare = i;
      }
    }
  }

  return allTestPlayResults[bestSquare];
}

export const getAiMove = (squares: SquareType[]) => {
  let bestMove = minmax([...squares], aiMark);

  if("index" in bestMove) {
    return bestMove.index;
  }

  throw new Error("Game has ended")
};
