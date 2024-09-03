import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  fetchDetails,
  imagePath,
  imagePathOriginal,
  fetchCredits,
  fecthTrailer,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesToHour,
  ratingToPercentage,
  resolveRatingColor,
} from "../Utils/Helpers";
import VideoComponent from "../components/VideoComponent";
import { useAuth } from "../context/UseAuth";
import { useFireStore } from "../services/firestore";

const DetailsPage = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setvideos] = useState([]);
  const router = useParams();
  const average = ratingToPercentage(details?.vote_average?.toFixed(1));
  const { type, id } = router;
  const { user } = useAuth();
  const toast = useToast();
  const { addToWatchList, checkIfInWacthList, removeFromWatchList } =
    useFireStore();
  const [isInWatchList, setIsInWatchList] = useState(false);

  const handleSaveToWacthList = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };
    // addDocument("watchlist", data);
    const dataId = details?.id.toString();
    await addToWatchList(user?.uid, dataId, data);
    const isSetToWacthList = await checkIfInWacthList(user?.uid, data?.id);
    setIsInWatchList(isSetToWacthList);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchList(false);
      return;
    }
    checkIfInWacthList(user?.uid, id).then((data) => {
      setIsInWatchList(data);
    });
  }, [id, user, checkIfInWacthList]);

  const handleRemoveFromWatchList = async () => {
    await removeFromWatchList(user?.uid, id);
    const isSetToWacthList = await checkIfInWacthList(user?.uid, id);
    setIsInWatchList(isSetToWacthList);
  };
  // proper way to handle multiple api calls and promise
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fecthTrailer(type, id),
        ]);
        // set details
        setDetails(detailsData);

        // set cast
        setCast(creditsData?.cast?.slice(0, 10));

        // set trailer video
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);

        // set other videos
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setvideos(videos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <Flex justify={"Center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }
  // for tv shows or movie
  const title = details?.name || details?.title;
  const date = details?.release_date || details?.first_air_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(100, 100, 100, .89), rgba(100, 100, 100, .89)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        p={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={"3xl"} color={"blackAlpha.900"}>
                {title}{" "}
                <Text
                  as={"span"}
                  fontSize={"2xl"}
                  fontWeight={"normal"}
                  color={"blackAlpha.900"}
                >
                  {new Date(date).getFullYear()}
                </Text>
              </Heading>
              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"blackAlpha.600"} />
                  <Text fontSize={"sm"} color={"blackAlpha.700"}>
                    {new Date(date).toLocaleDateString("en-US")}
                  </Text>
                </Flex>
                {type === "movie" && (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr={"2"} color={"gray.400"} />
                      <Text fontSize={"16px"}>
                        {" "}
                        {minutesToHour(details?.runtime)}{" "}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>

              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={average}
                  bg={"gray.600"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average?.toFixed(1))}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"} color={"gray.100"}>
                    {average}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text
                  display={{ base: "none", md: "initial" }}
                  color={"blackAlpha.900"}
                  fontSize={"22px"}
                  fontWeight={"30px"}
                >
                  User Score
                </Text>
                {isInWatchList ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="gray.700"
                    variant={"outline"}
                    onClick={handleRemoveFromWatchList}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    variant={"outline"}
                    onClick={handleSaveToWacthList}
                  >
                    Add to watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"} lineHeight={"25px"}>
                {details?.overview}
              </Text>
              <Flex mt={"6"} gap={"2"}>
                {details?.genres.map((genre) => (
                  <Badge bgColor={"gray.400"} p={"1"} key={genre?.id}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb={"10"}>
        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
        >
          Cast
        </Heading>
        <Flex mt={"5"} mb={"10"} overflowX={"scroll"} gap={"5"}>
          {cast?.length === 0 && <Text>No cast found</Text>}
          {cast &&
            cast?.map((item) => (
              <Box key={item?.id} minW={"150px"}>
                <Image
                  src={`${imagePath}/${item?.profile_path}`}
                  w={"100%"}
                  borderRadius={"4px"}
                  h={"225px"}
                  objectFit={"cover"}
                />
              </Box>
            ))}
        </Flex>

        <Heading
          as={"h2"}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
          fontSize={"md"}
        >
          Video
        </Heading>
        <VideoComponent id={video?.key} />
        <Flex mt={"5"} mb={"10"} overflowX={"scroll"} gap={"5"}>
          {videos &&
            videos?.map((items) => (
              <Box key={items?.id} minWidth={"290px"}>
                <VideoComponent id={items?.key} small />
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  mt={"2"}
                  noOfLines={2}
                >
                  {items?.name}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
