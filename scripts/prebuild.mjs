import fs from "fs";
import path from "path";

const pub = path.resolve("public");
const generatedItems = [
  "index.html",
  "404.html",
  "index.txt",
  "sitemap.xml",
  "_next",
  "stratopedo-vrosinas",
  "stratopedo-vrosinas.html",
  "stratopedo-vrosinas.txt",
  "ependyseis-epidotiseis",
  "ependyseis-epidotiseis.html",
  "ependyseis-epidotiseis.txt",
  "gefyri-vrosinas-raidiotissa",
  "gefyri-vrosinas-raidiotissa.html",
  "gefyri-vrosinas-raidiotissa.txt",
  "katoikia-neoi-paragogoi",
  "katoikia-neoi-paragogoi.html",
  "katoikia-neoi-paragogoi.txt",
  "ai-knowledge-base",
  "ai-knowledge-base.html",
  "ai-knowledge-base.txt",
];

for (const item of generatedItems) {
  const target = path.join(pub, item);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}
