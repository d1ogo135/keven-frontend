import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  DrawerFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getApiUrl } from "../../services/api";

const schema = z.object({
  id: z.string().optional(),
  description: z.string().min(3, "Mínimo de 3 caracteres").max(1000),
  name: z.string().min(3, "Mínimo de 3 caracteres").max(50),
});

type Schema = z.infer<typeof schema>;

type SelectedRow = Schema & { dateCreated: string; action: "edit" | "view" };

type DepartmentDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLastTick: (time: number) => void;
  selectedRow?: SelectedRow;
};

const drawerTitles = {
  create: "Criar Departamento",
  edit: "Editar Departamento",
  view: "Visualizar Departamento",
};

export default function DepartmentDrawer({
  onClose,
  isOpen,
  selectedRow,
  setLastTick,
}: DepartmentDrawerProps) {
  const toast = useToast();

  const {
    formState: { isValid, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: selectedRow?.id || "",
      description: selectedRow?.description || "",
      name: selectedRow?.name || "",
    },
  });

  const firstField = React.useRef(null);

  async function onSubmit({ id, description, name }: Schema) {
    try {
      const allRes = await fetch(getApiUrl("/departments"));
      const all = await allRes.json();
      const isDuplicate = all.some(
        (d: any) => d.name.toLowerCase() === name.toLowerCase() && d.id !== id
      );

      if (isDuplicate) {
        toast({
          title: "Registro Duplicado",
          description: "Já existe um departamento com este Nome.",
          colorScheme: "orange",
          position: "bottom-left",
        });
        return;
      }

      const response = await fetch(
        getApiUrl(`/departments/${id ?? ""}`),
        {
          body: JSON.stringify({
            dateCreated: id ? selectedRow?.dateCreated : new Date().toISOString(),
            description,
            name,
          }),
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      toast({
        description: "Departamento salvo com sucesso",
        title: "Tudo Certo!",
        colorScheme: "green",
        position: "bottom-left",
      });

      setLastTick(new Date().getTime());
      onClose();
    } catch {
      toast({
        title: "Falha ao processar a requisição",
        colorScheme: "red",
        position: "bottom-left",
      });
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {drawerTitles[selectedRow?.action ?? "create"]}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                readOnly={selectedRow?.action === "view"}
                id="name"
                placeholder="Ex: Engenharia de Software"
                {...register("name")}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.description}>
              <FormLabel htmlFor="desc">Descrição</FormLabel>
              <Textarea
                readOnly={selectedRow?.action === "view"}
                id="desc"
                placeholder="Descreva o departamento"
                {...register("description")}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>

          {selectedRow?.action !== "view" && (
            <Button
              colorScheme="blue"
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
