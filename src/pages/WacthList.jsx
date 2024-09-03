import { useState, useEffect } from "react";
import { useFireStore } from "../services/firestore";
import { useAuth } from "../context/UseAuth";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchListCard";

export const WacthList = () => {
  const { getWatchList } = useFireStore();
  const { user } = useAuth();
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchList(user?.uid)
        .then((data) => {
          console.log(data);
          setWatchList(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchList]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          WatchList
        </Heading>
        {isLoading && (
          <Flex justify={"center"} mt={"10"}>
            <Spinner size={"xl"} color="red" />
          </Flex>
        )}
        {!isLoading && watchList?.length === 0 && (
          <Flex justify={"center"} mt={"10"}>
            <Heading as={"h2"} fontSize={"medium"} textTransform={"uppercase"}>
              No item watchlist
            </Heading>
          </Flex>
        )}
      </Flex>

      {!isLoading && watchList?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"4"}
        >
          {watchList?.map((item) => (
            <WatchlistCard key={item?.id} item={item} type={item?.type} setWatchList={setWatchList} />
          ))}
        </Grid>
      )}
    </Container>
  );
};
