import { Button, Heading, StackDivider, Box, Stack, Card, CardHeader, Text, CardBody, CardFooter } from '@chakra-ui/react'

export default function App() {
  return <div>
    <Card>
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>


  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>

  <Button loadingText="Loading..." isLoading={true}>Fazer login</Button>

      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Overview
        </Heading>
        <Text pt='2' fontSize='sm'>
          Check out the overview of your clients.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
  </div>
}
