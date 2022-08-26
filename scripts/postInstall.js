const fs = require('fs-extra');

const file = 'node_modules/ethereum-abi-types-generator/dist/converters/typescript/contexts/ethers-v5-contract-context.d.ts';
fs.readFile(file, 'utf8', (err, data)=>{
    if(err) return console.log(err);
    if(data.indexOf("queryFilter(") === -1){
        var result = data.replaceAll('removeListener(eventName: TEventType, listener: Listener): EthersContractContextV5<TMethods, TMethodNames, TEventsContext, TEventType>;', "removeListener(eventName: TEventType, listener: Listener): EthersContractContextV5<TMethods, TMethodNames, TEventsContext, TEventType>;\r\n\tqueryFilter(event: EventFilter | string, fromBlockOrBlockhash?: BlockTag | string, toBlock?: BlockTag): Promise<TEventType[]>;");
        fs.writeFile(file, result, 'utf8', (err)=>{
            if(err) return console.log(err);
        });
    }
})