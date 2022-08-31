/////////////////////////////////////////////////////////////////
//
//  This script is meant to look through all the contract json
//  files and find all the ABIs inside of them. With each abi, 
//  it generates a strongly typed .ts model representing the ABI
//
/////////////////////////////////////////////////////////////////

const fs = require('fs-extra');
const glob = require("glob");
const { exit } = require("process");
const contractPath = "./src/contracts"; //where all the contract json files are from the fetchContracts.js
let destPath = "./src/models/generated"; //where all the model files will go
const {exec} = require('child_process');

//make sure the contract path exists
if (!fs.existsSync(contractPath)) {
    console.error(`${contractPath} does not exist`);
    exit(1);
}

if(fs.existsSync(destPath)){
    //if destination path exists, delete the folder
    fs.removeSync(destPath);
}

//create the dest path
fs.mkdirSync(destPath);

//get all the .json files from the contract path
const files = glob.sync(contractPath + "/*.json");

//get params passed into the script
const params = process.argv.slice(2);

files.forEach(file => { //loop through each json file and process it
    if(params[0] === "alfajores" && file.indexOf("celo") > -1) return; //if "alfajores" is passed, don't look at the celo.json file
    if(params[0] === "celo" && file.indexOf("alfajores") > -1) return; //if "celo" is passed, don't look at the alfajores.json file
    const fileContents = fs.readJSONSync(file); //get file contents
    let contracts;
    //some json files don't have a "contracts" node
    if(fileContents.contracts){
        contracts = Object.entries(fileContents.contracts);
    }else{
        contracts = Object.entries(fileContents);
    }
    if(contracts){
        contracts.forEach(contract => {
            const contractName = Object.entries(contract)[0][1]; // get the contract name
            let abi;
            //accessing the abi is different depending on the file so get the abi
            if(fileContents.contracts){
                abi = fileContents.contracts[contractName].abi;
            }else{
                abi = fileContents[contractName];
            }
            if(typeof abi !== "string"){ //some abis are only a string that references another abi so those we don't want to generate
                const fileName = contractName.toLowerCase().replaceAll(" ", "-").replaceAll("#",""); // build the temp and final model file name
                const localDest = destPath + "/" + fileName;
                fs.mkdirSync(localDest);
                const filePath = localDest + "/" + fileName + ".json"; // path to the temp json file
                fs.writeJSONSync(filePath, abi); // create the new json file
                const typechain = `npx typechain --target ethers-v5 --out-dir ${localDest} '${filePath}'`;
                exec(typechain, (...args) => {
                    fs.unlinkSync(filePath); //delete the source json file afterwards
                }); 
            }
        });
    }
});




