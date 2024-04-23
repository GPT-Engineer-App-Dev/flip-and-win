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
      if (currentPlayer === 'W') {
        setTimeout(aiMove, 500); // AI makes a move after 500ms
      }
    }
  };

  const aiMove = () => {
    const validMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(i, j, currentPlayer)) {
          validMoves.push([i, j]);
        }
      }
    }
    if (validMoves.length > 0) {
      const [row, col] = validMoves[Math.floor(Math.random() * validMoves.length)];
      handleCellClick(row, col);
    }
  };

  const isValidMove = (row, col, player) => {
    if (board[row][col]) return false; // Check if the cell is already occupied
    let valid = false;
    const opponent = player === 'B' ? 'W' : 'B';
    const directions = [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let path = false;
      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        path = true;
        x += dx;
        y += dy;
      }
      if (path && x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        valid = true;
      }
    });
    return valid;
  };

  const flipDiscs = (board, row, col, player) => {
    const directions = [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let path = [];
      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] && board[x][y] !== player) {
        path.push([x, y]);
        x += dx;
        y += dy;
      }
      if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        path.forEach(([px, py]) => {
          board[px][py] = player;
        });
      }
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box mb={4}>
        <Button colorScheme="blue" onClick={() => {
          setBoard(() => {
            const initialBoard = Array(8).fill(null).map(() => Array(8).fill(null));
            initialBoard[3][3] = 'W';
            initialBoard[3][4] = 'B';
            initialBoard[4][3] = 'B';
            initialBoard[4][4] = 'W';
            return initialBoard;
          });
          setCurrentPlayer('B');
        }}>New Game</Button>
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