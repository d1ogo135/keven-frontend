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
  Select,
  FormErrorMessage,
  DrawerFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getApiUrl } from "../../services/api";

const schema = z.object({
  id: z.string().optional(),
  courseName: z.string().min(1, "Selecione um curso"),
  professorName: z.string().min(1, "Selecione um professor"),
  dateTime: z.string().min(3, "Mínimo de 3 caracteres").max(100),
});

type Schema = z.infer<typeof schema>;

type SelectedRow = Schema & { action: "edit" | "view" };

type AllocationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLastTick: (time: number) => void;
  selectedRow?: SelectedRow;
};

const drawerTitles = {
  create: "Criar Alocação",
  edit: "Editar Alocação",
  view: "Visualizar Alocação",
};

export default function AllocationDrawer({
  onClose,
  isOpen,
  selectedRow,
  setLastTick,
}: AllocationDrawerProps) {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch(getApiUrl("/courses"))
        .then((res) => res.json())
        .then(setCourses)
        .catch(() => {});
      fetch(getApiUrl("/professors"))
        .then((res) => res.json())
        .then(setProfessors)
        .catch(() => {});
    }
  }, [isOpen]);

  const {
    formState: { isValid, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: selectedRow?.id || "",
      courseName: selectedRow?.courseName || "",
      professorName: selectedRow?.professorName || "",
      dateTime: selectedRow?.dateTime || "",
    },
  });

  const firstField = React.useRef(null);

  async function onSubmit({ id, courseName, professorName, dateTime }: Schema) {
    try {
      const response = await fetch(
        getApiUrl(`/allocations/${id ?? ""}`),
        {
          body: JSON.stringify({
            courseName,
            professorName,
            dateTime,
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
        description: "Alocação salva",
        title: "Ação realizada com sucesso",
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
            <FormControl isRequired isInvalid={!!errors.courseName}>
              <FormLabel htmlFor="courseName">Curso</FormLabel>
              <Select
                isDisabled={selectedRow?.action === "view"}
                id="courseName"
                placeholder="Selecione um curso"
                {...register("courseName")}
              >
                {courses.map((course: any) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.courseName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.professorName}>
              <FormLabel htmlFor="professorName">Professor</FormLabel>
              <Select
                isDisabled={selectedRow?.action === "view"}
                id="professorName"
                placeholder="Selecione um professor"
                {...register("professorName")}
              >
                {professors.map((prof: any) => (
                  <option key={prof.id} value={prof.name}>
                    {prof.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.professorName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.dateTime}>
              <FormLabel htmlFor="dateTime">Data e Hora</FormLabel>
              <Input
                readOnly={selectedRow?.action === "view"}
                id="dateTime"
                placeholder="Ex: Segundas, 14:00 - 16:00"
                {...register("dateTime")}
              />
              <FormErrorMessage>{errors.dateTime?.message}</FormErrorMessage>
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
