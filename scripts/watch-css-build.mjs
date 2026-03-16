import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const target = path.join(root, "src", "styles.css");

let timer = null;
let building = false;

function runBuild() {
  if (building) return;
  building = true;

  console.log("[watch-css] Detected change. Running npm run build...");

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(npmCmd, ["run", "build"], {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });

  child.on("close", (code) => {
    building = false;
    console.log(
      code === 0
        ? "[watch-css] Build completed successfully."
        : `[watch-css] Build failed with exit code ${code}.`
    );
  });
}

if (!fs.existsSync(target)) {
  console.error(`[watch-css] File not found: ${target}`);
  process.exit(1);
}

console.log(`[watch-css] Watching ${target}`);
console.log("[watch-css] Press Ctrl+C to stop.");

fs.watch(target, { persistent: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(runBuild, 120);
});

