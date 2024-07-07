import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSpider, FaBed, FaUser, FaBars } from "react-icons/fa";
const hotelLogoUrl = "https://i.imgur.com/sZnZjMW.png";
const hotelLogoUrlExp = "https://i.imgur.com/QcX5CZ7.png";
export const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReservasMenuOpen,
    onOpen: onReservasMenuOpen,
    onClose: onReservasMenuClose,
  } = useDisclosure();
  const {
    isOpen: isPerfilMenuOpen,
    onOpen: onPerfilMenuOpen,
    onClose: onPerfilMenuClose,
  } = useDisclosure();

  return (
    <Box bg="#EAEAEA" color="#000000" height="80px">
      <Flex justify="space-between" align="center" p={4} height="100%">
        <Image src={hotelLogoUrl} alt="Hotel Transilvânia Logo" height="60px" />

        {/* Desktop Menu */}
        <Flex
          align="center"
          gap={20}
          mr="40px"
          fontFamily="Inter"
          fontWeight="700"
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            textDecoration="none"
            color="#000000"
            fontSize="24px"
          >
            <FaSpider style={{ marginRight: "6px" }} />
            <Text>Início</Text>
          </Link>

          <Menu isOpen={isReservasMenuOpen}>
            <MenuButton
              as={Button}
              leftIcon={<FaBed />}
              onMouseEnter={onReservasMenuOpen}
              onMouseLeave={onReservasMenuClose}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="24px"
              fontWeight="700"
              textDecoration="none"
              color="#000000"
              display="flex"
              alignItems="center"
            >
              <Text>Reservas</Text>
            </MenuButton>
            <MenuList
              onMouseEnter={onReservasMenuOpen}
              onMouseLeave={onReservasMenuClose}
            >
              <MenuItem as={RouterLink} to="/reservas/element1">
                Element 1
              </MenuItem>
              <MenuItem as={RouterLink} to="/reservas/element2">
                Element 2
              </MenuItem>
              <MenuItem as={RouterLink} to="/reservas/element3">
                Element 3
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu isOpen={isPerfilMenuOpen}>
            <MenuButton
              as={Button}
              leftIcon={<FaUser />}
              onMouseEnter={onPerfilMenuOpen}
              onMouseLeave={onPerfilMenuClose}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="24px"
              fontWeight="700"
              textDecoration="none"
              color="#000000"
              display="flex"
              alignItems="center"
            >
              <Text>Perfil</Text>
            </MenuButton>
            <MenuList
              onMouseEnter={onPerfilMenuOpen}
              onMouseLeave={onPerfilMenuClose}
            >
              <MenuItem as={RouterLink} to="/perfil/meu-perfil">
                Meu Perfil
              </MenuItem>
              <MenuItem as={RouterLink} to="/client/login">
                Sou Cliente
              </MenuItem>
              <MenuItem as={RouterLink} to="/perfil/sou-hoteleiro">
                Sou Hoteleiro
              </MenuItem>
              <MenuItem as={RouterLink} to="/perfil/pagamento">
                Pagamento
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<FaBars />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Link
              as={RouterLink}
              to="/"
              display="flex"
              alignItems="center"
              textDecoration="none"
              color="#000000"
              fontSize="24px"
              mb={4}
              onClick={onClose}
            >
              <FaSpider style={{ marginRight: "6px" }} />
              <Text>Início</Text>
            </Link>

            <Box mb={4}>
              <Text fontSize="24px" fontWeight="700" color="#000000" mb={2}>
                <FaBed style={{ marginRight: "6px", display: "inline" }} />
                Reservas
              </Text>
              <Box pl={6}>
                <Link
                  as={RouterLink}
                  to="/reservas/element1"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Elemento 1
                </Link>
                <Link
                  as={RouterLink}
                  to="/reservas/element2"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Elemento 2
                </Link>
                <Link
                  as={RouterLink}
                  to="/reservas/element3"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Elemento 3
                </Link>
              </Box>
            </Box>

            <Box mb={4}>
              <Text fontSize="24px" fontWeight="700" color="#000000" mb={2}>
                <FaUser style={{ marginRight: "6px", display: "inline" }} />
                Perfil
              </Text>
              <Box pl={6}>
                <Link
                  as={RouterLink}
                  to="/perfil/meu-perfil"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Meu Perfil
                </Link>
                <Link
                  as={RouterLink}
                  to="/client/login"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Sou Cliente
                </Link>
                <Link
                  as={RouterLink}
                  to="/perfil/sou-hoteleiro"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Sou Hoteleiro
                </Link>
                <Link
                  as={RouterLink}
                  to="/perfil/pagamento"
                  display="block"
                  textDecoration="none"
                  color="#000000"
                  fontSize="20px"
                  mb={2}
                  onClick={onClose}
                >
                  Pagamento
                </Link>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
