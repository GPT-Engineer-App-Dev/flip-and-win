import { Box, Button, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    initialBoard[3][3] = 'W';
    initialBoard[3][4] = 'B';
    initialBoard[4][3] = 'B';
    initialBoard[4][4] = 'W';
    return initialBoard;
  });
  const [currentPlayer, setCurrentPlayer] = useState('B');
  const cellBg = useColorModeValue('gray.200', 'gray.700');

  const handleCellClick = (row, col) => {
    if (!board[row][col] && isValidMove(row, col, currentPlayer)) {
      const newBoard = [...board.map(row => [...row])];
      newBoard[row][col] = currentPlayer;
      flipDiscs(newBoard, row, col, currentPlayer);
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'B' ? 'W' : 'B');
    }
  };

  const isValidMove = (row, col, player) => {
    // Placeholder for valid move checking logic
    return true; // Temporarily return true for all moves
  };

  const flipDiscs = (board, row, col, player) => {
    // Placeholder for disc flipping logic
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box mb={4}>
        <Button colorScheme="blue">New Game</Button>
      </Box>
      <Grid templateColumns="repeat(8, 1fr)" gap={1}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              w="40px"
              h="40px"
              bg={cell === 'B' ? 'black' : cell === 'W' ? 'white' : cellBg}
              border={cell ? '2px solid' : 'none'}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </Grid>
    </Flex>
  );
};

export default Index;