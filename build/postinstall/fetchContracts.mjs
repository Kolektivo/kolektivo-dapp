import { exec as ogExec } from 'child_process';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import util from 'util';

export default async (name) => {
  const exec = util.promisify(ogExec);
  try {
    const destPath = `src/contracts/${name}`;
    let srcPath = '';

    switch (name) {
      case 'monetary':
        srcPath = 'node_modules/kolektivo-monetary-contracts';
        const { stdout } = await exec(
          `git clone --depth 1 https://github.com/Kolektivo/kolektivo-monetary-contracts.git --single-branch --branch ${process.env.NODE_ENV === 'production' ? 'main' : 'development'} ${srcPath}`,
        );
        console.log(stdout);
        break;
      case 'governance':
        srcPath = 'node_modules/kolektivo-governance-contracts';
        const { stdout1 } = await exec(`git clone --depth 1 https://github.com/Kolektivo/kolektivo-governance-contracts.git ${srcPath}`);
        console.log(stdout1);
        break;
      case 'map':
        srcPath = 'node_modules/kolektivo-map-contracts';
        const { stdout2 } = await exec(`git clone --depth 1 https://github.com/Kolektivo/kolektivo-map-contracts.git ${srcPath}`);
        console.log(stdout2);
        break;
    }

    await fs.ensureDir(destPath);
    await fs.emptyDir(destPath);
    const files = glob.sync(`${srcPath}/exports/**/*.json`);
    await Promise.all(files.map((file) => fs.copy(file, `${destPath}/${path.basename(file)}`)));
    await fs.emptyDir(srcPath);
    await fs.rmdir(srcPath);
  } catch (e) {
    console.error(e);
  }
};
