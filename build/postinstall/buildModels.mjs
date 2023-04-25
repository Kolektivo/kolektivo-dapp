/////////////////////////////////////////////////////////////////
//
//  This script is meant to look through all the contract json
//  files and find all the ABIs inside of them. With each abi,
//  it generates a strongly typed .ts model representing the ABI
//
/////////////////////////////////////////////////////////////////

import fs from 'fs';
import glob from 'glob';
import { exec } from 'child_process';
import { exec as ogExec } from 'child_process';
import util from 'util';

export default async (network, contractName) => {
  const exec = util.promisify(ogExec);
  const contractPath = `./src/contracts/${contractName}`;
  let destPath = `./src/models/generated/${contractName}`;
  try {
    fs.rmSync(destPath, { recursive: true, force: true });
    fs.mkdirSync(destPath, { force: true, recursive: true });
  } catch (e) {
    fs.mkdirSync(destPath, { force: true, recursive: true });
  }

  //get all the .json files from the contract path
  const files = [contractPath + `/${network}.json`, contractPath + '/sharedAbis.json'];

  await Promise.all(
    files.map(async (file) => {
      const fileContents = JSON.parse(fs.readFileSync(file.toString('utf8'))); //get file contents
      let contracts;
      //some json files don't have a "contracts" node
      if (fileContents.contracts) {
        contracts = Object.entries(fileContents.contracts);
      } else {
        contracts = Object.entries(fileContents);
      }

      if (contracts) {
        await Promise.all(
          contracts.map(async (contract) => {
            const contractName = Object.entries(contract)[0][1]; // get the contract name
            let abi;
            //accessing the abi is different depending on the file so get the abi
            if (fileContents.contracts) {
              abi = fileContents.contracts[contractName].abi;
            } else {
              abi = fileContents[contractName];
            }
            if (typeof abi !== 'string' && typeof abi !== 'undefined') {
              //some abis are only a string that references another abi so those we don't want to generate
              const fileName = contractName.toLowerCase().replaceAll(' ', '-').replaceAll('#', ''); // build the temp and final model file name
              if (!fileName) return;
              const localDest = destPath + '/' + fileName;
              fs.mkdirSync(localDest, { recursive: true });
              const filePath = localDest + '/' + fileName + '.json'; // path to the temp json file
              fs.writeFileSync(filePath, JSON.stringify(abi)); // create the new json file
              const typechain = `npx typechain --target ethers-v5 --out-dir ${localDest} '${filePath}'`;
              await exec(typechain);
              try {
                fs.rmSync(filePath, { force: true }); //delete the source json file afterwards
              } catch {}
            }
          }),
        );
      }
    }),
  );
};
