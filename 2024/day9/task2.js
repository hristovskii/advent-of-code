const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const mapInput = data.replace(/\r/g, "")
        .split("\n")[0].split("");
    const map = [];


    let id = 0;
    for (let i = 0; i < mapInput.length; i++) {
        map.push([]);
        for (let j = 0; j < parseInt(mapInput[i]); j++) {
            map[map.length - 1].push(i % 2 === 0 ? id : null);
        }
        if (i % 2 === 0) id++;
    }

    const newMap = map.flat();
    for (let i = map.length - 1; i >= 0; i--) {
        if (map[i].every(x => x == null)) continue;

        const mapIndex = newMap.indexOf(map[i][0]);
        const firstNull = newMap.findIndex((x, j) => x == null && j < mapIndex && newMap.slice(j, j + map[i].length).every(x => x == null));
        if (firstNull === -1) continue;
        if (!newMap.slice(firstNull, firstNull + map[i].length).every(x => x == null)) continue;

        newMap.splice(firstNull, map[i].length, ...map[i]);
        newMap.splice(mapIndex, map[i].length, ...Array(map[i].length).fill(null));
    }

    return newMap.reduce((a, x, i) => a + (x == null ? 0 : i * x), 0);
}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log("\n" + result);