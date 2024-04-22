import { takeLatest, put, debounce, retry, spawn } from "redux-saga/effects";
import { searchSkills } from "../api/index";
import {
  searchSkillsRequest,
  changeSearchField,
  searchSkillsSuccess,
  searchSkillsFailure,
  clearListSkills,
} from "../reducer/skill";

function filterChangeSearchAction({ type }) {
  return type === changeSearchField().type;
}
// worker
function* handleChangeSearchSaga(action) {
  if (action.payload.search.trim() != "") {
    yield put(searchSkillsRequest(action.payload.search)); // dispatch({ type: '', payload: '' })
  } else {
    yield put(clearListSkills());
  }
}

// watcher
export function* watchChangeSearchSaga() {
  // @ts-expect-error
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1_000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload
    );
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

// watcher
function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest("").type, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}
