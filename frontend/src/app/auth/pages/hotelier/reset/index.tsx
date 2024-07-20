import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetTokenInputs, ResetTokenSchema } from "../../../forms/reset-form";
import { useResetPasswordHotelierMutation } from "../../../hooks";
import { toast } from "react-toastify";

const wizardImage = "https://i.imgur.com/En0qPaO.png";
const booImage = "https://i.imgur.com/1oLAmzY.png";

export const ResetPasswordHotelier: React.FC = () => {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPasswordHotelierMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetTokenInputs>({
    resolver: zodResolver(ResetTokenSchema),
  });

  const onSubmit = async (data: ResetTokenInputs) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => {
        navigate("/hotelier/login");
      }, 3000);
    } catch (error) {
      toast.error("Falha ao redefinir a senha. Tente novamente.");
    }
  };

  const handleSendEmailAgainClick = () => {
    navigate("/hotelier/password/recover");
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Flex position="relative" alignItems="flex-end">
          <Container maxW="container.md" position="relative" zIndex={1}>
            <Flex direction="column" align="center" justify="center">
              <HStack alignItems={"flex-start"} mb={5}>
                <Image
                  src={booImage}
                  alt="Reset Password Icon"
                  width="auto"
                  height="90px"
                  mr={3}
                />
                <Text
                  fontFamily="Trancinfont"
                  fontSize="7xl"
                  letterSpacing={"-0.07em"}
                >
                  recuperação de Senha
                </Text>
              </HStack>
              <Text fontSize={"20px"} fontWeight={"300"} mb={4}>
                Não se assuste! Cole abaixo o token que
                <br />
                você recebeu por e-mail e escolha sua
                <br />
                nova senha.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Flex
                  direction="column"
                  align="flex-start"
                  mx="auto"
                  maxWidth="400px"
                >
                  <FormControl
                    isInvalid={!!errors.token}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="token">Token</FormLabel>
                    <Input
                      id="token"
                      type="text"
                      placeholder="Digite seu Token"
                      {...register("token")}
                    />
                    <FormErrorMessage>
                      {errors.token && errors.token.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.newPassword}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Digite sua nova senha"
                      {...register("newPassword")}
                    />
                    <FormErrorMessage>
                      {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.confirmPassword}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirme a Nova Senha
                    </FormLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua nova senha"
                      {...register("confirmPassword")}
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <ButtonGroup spacing={4}>
                    <Button
                      mt={6}
                      colorScheme="red"
                      bg="#A4161A"
                      type="submit"
                      isLoading={resetPasswordMutation.isPending}
                      loadingText="Confirmando"
                    >
                      Confirmar
                    </Button>
                    <Button
                      mt={6}
                      colorScheme="red"
                      type="button"
                      variant="outline"
                      borderColor="red.500"
                      color={"white"}
                      _hover={{
                        bg: "transparent",
                        color: "red.500",
                        //borderColor: "#FAC006",
                      }}
                      onClick={handleSendEmailAgainClick}
                    >
                      Enviar novamente
                    </Button>
                  </ButtonGroup>
                </Flex>
              </form>
            </Flex>
          </Container>
          <Image
            src={wizardImage}
            alt="Feiticeiro"
            position="absolute"
            bottom="0"
            right="-270px"
            width="auto"
            height="480px"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ResetPasswordHotelier;
