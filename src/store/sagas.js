import * as authSagas from "./auth/sagas";
import * as moviesSagas from "./movies/sagas";

const sagas = {
  ...authSagas,
  ...moviesSagas,
};

export default sagas;
