/////////////////////////////////////////////////////////////////
//
//  This script is meant to look through all the contract json
//  files and find all the ABIs inside of them. With each abi,
//  it generates a strongly typed .ts model representing the ABI
//
/////////////////////////////////////////////////////////////////

import fs from "fs-extra";
import glob from "glob";
import { exec } from "child_process";
import { exec as ogExec } from "child_process";
import util from "util";

export default async (network, contractName) => {
const exec = util.promisify(ogExec);
const contractPath = `./src/contracts/${contractName}`;
  let destPath = `./src/models/generated/${contractName}`;

  //make sure the contract path exists
  if (! await fs.access(contractPath)) {
    console.error(`${contractPath} does not exist`);
    return;
  }

  if (await fs.access(destPath)) {
    //if destination path exists, delete the folder
    fs.remove(destPath);
  }

  //create the dest path
  await fs.mkdir(destPath);

  //get all the .json files from the contract path
  const files = glob.sync(contractPath + "/*.json");

 await Promise.all(files.map( async file => {
    const fileContents = await fs.readJSON(file); //get file contents
    let contracts;
    //some json files don't have a "contracts" node
    if (fileContents.contracts) {
      contracts = Object.entries(fileContents.contracts);
    } else {
      contracts = Object.entries(fileContents);
    }
    if (contracts) {
     await Promise.all(contracts.map(async contract => {
        const contractName = Object.entries(contract)[0][1]; // get the contract name
        let abi;
        //accessing the abi is different depending on the file so get the abi
        if (fileContents.contracts) {
          abi = fileContents.contracts[contractName].abi;
        } else {
          abi = fileContents[contractName];
        }
        if (typeof abi !== "string") {
          //some abis are only a string that references another abi so those we don't want to generate
          const fileName = contractName
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("#", ""); // build the temp and final model file name
          const localDest = destPath + "/" + fileName;
          fs.mkdirSync(localDest);
          const filePath = localDest + "/" + fileName + ".json"; // path to the temp json file
          fs.writeJSONSync(filePath, abi); // create the new json file
          const typechain = `npx typechain --target ethers-v5 --out-dir ${localDest} '${filePath}'`;
          await exec(typechain);
            try{
            fs.unlinkSync(filePath); //delete the source json file afterwards
            }catch{}
          
        }
      }));
    }
  }));
};
