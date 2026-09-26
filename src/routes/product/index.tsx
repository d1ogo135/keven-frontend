import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "#/components/ProductCard";
import { CATEGORIES, products as mockProducts } from "#/data/products";

export const Route = createFileRoute("/product/")({
  component: RouteComponent,
});

type SortBy = "name" | "price-asc" | "price-desc" | "rating";

function RouteComponent() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const mutedColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
    .then(response => response.json())
    .then((data) => {
      const products = data.products.map((product) => {
        return {
          ...product,
          name: product.title,
          imageUrl: product.thumbnail,
          inStock: product.stock > 10
        }
      });

      setProducts(products)
    })
  }, []) 

 
  return (
    <Stack spacing="8">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap="4"
      >
        <Stack spacing="1">
          <Heading size="lg">Catálogo de produtos</Heading>
          <Text color={mutedColor}>
            {products.length} de {products.length} produtos
          </Text>
        </Stack>

        <Button as={RouterLink} to="/product/new" colorScheme="teal">
          Cadastrar produto
        </Button>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} spacing="4">
        <InputGroup maxW={{ md: "sm" }}>
          <InputLeftElement pointerEvents="none" color="gray.400">
            🔍
          </InputLeftElement>
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>

        <Select
          maxW={{ md: "3xs" }}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          maxW={{ md: "3xs" }}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortBy)}
        >
          <option value="name">Nome (A-Z)</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </Select>
      </Stack>

      {products.length === 0 ? (
        <Center py="16" flexDirection="column" gap="3">
          <Heading size="md">Nenhum produto encontrado</Heading>
          <Text color={mutedColor}>Ajuste a busca ou limpe os filtros.</Text>
          <Button
            variant="ghost"
            colorScheme="teal"
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
          >
            Limpar filtros
          </Button>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
