import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, LockIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClientData } from "../../../hooks/useUserData";
import { useUpdateClientMutation } from "../../../hooks";
import {
  UpdateClientFormInputs,
  UpdateClientSchema,
} from "../../../forms/update-form";
import { queryClient } from "../../../../../shared/config/query-client";
//import { useNavigate } from "react-router-dom";

const wineGlassImage = "https://i.imgur.com/9y30n2W.png";

const EditProfileClient: React.FC = () => {
  //const navigate = useNavigate();
  const updateClientMutation = useUpdateClientMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentField, setCurrentField] =
    useState<keyof UpdateClientFormInputs>("name");
  //const { data, isLoading, error } = useClientData();
  const { data } = useClientData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateClientFormInputs>({
    resolver: zodResolver(UpdateClientSchema),
  });

  useEffect(() => {
    if (data) {
      console.log("User Data:", data); // Log para depuração
      reset({
        name: data.name,
        email: data.email,
        username: data.username,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UpdateClientFormInputs) => {
    try {
      const newData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      if (newData.password === "") {
        // delete passowrd property from newData
        delete newData.password;
      }
      if (!data) {
        throw new Error("User data not found");
      }
      await updateClientMutation
        .mutateAsync({ data: newData, id: data.id })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["navbarUserData", data.id],
          });
        });
      // Handle form submission
      toast.success(`Alterações salvas com sucesso!`, {
        position: "top-right",
        autoClose: 5000,
      });
      //navigate("/reservations");
    } catch (error: any) {
      toast.error(`Erro ao salvar alterações!`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const openEditModal = (field: keyof UpdateClientFormInputs) => {
    setCurrentField(field);
    onOpen();
  };

  const renderEditableField = (
    label: string,
    fieldName: keyof UpdateClientFormInputs
    //isPassword = false
  ) => (
    <GridItem colSpan={1} key={fieldName}>
      <FormControl>
        <FormLabel htmlFor={fieldName}>{label}</FormLabel>
        <HStack>
          <Input
            id={fieldName}
            placeholder={label}
            isReadOnly
            {...register(fieldName)}
          />
          <IconButton
            aria-label={`Edit ${fieldName}`}
            icon={<EditIcon />}
            onClick={() => openEditModal(fieldName)}
          />
        </HStack>
      </FormControl>
    </GridItem>
  );

  const renderLockedField = (
    label: string,
    fieldName: keyof UpdateClientFormInputs
  ) => (
    <GridItem colSpan={1} key={fieldName}>
      <FormControl>
        <FormLabel htmlFor={fieldName}>{label}</FormLabel>
        <HStack>
          <Input
            id={fieldName}
            placeholder={label}
            isReadOnly
            {...register(fieldName)}
          />
          <IconButton
            aria-label={`Locked ${fieldName}`}
            icon={<LockIcon />}
            isDisabled
          />
        </HStack>
      </FormControl>
    </GridItem>
  );

  /*
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading user data</Text>;
  }
*/
  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <ToastContainer position="top-right" theme="dark" autoClose={5000} />
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Container maxW="container.md">
          <Flex direction="column" align="center" justify="center" w="100%">
            <HStack spacing={3} mb={6}>
              <Image src={wineGlassImage} height={"60px"} width={"auto"} />
              <Text
                fontFamily="Trancinfont"
                fontSize="6xl"
                letterSpacing={"-0.07em"}
              >
                Meus Dados
              </Text>
            </HStack>
            <Text mb={10}>
              Você pode visualizar seu cadastro e editar e-mail, username e
              senha.
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <VStack spacing={10} alignItems={"flex-start"}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={6}
                  width="100%"
                >
                  {renderLockedField("Nome", "name")}
                  {renderEditableField("E-mail", "email")}
                  {renderEditableField("Username", "username")}
                  {renderEditableField("Senha", "password")}
                  {renderLockedField("CPF", "cpf")}
                  {renderLockedField("Número de Telefone", "phone")}
                  {renderLockedField("Data de Nascimento", "birthDate")}
                  <ButtonGroup
                    spacing={4}
                    display={"flex"}
                    alignItems={"flex-end"}
                    justifyContent={"flex-start"}
                  >
                    <Button
                      type="submit"
                      colorScheme="red"
                      fontWeight={400}
                      bg="#A4161A"
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      variant="outline"
                      borderColor="#A4161A"
                      fontWeight={400}
                      color={"white"}
                      _hover={{
                        bg: "#A4161A",
                        color: "white",
                      }}
                      onClick={() => reset()} // limpa formulário
                    >
                      Cancelar
                    </Button>
                  </ButtonGroup>
                </SimpleGrid>
              </VStack>
            </form>
          </Flex>
        </Container>
      </Flex>

      {/* Modal for Editing Fields */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar {currentField}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor={currentField}>{currentField}</FormLabel>
              <Input
                id={currentField}
                placeholder={`Digite seu ${currentField}`}
                type={currentField === "password" ? "password" : "text"}
                {...register(currentField)}
              />
              {errors[currentField] && (
                <Text color="red.500">{errors[currentField]?.message}</Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              bg="#A4161A"
              mr={3}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditProfileClient;
