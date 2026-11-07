import fs from "fs";
import path from "path";

const outDir = path.resolve("out");
const pubDir = path.resolve("public");

const subRoutes = [
  "to-schedio",
  "gia-ktinotrofous",
  "gia-epicheiriseis",
  "gia-ependytes",
  "gia-foreis",
  "poioi-eimaste",
  "stratopedo-vrosinas",
  "ependyseis-epidotiseis",
  "gefyri-vrosinas-raidiotissa",
  "katoikia-neoi-paragogoi",
  "ai-knowledge-base",
];

const syncItems = [
  "index.html",
  "404.html",
  "index.txt",
  "sitemap.xml",
  "_next",
  ...subRoutes.flatMap((r) => [r, `${r}.html`, `${r}.txt`]),
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
