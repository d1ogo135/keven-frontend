import { createFileRoute } from '@tanstack/react-router'
import { Box, Heading, Text, SimpleGrid, Card, CardBody, Flex, Icon, VStack } from '@chakra-ui/react'
import { Building2, BookOpen, Users, CalendarDays } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

const STATS = [
  { label: 'Departamentos', value: '12', icon: Building2, color: 'blue.400' },
  { label: 'Cursos', value: '48', icon: BookOpen, color: 'green.400' },
  { label: 'Professores', value: '156', icon: Users, color: 'purple.400' },
  { label: 'Alocações', value: '342', icon: CalendarDays, color: 'orange.400' },
]

function Dashboard() {
  return (
    <Box>
      <Heading size="lg" mb="2" color="white">Painel de Controle</Heading>
      <Text color="whiteAlpha.600" mb="8">Bem-vindo ao sistema de alocação da Fafire.</Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6">
        {STATS.map((stat, idx) => (
          <Card key={idx} bg="darkBg.surface" borderColor="darkBg.border" borderWidth="1px" rounded="2xl" overflow="hidden">
            <CardBody>
              <Flex justify="space-between" align="center">
                <VStack align="start" spacing="0">
                  <Text color="whiteAlpha.500" fontSize="sm" fontWeight="semibold" textTransform="uppercase">{stat.label}</Text>
                  <Heading size="xl" color="white" mt="2">{stat.value}</Heading>
                </VStack>
                <Flex boxSize="12" bg="whiteAlpha.50" rounded="xl" align="center" justify="center">
                  <Icon as={stat.icon} boxSize="6" color={stat.color} />
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Box mt="10" p="6" rounded="2xl" bg="darkBg.surface" border="1px solid" borderColor="darkBg.border">
        <Heading size="md" mb="4">Atividade Recente</Heading>
        <Text color="whiteAlpha.500">O sistema está operando normalmente. Acesse o menu lateral para gerenciar as entidades.</Text>
      </Box>
    </Box>
  )
}
