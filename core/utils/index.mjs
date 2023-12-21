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

export const getJsonObj = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
};
