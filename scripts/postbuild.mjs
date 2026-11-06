import fs from "fs";
import path from "path";

const outDir = path.resolve("out");
const pubDir = path.resolve("public");

if (fs.existsSync(outDir)) {
  for (const item of ["index.html", "404.html", "index.txt", "sitemap.xml", "_next"]) {
    const src = path.join(outDir, item);
    const dest = path.join(pubDir, item);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`Synced ${item} -> public/${item}`);
    }
  }
}
