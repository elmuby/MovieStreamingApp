import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fecthTrending } from "../services/api";
import CardComponents from "../components/CardComponents";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fecthTrending(timeWindow)
      .then((res) => {
        setData(res);
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>

        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px={"3"}
            py={"1"}
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.300" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px={"3"}
            py={"1"}
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.300" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      <Grid
        // responsiveness in chakra ui
        templateColumns={{
          base: "1fr", //for mobile
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {data &&
          data?.map((item, i) => 
            loading ? (
              <Skeleton key={i} height={"300"} />
            ) : (
              <CardComponents key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
