import { Box } from '@chakra-ui/react';
import { SquareType } from '../types';
import { FC } from 'react';
import { Square } from './Square';

interface GameBoardProps {
  squares: SquareType[];
  disabled?: boolean;
  onPlay?: (index: number) => void;
}

const GameBoard: FC<GameBoardProps> = ({ squares, disabled, onPlay }) => {
  return (
    <Box
      w="500px"
      h="500px"
      display="grid"
      gridTemplate="repeat(3, 1fr) / repeat(3, 1fr)"
      gap="5px"
    >
      {squares.map((value, index) => (
        <Square
          value={value}
          key={index}
          id={`square_${index}`}
          disabled={!!squares[index] || disabled}
          onClick={() => onPlay?.(index)}
        />
      ))}
    </Box>
  );
};

export { GameBoard };
