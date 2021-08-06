// ES6 version using asynchronous iterators, compatible with node v10.0+

const fs = require("fs");
// from https://gist.github.com/lovasoa/8691344
const path = require("path");

async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}

// Then, use it with a simple async for loop
async function main(dirPath) {
    for await (const p of walk(dirPath))
        console.log(p)
}

main('static');