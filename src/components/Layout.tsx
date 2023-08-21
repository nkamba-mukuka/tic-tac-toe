import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box h="100vh" display="grid" gridTemplateRows="1fr auto">
      <main>{children}</main>
      <Box as="footer" textAlign="center">
        <small>CMPE415 Artificial Intelligence Project</small>
      </Box>
    </Box>
  );
};

export { Layout };
