import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, signInWithGoogle, logOut } = useAuth();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              NETLEX
            </Box>
          </Link>

          {/* desktop */}
          <Flex gap={"4"} alignItems={"center"} display={{base:"none", md:"flex"}}>
            <Link to="/">Home</Link>
            <Link to="/shows">Tv Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/search"><SearchIcon fontSize={"xl"} /></Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    size={"sm"}
                    color={"white"}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>WatchList</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}

            {!user && (
              <Avatar
                size={"sm"}
                bg={"red.500"}
                as="button"
                color={"gray.500"}
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
