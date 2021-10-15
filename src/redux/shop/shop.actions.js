import { onSnapshot } from "@firebase/firestore";
import {
  dataFromSnapshot,
  getCollectionRef,
} from "../../firebase/firestoreService";
import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (error) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const fetchCollectionsStartAsync = () => {
  return async function (dispatch) {
    dispatch(fetchCollectionsStart());
    try {
      const collectionRef = await getCollectionRef("collections");
      onSnapshot(collectionRef, (snapshot) => {
        const collectionsMap = dataFromSnapshot(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      });
    } catch (error) {
      dispatch(fetchCollectionsFailure(error));
    }
  };
};
