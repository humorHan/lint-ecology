import fs from "fs";
import path from "path";

import { tryCatch } from "./utils/index.mjs";

export default async function copyConfigFile(spinner) {
  return await tryCatch(
    () => {
      spinner.text = "ling-ecology is initializing...";
      spinner.start();
      const dirs = fs.readdirSync("./template");
      dirs.forEach((dirName) => {
        fs.cpSync(path.join("./template", dirName), process.cwd(), {
          filter: (src) => {
            return !src.startsWith("template/package");
          },
          recursive: true,
        });
      });
    },
    () => {
      spinner.text = "拷贝配置文件出现未知异常";
      spinner.fail && spinner.fail();
    }
  );
}
