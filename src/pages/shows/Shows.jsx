import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchShows } from "../../services/api";
import CardComponents from "../../components/CardComponents";
import PaginationComponent from "../../components/PaginationComponent";

const Shows = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    fetchShows(sortBy, activePage)
      .then((res) => {
        setData(res?.results);
        setTotalPages(res?.total_pages)
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy, activePage]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"} mb={"4"}>
          Discover Tv Shows
        </Heading>
        <Select
          w={"130"}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
        </Select>
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
              <CardComponents key={item?.id} item={item} type={"tv"} />
            )
          )}
      </Grid>
      <PaginationComponent 
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Shows;
