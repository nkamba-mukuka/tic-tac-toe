import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";

import { GameBoard } from "../components";
import { useCallback, useEffect, useState } from "react";
import { SquareType } from "../types";
import { getAiMove, getEmptySquares, getWin } from "../lib";

const removeSquareClassNames = () => {
  for (let i = 0; i < 9; i++) {
    const square = document.getElementById(`square_${i}`) as HTMLElement;

    square.classList.remove("win-square-x", "win-square-o");
    square.style.transitionDelay = "0";
  }
};

function PlayPage() {
  const [squares, setSquares] = useState<SquareType[]>(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [humanScore, setHumanScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [winner, setWinner] = useState<SquareType>(null);
  const [numGamesPlayed, setNumGamesPlayed] = useState(0);
  const toast = useToast();

  const showToast = useCallback(
    ({
      title,
      ...other
    }: {
      title: string;
      description?: string;
      status: "success" | "error" | "info";
    }) => {
      toast({
        position: "top",
        duration: 3000,
        icon: null,
        title: (
          <Text align="center" w="100%">
            {title}
          </Text>
        ),
        ...other,
      });
    },
    [toast]
  );

  const handlePlay = useCallback(
    (index: number) => {
      if (squares[index]) return;

      setSquares((squares) => {
        squares[index] = isX ? "X" : "O";
        return [...squares];
      });

      setIsX((x) => !x);
    },
    [isX, squares]
  );

  const replayGame = useCallback(() => {
    const humanStarts = numGamesPlayed % 2 === 1;

    removeSquareClassNames();
    setIsX(humanStarts);
    setSquares(Array(9).fill(null));
    setWinner(null);
    setNumGamesPlayed(x => x + 1);
  }, [numGamesPlayed]);

  const resetGame = useCallback(() => {
    removeSquareClassNames();
    setSquares(Array(9).fill(null));
    setIsX(true);
    setHumanScore(0);
    setAiScore(0);
    setWinner(null);
  }, []);

  const handleAiPlay = useCallback(() => {
    const bestMove = getAiMove(squares);

    handlePlay(bestMove);
  }, [handlePlay, squares]);

  useEffect(() => {
    if (getEmptySquares(squares).length === 0) {
      showToast({
        title: "It's a tie!",
        status: "info",
      });

      return;
    }

    const win = getWin(squares);

    if (win) {
      const { player: winPlayer, moves } = win;

      moves.forEach((pos, i) => {
        const square = document.getElementById(`square_${pos}`) as HTMLElement;

        square.style.transitionDelay = `${i * 100}ms`;

        square.classList.add(`win-square-${winPlayer.toLowerCase()}`);
      });

      if (winPlayer === "X") {
        setHumanScore((score) => score + 1);
        showToast({
          title: "You win!",
          status: "success",
        });
      } else {
        setAiScore((score) => score + 1);
        showToast({
          title: "You lose!",
          status: "error",
        });
      }

      setWinner(winPlayer);
    } else if (!isX) {
      setTimeout(handleAiPlay, 500);
    }
  }, [isX, squares, showToast, handleAiPlay]);

  useEffect(() => {
    removeSquareClassNames();
  }, []);

  return (
    <>
      <Box h="100%" display="grid" gridTemplateRows="auto 1fr">
        <Flex p="0.5em 1em">
          <Box flex="1">
            <Text color="primary.main">Tic_Tac_Toe</Text>
          </Box>
          <HStack
            spacing="50px"
            fontSize="16px"
            flex="1"
            justifyContent="center"
          >
            <Text>
              Human: <Text as="span">{humanScore}</Text>
            </Text>
            <Text>
              AI: <Text as="span">{aiScore}</Text>
            </Text>
          </HStack>
          <HStack flex="1" justifyContent="flex-end">
            {(winner || getEmptySquares(squares).length === 0) && (
              <Button size="sm" onClick={replayGame}>
                Play again
              </Button>
            )}
            <Button size="sm" onClick={resetGame}>
              Reset
            </Button>
            <Button size="sm">Main menu</Button>
          </HStack>
        </Flex>
        <Flex align="center" justify="center">
          <GameBoard
            squares={squares}
            disabled={!!winner || !isX}
            onPlay={handlePlay}
          />
        </Flex>
      </Box>
    </>
  );
}

export { PlayPage };
