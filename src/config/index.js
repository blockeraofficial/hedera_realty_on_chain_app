import { networkConfig } from "./networks";
import * as constants from "./constants";

// no type imports or exports in JS
// export * from "./type";  ← remove this line unless you really need to re-export runtime values

export const appConfig = {
  networks: networkConfig,
  constants,
};
