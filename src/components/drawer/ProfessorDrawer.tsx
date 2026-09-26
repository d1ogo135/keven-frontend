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
  cpf: z.string().min(14, "O CPF deve estar completo").max(14),
  name: z.string().min(3, "Mínimo de 3 caracteres").max(50),
});

type Schema = z.infer<typeof schema>;

type SelectedRow = Schema & { dateCreated: string; action: "edit" | "view" };

type ProfessorDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLastTick: (time: number) => void;
  selectedRow?: SelectedRow;
};

const drawerTitles = {
  create: "Criar Professor",
  edit: "Editar Professor",
  view: "Visualizar Professor",
};

export default function ProfessorDrawer({
  onClose,
  isOpen,
  selectedRow,
  setLastTick,
}: ProfessorDrawerProps) {
  const toast = useToast();

  const {
    formState: { isValid, isSubmitting, errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: selectedRow?.id || "",
      cpf: selectedRow?.cpf || "",
      name: selectedRow?.name || "",
    },
  });

  const firstField = React.useRef(null);

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    let masked = cleaned;
    if (cleaned.length > 3) masked = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length > 6) masked = `${masked.slice(0, 7)}.${cleaned.slice(6)}`;
    if (cleaned.length > 9) masked = `${masked.slice(0, 11)}-${cleaned.slice(9, 11)}`;
    return masked;
  };

  async function onSubmit({ id, cpf, name }: Schema) {
    try {
      const allRes = await fetch(getApiUrl("/professors"));
      const all = await allRes.json();
      const isDuplicate = all.some(
        (p: any) => (p.cpf === cpf || p.name.toLowerCase() === name.toLowerCase()) && p.id !== id
      );

      if (isDuplicate) {
        toast({
          title: "Registro Duplicado",
          description: "Já existe um professor cadastrado com este Nome ou CPF.",
          colorScheme: "orange",
          position: "bottom-left",
        });
        return;
      }

      const response = await fetch(
        getApiUrl(`/professors/${id ?? ""}`),
        {
          body: JSON.stringify({
            dateCreated: id ? selectedRow?.dateCreated : new Date().toISOString(),
            cpf,
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
        description: "Professor salvo com sucesso",
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

  const cpfRegister = register("cpf");

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
                placeholder="Ex: João da Silva"
                {...register("name")}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.cpf}>
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <Input
                readOnly={selectedRow?.action === "view"}
                id="cpf"
                placeholder="000.000.000-00"
                {...cpfRegister}
                onChange={(e) => {
                  e.target.value = formatCPF(e.target.value);
                  cpfRegister.onChange(e);
                }}
              />
              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
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
