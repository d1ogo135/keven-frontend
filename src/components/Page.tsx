import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
};

export default function Page(props: PageProps) {
  return (
    <Box w="full">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>

        <Box>
            <Heading size="lg" color="white" letterSpacing="tight">{props.title}</Heading>
            {props.subtitle && <Text fontSize="sm" color="whiteAlpha.600" mt={1}>{props.subtitle}</Text>}
        </Box>

        {props.action && (
          <Button colorScheme="brand" onClick={props.action.onClick} rounded="xl" px="6">{props.action?.label}</Button>
        )}
      </Box>

      <Box p={1} bg="darkBg.surface" rounded="2xl" borderWidth="1px" borderColor="darkBg.border" boxShadow="xl">
          {props.children}
      </Box>
    </Box>
  );
}
