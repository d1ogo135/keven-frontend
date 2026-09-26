import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { formatPrice } from "#/data/products";
import type { Product } from "#/data/products";

export function ProductCard({ product }: { product: Product }) {
  const descriptionColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Card
      overflow="hidden"
      variant="outline"
      h="100%"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      <Box position="relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          objectFit="cover"
          w="100%"
          h="180px"
          fallbackSrc="https://placehold.co/600x400?text=Produto"
        />
        {!product.inStock && (
          <Badge position="absolute" top="2" left="2" colorScheme="red">
            Esgotado
          </Badge>
        )}
      </Box>

      <CardBody>
        <Stack spacing="2">
          <HStack justify="space-between">
            <Badge colorScheme="teal">{product.category}</Badge>
            <Text fontSize="sm" color={descriptionColor}>
              ★ {product.rating.toFixed(1)}
            </Text>
          </HStack>

          <Heading size="sm" noOfLines={1}>
            {product.name}
          </Heading>

          <Text fontSize="sm" color={descriptionColor} noOfLines={2}>
            {product.description}
          </Text>

          <Text fontSize="xl" fontWeight="bold" color="teal.500">
            {formatPrice(product.price)}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter pt="0">
        <Button
          as={RouterLink}
          to="/product/$id"
          params={{ id: product.id }}
          colorScheme="teal"
          variant="outline"
          size="sm"
          w="100%"
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
