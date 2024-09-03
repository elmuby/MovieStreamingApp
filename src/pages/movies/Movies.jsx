import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { fetchMovies } from "../../services/api";
import { useEffect, useState } from "react";
import CardComponents from "../../components/CardComponents";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        console.log(res);
        setdata(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
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
            isLoading ? (
              <Skeleton key={i} height={"300"} />
            ) : (
              <CardComponents key={item?.id} item={item} type={"movie"} />
            )
          )}
      </Grid>
      {/* pagination */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
