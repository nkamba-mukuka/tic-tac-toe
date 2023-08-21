import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CreditsPage() {
  const navigate = useNavigate();

  return (
    <VStack pt="25vh" pb="2em">
      <Text align="center" mb="1.5em" fontSize="4rem" color="primary.main">
        Tic_Tac_Toe
      </Text>
      <VStack mb="2em" spacing="0.7em">
        <Text decoration="underline" fontSize="1.5rem" mb="1em">
          Credits
        </Text>
        <Text>Mukuka Nkamba - 21906667</Text>
        <Text>Given Moono</Text>
      </VStack>
      <Box height="50px" />
      <VStack alignItems="stretch" w="320px" mx="auto">
        <Button onClick={() => navigate("/", { replace: true })}>
          Go back
        </Button>
      </VStack>
    </VStack>
  );
}

export { CreditsPage };
