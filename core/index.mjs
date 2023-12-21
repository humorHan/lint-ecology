#!/usr/bin/env node

import ora from "ora";
import { program } from "commander";
import fs from "fs";
import copyConfigFile from "./copy-config-file.mjs";
import mergePackageJson from "./merge-package-json.mjs";
import installPackage from "./install-package.mjs";

const packageInfo = JSON.parse(
  fs.readFileSync(process.cwd() + "/package.json", "utf-8")
);

// 版本号
program.version(packageInfo.version);

// 本地开发
program
  .command("init")
  .description("接入lint生态")
  .action(() => {
    init();
  });

async function init() {
  const spinner = ora("");

  // ① 拷贝配置文件
  await copyConfigFile(spinner);

  // ② 合并package.json
  await mergePackageJson(spinner);

  // ③ 安装依赖
  await installPackage(spinner);

  spinner.succeed("初始化成功");
}

program.parse(process.argv);
