import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useFireStore = () => {
  const toast = useToast();
  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };
  const addToWatchList = async (userId, dataId, data) => {
    try {
      if (await checkIfInWacthList(userId, dataId)) {
        toast({
          title: "Error",
          description: "This item is already in your wathclist",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success",
        description: "Added to wactchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error adding document");
      toast({
        title: "Error",
        description: "An error ocurred",
        status: "error",
        isClosable: true,
      });
    }
  };
  const checkIfInWacthList = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };
  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
      toast({
        title: "Success",
        description: "Removed from wactchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error While deleteing File");
      toast({
        title: "Error",
        description: "An error ocurred",
        status: "error",
        isClosable: true,
      });
    }
  };
  const getWatchList = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return data;
  }, []);

  return {
    addDocument,
    addToWatchList,
    checkIfInWacthList,
    removeFromWatchlist,
    getWatchList,
  };
};
