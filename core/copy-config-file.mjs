import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { tryCatch } from "./utils/index.mjs";

export default async function copyConfigFile(spinner) {
  return await tryCatch(
    () => {
      spinner.text = "ling-ecology is initializing...";
      spinner.start();

      const templateDirPath = path.join(
        fileURLToPath(import.meta.url),
        "../../",
        "template"
      );

      fs.readdirSync(templateDirPath).forEach((dirName) => {
        if (!fs.statSync(path.join(templateDirPath, dirName)).isDirectory()) {
          return;
        }
        fs.cpSync(path.join(templateDirPath, dirName), process.cwd(), {
          filter: (src) => {
            return !(
              src.endsWith("template/package") ||
              src.endsWith("template/package/package.json")
            );
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
