import { takeLatest, call, put, all } from "redux-saga/effects";
//put = dispatch
//call takes two kind of parameters. first one will be a function and followings will be the parameters of the functions
import ShopActionTypes from "./shop.types";

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export function* fetchCollectionsAsync() {
  //we will try to write our fetchCollectionsAsync method's body in a yielding pattern
  try {
    const collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function*  shopSagas(){
  yield all([call(fetchCollectionsStart)])
}
