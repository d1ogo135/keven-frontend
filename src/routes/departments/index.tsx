import { createFileRoute } from "@tanstack/react-router";
import Page from "../../components/Page";
import ListView from "../../components/ListView";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import DepartmentDrawer from "../../components/drawer/DepartmentDrawer";
import type { Column } from "../../components/Table";
import { Eye, Pencil, Trash } from "lucide-react";
import { JSONSchema } from "zod/v4/core";

import { getApiUrl } from "../../services/api";

export const Route = createFileRoute("/departments/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [lastTick, setLastTick] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);

  async function onDeleteRow(row: {
    id: string;
    name: string;
    description: string;
    dateCreated: string;
  }) {
    if (
      !confirm(`Tem certeza que deseja excluir o departamento "\${row.name}"?`)
    ) {
      return;
    }

    const response = await fetch(
      getApiUrl(`/departments/${row.id}`),
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
        label: "Nome",
        key: "name",
      },
      {
        label: "Descrição",
        key: "Descrição",
        render: (description) => <p style={{ color: "red" }}>{description}</p>,
      },
      {
        label: "Data de Criação",
        key: "dateCreated",
        render: (dateCreated) => new Date(dateCreated).toLocaleString(),
      },
      {
        label: "Ações",
        key: "Ações",
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
          label: "Novo Departamento",
          onClick: () => {
            setSelectedRow(null);

            onOpen();
          },
        }}
        title="Departamentos"
      >
        <ListView columns={columns} resource={`/departments#ts=${lastTick}`} />
      </Page>

      <DepartmentDrawer
        key={JSON.stringify(selectedRow)}
        isOpen={isOpen}
        onClose={onClose}
        selectedRow={selectedRow}
        setLastTick={setLastTick}
      />
    </>
  );
}
