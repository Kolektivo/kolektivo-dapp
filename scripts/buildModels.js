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
const destPath = "./src/models"; //where all the model files will go
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
                const filePath = destPath + "/" + fileName + ".json"; // path to the temp json file
                fs.writeJSONSync(filePath, abi); // create the new json file
                exec(`npx abi-types-generator '${filePath}' --output='${destPath}' --name=${fileName} --provider=ethers_v5`, ()=> { // create the model file from the json file
                    fs.unlinkSync(filePath); //delete the source json file afterwards
                    const tsFile = destPath + "/" + fileName + ".ts";
                    fs.readFile(tsFile, 'utf8', (err, data)=>{
                        if(err) return console.log(err);
                        var result = data.replace(/export type ContractContext/g, `export type ${fileName}ContractContext`); // rename the parent type to have the file name in it
                        result = '/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-interface */\r\n' + result; //add eslint-disable @typescript-eslint/naming-convention to the top of the file so interfaces don't have to begin with I
                        result = result.replace(/erc721Id: Erc721IdRequest;/g, ''); // remove this line because the generator doesn't have the Erc721IdRequest type
                        fs.writeFile(tsFile, result, 'utf8', (err)=>{
                            if(err) return console.log(err);
                        });
                        exec(`npx eslint --fix "${tsFile}"`)
                    })
                }); 
            }
        });
    }
});




