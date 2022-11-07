import buildModels from "./buildModels.js";
import fetchContracts from "./fetchContracts.js";
import pullTokenLists from "./pullTokenLists.js";

await Promise.all([
// fetchContracts("map"),
fetchContracts("governance"),
fetchContracts("monetary")
]);

buildModels("celo-test", "map");
buildModels("celo-test", "governance");
buildModels("celo-test", "monetary");
pullTokenLists();