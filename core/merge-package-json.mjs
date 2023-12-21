import fs from "fs";
import path from "path";
import { tryCatch } from "./utils/index.mjs";

export default async function mergePackageJson(spinner) {
  return await tryCatch(
    async () => {
      const cwd = process.cwd();
      const packageConfigPath = path.join(
        cwd,
        "template",
        "package",
        "package.json"
      );
      const packageConfig = JSON.parse(
        fs.readFileSync(packageConfigPath, "utf-8")
      );
      const projectPackageJson = JSON.parse(
        fs.readFileSync(`${cwd}/package.json`, "utf8")
      );
      let { scripts, devDependencies } = projectPackageJson || {};
      let lintStaged = (projectPackageJson || {})["lint-staged"];

      // 初始化配置
      ["scripts", "lint-staged", "devDependencies"].forEach((key) => {
        const item = projectPackageJson[key];
        if (!item || !Object.keys(item).length) {
          projectPackageJson[key] = {};
        }
      });
      // 合并scripts
      projectPackageJson.scripts = { ...scripts, ...packageConfig.scripts };
      // 合并lintStaged
      projectPackageJson["lint-staged"] = {
        ...lintStaged,
        ...packageConfig["lint-staged"],
      };
      // 合并devDependencies
      projectPackageJson.devDependencies = {
        ...devDependencies,
        ...packageConfig.devDependencies,
      };

      // 写入文件
      fs.writeFileSync(
        `${cwd}/package.json`,
        JSON.stringify(projectPackageJson, null, 2)
      );
    },
    () => {
      spinner.text = "合并package.json 出现未知异常";
      spinner.fail && spinner.fail();
    }
  );
}
