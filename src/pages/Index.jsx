import { Box, Button, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [board, setBoard] = useState(Array(8).fill(Array(8).fill(null)));
  const cellBg = useColorModeValue('gray.200', 'gray.700');

  const handleCellClick = (row, col) => {
    // Placeholder for game logic
    console.log(`Cell clicked: ${row}, ${col}`);
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
              bg={cellBg}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </Grid>
    </Flex>
  );
};

export default Index;