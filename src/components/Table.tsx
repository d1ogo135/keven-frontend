import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
} from '@chakra-ui/react'

export type Column = {
    key: string;
    label: string;
    render?: (item: any, data: any) => void;
}

type TableProps = {
    columns: Column[];
    rows: any[];
}

export default function Table({columns, rows}: TableProps) {
  return <TableContainer>
    <ChakraTable variant="simple" >
      <Thead>
        <Tr>
         {columns.map((column) => (
            <Th key={column.key}>{column.label}</Th>
         ))}
        </Tr>
      </Thead>

      <Tbody>
        {rows.map((row) => {
          return (
            <Tr>
                {columns.map((column) => {
                    const value = row[column.key];
                    const renderValue = column.render ? column.render(value, row) : value;

                  return (
                    <Td>{renderValue} </Td>
                )
                })}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  </TableContainer>
}
