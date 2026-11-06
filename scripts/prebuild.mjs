import fs from "fs";
import path from "path";

const pub = path.resolve("public");
for (const item of ["index.html", "404.html", "index.txt", "sitemap.xml", "_next"]) {
  const target = path.join(pub, item);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}
