import buildModels from "./buildModels.mjs";
import fetchContracts from "./fetchContracts.mjs";
import pullTokenLists from "./pullTokenLists.mjs";

console.log(process.env);

await Promise.all([
// fetchContracts("map"),
fetchContracts("governance"),
fetchContracts("monetary")
])

await  Promise.all([
buildModels("celo-test", "map"),
buildModels("celo-test", "governance"),
buildModels("celo-test", "monetary"),
buildModels("celo", "map"),
buildModels("celo", "governance"),
buildModels("celo", "monetary")]);

await pullTokenLists();