import { takeLatest, call, put } from "redux-saga/effects";
import {
  getActiveUser,
  login,
  logout,
  register,
  setActiveUser,
  setToken,
} from "./slice";
import authService from "../../services/AuthService";

function* registerHandler(action) {
  try {
    const data = yield call(authService.register, action.payload.userData);
    // yield put(setToken(data));
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* loginHandler(action) {
  try {
    const data = yield call(authService.login, action.payload);
    yield put(setToken(data.access));
  } catch (error) {
    console.log(error);
  }
}

function* logoutHandler() {
  try {
    // yield call(authService.logout);
    localStorage.removeItem("token");

    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {
    console.log(error);
  }
}

function* getActiveUserHandler() {
  try {
    const activeUser = yield call(authService.getActiveUser);
    yield put(setActiveUser(activeUser));
  } catch (error) {
    console.log(error);
  }
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}
export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}
export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}
export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}
