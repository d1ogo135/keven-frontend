import { createFileRoute } from "@tanstack/react-router";
import Page from "../../components/Page";
import ListView from "../../components/ListView";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import AllocationDrawer from "../../components/drawer/AllocationDrawer";
import type { Column } from "../../components/Table";
import { Eye, Pencil, Trash } from "lucide-react";
import { getApiUrl } from "../../services/api";

export const Route = createFileRoute("/allocations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [lastTick, setLastTick] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);

  async function onDeleteRow(row: {
    id: string;
  }) {
    if (
      !confirm(`Tem certeza que deseja excluir esta alocação?`)
    ) {
      return;
    }

    const response = await fetch(
      getApiUrl(`/allocations/${row.id}`),
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      return;
    }

    setLastTick(new Date().getTime());
  }

  const columns: Column[] = useMemo(
    () => [
      {
        label: "ID",
        key: "id",
      },
      {
        label: "Curso",
        key: "courseName",
      },
      {
        label: "Professor",
        key: "professorName",
      },
      {
        label: "Data e Hora",
        key: "dateTime",
      },
      {
        label: "Ações",
        key: "actions",
        render: (_, row) => (
          <>
            <Box>
              <IconButton
                mr={4}
                onClick={() => {
                  setSelectedRow({ ...row, action: "view" });
                  onOpen();
                }}
                colorScheme="blue"
                aria-label="Visualizar"
                icon={<Eye />}
              />

              <IconButton
                mr={4}
                onClick={() => {
                  setSelectedRow({ ...row, action: "edit" });
                  onOpen();
                }}
                aria-label="Editar"
                colorScheme="gray"
                icon={<Pencil />}
              />

              <IconButton
                onClick={() => onDeleteRow(row)}
                mr={4}
                aria-label="Excluir"
                colorScheme="red"
                icon={<Trash />}
              />
            </Box>
          </>
        ),
      },
    ],
    [onOpen],
  );

  return (
    <>
      <Page
        action={{
          label: "Nova Alocação",
          onClick: () => {
            setSelectedRow(null);
            onOpen();
          },
        }}
        title="Alocações"
      >
        <ListView columns={columns} resource={`/allocations#ts=${lastTick}`} />
      </Page>

      <AllocationDrawer
        key={JSON.stringify(selectedRow)}
        isOpen={isOpen}
        onClose={onClose}
        selectedRow={selectedRow}
        setLastTick={setLastTick}
      />
    </>
  );
}
