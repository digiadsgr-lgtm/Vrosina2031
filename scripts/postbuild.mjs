import fs from "fs";
import path from "path";

const outDir = path.resolve("out");
const pubDir = path.resolve("public");

const syncItems = [
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

const subRoutes = [
  "stratopedo-vrosinas",
  "ependyseis-epidotiseis",
  "gefyri-vrosinas-raidiotissa",
  "katoikia-neoi-paragogoi",
  "ai-knowledge-base",
];

if (fs.existsSync(outDir)) {
  for (const item of syncItems) {
    const src = path.join(outDir, item);
    const dest = path.join(pubDir, item);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`Synced ${item} -> public/${item}`);
    }
  }

  for (const route of subRoutes) {
    const htmlSrc = path.join(outDir, `${route}.html`);
    if (fs.existsSync(htmlSrc)) {
      const routeDir = path.join(pubDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.cpSync(htmlSrc, path.join(routeDir, "index.html"), { force: true });
      console.log(`Synced ${route}.html -> public/${route}/index.html`);
    }
  }
}
