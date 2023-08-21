import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SquareType } from "../types";

interface SquareProps {
  value: SquareType;
  disabled?: boolean;
  id: string;
  onClick?: () => void;
}

const Square: FC<SquareProps> = ({ value, disabled, id, onClick }) => {
  return (
    <Flex
      align="center"
      justify="center"
      bgColor="background"
      bg="#222"
      borderRadius="5px"
      // transition="all 0.3s ease-in"
      _hover={{ bg: disabled ? "" : "#333" }}
      cursor={disabled ? "not-allowed" : "pointer"}
      // pointerEvents={disabled ? 'none' : 'all'}
      fontSize="4.5rem"
      color="primary.main"
      id={id}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
    >
      {value && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          {value}
        </motion.div>
      )}
    </Flex>
  );
};

export { Square };
