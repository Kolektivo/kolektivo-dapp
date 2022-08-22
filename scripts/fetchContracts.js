const fs = require('fs-extra');
const glob = require("glob");
const path = require("path")
const { exit } = require("process");
const srcPath = "../kolektivo-monetary-contracts/exports";
const destPath = "./src/contracts";

if (!fs.existsSync(srcPath)) {
  console.error(`${srcPath} does not exist`);
  exit(1);
}

fs.ensureDirSync(destPath);
fs.emptyDirSync(destPath);

const files = glob.sync(srcPath + "/**/*.json");
files.forEach(file => {
  if (file === 'mainnet') {
    file = 'Celo';
  }
  fs.copySync(file, `${destPath}/${path.basename(file)}`,
    {
      preserveTimestamps: true
    });
});

exit(0);
