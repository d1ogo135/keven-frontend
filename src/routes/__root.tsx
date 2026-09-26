import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  Outlet,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building2,
  CalendarDays,
} from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const NAV_LINKS = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Departamentos", to: "/departments", icon: Building2 },
  { label: "Cursos", to: "/courses", icon: BookOpen },
  { label: "Professores", to: "/professors", icon: Users },
  { label: "Alocações", to: "/allocations", icon: CalendarDays },
] as const;

function RootComponent() {
  return (
    <Flex minH="100vh" bg="darkBg.main">
      {/* Sidebar */}
      <Box
        w="280px"
        bg="darkBg.surface"
        borderRight="1px solid"
        borderColor="darkBg.border"
        position="fixed"
        h="100vh"
        display={{ base: "none", md: "block" }}
      >
        <Flex h="20" align="center" px="8" borderBottom="1px solid" borderColor="darkBg.border">
          <Flex
            boxSize="10"
            align="center"
            justify="center"
            rounded="xl"
            bgGradient="linear(to-br, brand.400, brand.600)"
            color="white"
            fontWeight="black"
            fontSize="xl"
            boxShadow="0 0 20px rgba(144, 18, 255, 0.4)"
          >
            F
          </Flex>
          <Heading size="md" ml="4" letterSpacing="tighter" color="white">
            Fafire<Text as="span" color="brand.400">Hub</Text>
          </Heading>
        </Flex>

        <VStack spacing="2" align="stretch" px="4" py="8">
          <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.400" textTransform="uppercase" px="4" mb="2">
            Menu Principal
          </Text>
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to} icon={link.icon}>
              {link.label}
            </NavItem>
          ))}
        </VStack>

        <Box position="absolute" bottom="0" w="full" p="4" borderTop="1px solid" borderColor="darkBg.border">
          <HStack spacing="4" p="3" rounded="xl" bg="whiteAlpha.50" cursor="pointer" _hover={{ bg: "whiteAlpha.100" }} transition="all 0.2s">
            <Avatar size="sm" name="Diogo Sant ana" bg="brand.500" />
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="white">Diogo Sant ana</Text>
              <Text fontSize="xs" color="whiteAlpha.500">Admin</Text>
            </Box>
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" ml={{ base: 0, md: "280px" }}>
        {/* Topbar for mobile */}
        <Flex
          display={{ base: "flex", md: "none" }}
          h="16"
          bg="darkBg.surface"
          borderBottom="1px solid"
          borderColor="darkBg.border"
          align="center"
          px="4"
          justify="space-between"
        >
          <Heading size="md" letterSpacing="tighter" color="white">
            Fafire<Text as="span" color="brand.400">Hub</Text>
          </Heading>
        </Flex>

        <Box p={{ base: 4, md: 10 }} maxW="7xl" mx="auto">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

function NavItem({ to, icon, children }: { to: string; icon: any; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        bg={isActive ? "brand.500" : "transparent"}
        color={isActive ? "white" : "whiteAlpha.600"}
        _hover={{
          bg: isActive ? "brand.400" : "whiteAlpha.100",
          color: "white",
        }}
        transition="all 0.2s"
      >
        <Icon
          mr="4"
          fontSize="18"
          as={icon}
          color={isActive ? "white" : "whiteAlpha.600"}
          _groupHover={{ color: "white" }}
        />
        <Text fontWeight="medium" fontSize="sm">{children}</Text>
      </Flex>
    </RouterLink>
  );
}

function NotFoundComponent() {
  return (
    <VStack spacing="4" align="center" justify="center" py="20">
      <Heading size="2xl" color="brand.400">404</Heading>
      <Heading size="lg">Página não encontrada</Heading>
      <Text color="whiteAlpha.500">
        O endereço que você tentou acessar não existe.
      </Text>
    </VStack>
  );
}
