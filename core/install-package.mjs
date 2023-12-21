import { spawn } from "node:child_process";

export default async function installPackage(spinner) {
  const ls = spawn("yarn", [], {
    stdio: "inherit",
  });
}
