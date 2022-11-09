import fs from "fs-extra";

const tokenListUri =
  "https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json";

export default async name => {
  const results = await fetch(tokenListUri, {
    method: "GET",
    headers: { accept: "application/json" }
  }).then(async y => await y.json());

  fs.writeFile("src/tokenlist.json", JSON.stringify(results, null, 4));
};
