import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Container
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";

// URLs das imagens
const iconsUrls = [
  "https://i.imgur.com/TfiCssl.png", 
  "https://imgur.com/zBt02Wg.png",
  "https://imgur.com/NzD9G2t.png",
  "https://imgur.com/yt1pmFB.png",
  "https://imgur.com/BZP5wdE.png",
];
const logoUrl = "https://www.cin.ufpe.br/~imprensa/marcacinpng/TMB";

export const MeuPerfil = () => {
  return (
    <>
      <Global
        styles={`
          body {
            overflow: hidden;
          }
        `}
      />
      <Box
        bg="#191919"
        color="#EAEAEA"
        minH="100vh"
        fontFamily="Inter"
        position="relative"
      >
        <NavBar />

        {/* Adicionando a imagem 5 logo abaixo da NavBar */}
        <Box display="flex" justifyContent="center" mt={4} position="relative">
          <Image src={iconsUrls[4]} boxSize="1100px" />
        </Box>

        {/* Adicionando o título e os botões sobre a imagem */}
        <Box position="absolute" top="9%" left="25%" transform="translate(-50%, -50%)">
          <Text fontSize="25px" fontFamily="Inter" fontWeight="200" mb={3} textAlign="center" color="#EAEAEA">
            Meu Perfil
          </Text>
        </Box>
          
        <Box position="absolute" top="40%" left="25%" transform="translate(-50%, -50%)">
          <Container mt={8} p={0} minH="500px" position="relative">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                bg="#784A95"
                color="#EAEAEA"
                _hover={{ bg: "#5e3a72" }}
                borderRadius="11px"
                mb={8}
                w="250px" // Definindo largura específica
                justifyContent="space-between" // Ajuste de layout
                paddingRight="20px" // Espaçamento à direita
                leftIcon={<Image src={iconsUrls[0]} boxSize="30px" />} // Adicionando ícone à esquerda
              >
                <Box flex="1" textAlign="left">Meus Dados</Box>
                <ChevronRightIcon />
              </Button>
              <Button
                bg="#784A95"
                color="#EAEAEA"
                _hover={{ bg: "#5e3a72" }}
                borderRadius="11px"
                mb={8}
                w="250px" // Definindo largura específica
                justifyContent="space-between" // Ajuste de layout
                paddingRight="20px" // Espaçamento à direita
                leftIcon={<Image src={iconsUrls[1]} boxSize="30px" />} // Adicionando ícone à esquerda
              >
                <Box flex="1" textAlign="left">Minhas Reservas</Box>
                <ChevronRightIcon />
              </Button>
              <Button
                bg="#784A95"
                color="#EAEAEA"
                _hover={{ bg: "#5e3a72" }}
                borderRadius="11px"
                mb={8}
                w="250px" // Definindo largura específica
                justifyContent="space-between" // Ajuste de layout
                paddingRight="20px" // Espaçamento à direita
                leftIcon={<Image src={iconsUrls[2]} boxSize="30px" />} // Adicionando ícone à esquerda
              >
                <Box flex="1" textAlign="left">Lista de desejos</Box>
                <ChevronRightIcon />
              </Button>
              <Button
                bg="#784A95"
                color="#EAEAEA"
                _hover={{ bg: "#5e3a72" }}
                borderRadius="11px"
                mb={8}
                w="250px" // Definindo largura específica
                justifyContent="space-between" // Ajuste de layout
                paddingRight="20px" // Espaçamento à direita
                leftIcon={<Image src={iconsUrls[3]} boxSize="30px" />} // Adicionando ícone à esquerda
              >
                <Box flex="1" textAlign="left">Avaliações</Box>
                <ChevronRightIcon />
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
