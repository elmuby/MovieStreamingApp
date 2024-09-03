import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { searchData } from "../../services/api";
import CardComponents from "../../components/CardComponents";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res);
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };
  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Search Results
        </Heading>
      </Flex>
      <Form onSubmit={handleSearch}>
        <Input
          placeholder="Search Moveis, Tv Shows..."
          _placeholder={{ color: "gray.400" }}
          value={tempSearchValue}
          mb={"10"}
          onChange={(e) => {
            setTempSearchValue(e.target.value);
          }}
        />
      </Form>
      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as="H3" fontSize={"sm"} mt={"10"}>
          No results Found
        </Heading>
      )}

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
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, i) =>
            isLoading ? (
              <Skeleton key={i} height={"300"} />
            ) : (
              <CardComponents
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            )
          )}
      </Grid>
      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
