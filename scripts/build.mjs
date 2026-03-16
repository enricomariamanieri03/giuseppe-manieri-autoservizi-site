import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const srcDir = path.join(root, "src");
const publicDir = path.join(root, "public");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function emptyDir(dir) {
  if (!(await exists(dir))) return;
  const entries = await fs.readdir(dir);
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry);
      const stat = await fs.lstat(fullPath);
      if (stat.isDirectory()) {
        await emptyDir(fullPath);
        await fs.rm(fullPath, { recursive: true, force: true });
      } else {
        await fs.unlink(fullPath);
      }
    })
  );
}

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(from, entry.name);
      const destPath = path.join(to, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    })
  );
}

if (!(await exists(srcDir))) {
  throw new Error("Missing src/ folder.");
}

await fs.mkdir(distDir, { recursive: true });
await emptyDir(distDir);

if (await exists(publicDir)) {
  await copyDir(publicDir, distDir);
}

await copyDir(srcDir, distDir);
