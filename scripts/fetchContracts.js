const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const { exit } = require('process');
let destPath = './src/contracts/';

const params = process.argv.slice(2);
destPath += params[0];
let srcPath = '';
switch (params[0]) {
  case 'monetary':
    srcPath = '../kolektivo-monetary-contracts/exports';
    break;
  case 'governance':
    srcPath = '../kolektivo-governance-contracts/exports';
    break;
  case 'map':
    srcPath = '../kolektivo-map-contracts/exports';
    break;
}

if (!fs.existsSync(srcPath)) {
  console.error(`${srcPath} does not exist`);
  exit(1);
}

fs.ensureDirSync(destPath);
fs.emptyDirSync(destPath);

const files = glob.sync(srcPath + '/**/*.json');
files.forEach((file) => {
  fs.copySync(file, `${destPath}/${path.basename(file)}`, {
    preserveTimestamps: true,
  });
});

exit(0);
