import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";

const CardComponents = ({ item , type}) => {
  return (
    <Link to={`/${type}/${item.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          pos={""}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"}>{item?.title || item?.name}</Text>
          <Text textAlign={"center"} fontSize={"x-small"} color={"green.600"}>
            {" "}
            {new Date(
              item?.first_air_date || item?.release_date
            ).getFullYear() || "N/A"}{" "}
          </Text>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={"2"}
            mt={"4"}
          >
            <StarIcon fontSize={"small"}/>
            <Text>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponents;
