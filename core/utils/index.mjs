import { fileURLToPath } from "url";
import path from "path";

export const tryCatch = (cb, errorCb) => {
  let res = undefined;
  try {
    res = cb();
  } catch (e) {
    errorCb(e);
    throw e;
  }
  return res;
};
