import { Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <VStack pt="25vh" pb="2em">
      <Text align="center" mb="1.5em" fontSize="4rem" color="primary.main">
        Tic_Tac_Toe
      </Text>
      <VStack alignItems="stretch" w="320px" mx="auto">
        <Button onClick={() => navigate("/play")}>Start game</Button>
        <Button onClick={() => navigate("/credits")}>Credits</Button>
        <Button onClick={() => window.close()}>Exit game</Button>
      </VStack>
    </VStack>
  );
}

export { HomePage };
