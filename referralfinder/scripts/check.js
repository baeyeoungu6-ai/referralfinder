const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const required = [
  "index.html",
  "link-checker/index.html",
  "countries/south-korea/index.html",
  "countries/india/index.html",
  "countries/pakistan/index.html",
  "countries/bangladesh/index.html",
  "countries/ethiopia/index.html",
  "countries/united-arab-emirates/index.html",
  "countries/saudi-arabia/index.html",
  "sitemap.xml",
  "robots.txt"
];

let failed = false;
for (const file of required) {
  const fullPath = path.join(publicDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing ${file}`);
    failed = true;
    continue;
  }

  if (file.endsWith(".html")) {
    const html = fs.readFileSync(fullPath, "utf8");
    for (const token of ["<title>", "meta name=\"description\"", "canonical"]) {
      if (!html.includes(token)) {
        console.error(`${file} is missing ${token}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("Static SEO checks passed.");
