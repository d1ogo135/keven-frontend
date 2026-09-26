import { Center, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import type { Column } from "./Table";
import Table from "./Table";

type ListViewProps = {
    columns: Column[];
    emptyStateDescription?: string;
    emptyStateTitle?: string;
    resource: string;
}

export default function ListView(props: ListViewProps) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const isProd = import.meta.env.PROD;
        const baseUrl = isProd ? '/api' : 'http://localhost:3333';
        const url = `${baseUrl}${props.resource}`.replace(/\/\/+/g, '/').replace(':/', '://'); // Fix double slashes

        fetch(url)
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(() => setRows([]))
            .finally(() => setLoading(false))
    }, [props.resource])

    if (loading) {
        return (
            <Center py={16}>
                <Spinner size="lg" color="brand.500" thickness="4px" />
            </Center>
        )
    }

    if (!rows.length) {
        return (
            <Center borderColor="darkBg.border" borderRadius="xl" borderStyle="dashed" borderWidth="2px" py={16} px={6} m={4}>
                <VStack spacing={3}>
                    <Icon as={Inbox} boxSize={12} color="whiteAlpha.400" />

                    <Text fontSize="lg" fontWeight="semibold" color="whiteAlpha.800">
                        {props.emptyStateTitle ?? "Nenhum resultado encontrado"}
                    </Text>

                    <Text color="whiteAlpha.500" fontSize="sm" textAlign="center" maxW="sm">
                        {props.emptyStateDescription ?? "Ainda não há registros criados. Eles aparecerão aqui quando forem adicionados."}
                    </Text>
                </VStack>
            </Center>
        )
    }

    return <Table columns={props.columns} rows={rows}  />
}
