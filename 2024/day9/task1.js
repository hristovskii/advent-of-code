const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const mapInput = data.replace(/\r/g, "")
                                .split("\n")[0].split("");
    const map = [];

    let id = 0;
    for (let i = 0; i < mapInput.length; i++) {
        for (let j = 0; j < parseInt(mapInput[i]); j++) {
            map.push(i % 2 === 0 ? id : null);
        }
        if (i % 2 === 0) id++;
    }

    for (let i = map.length - 1; i >= 0; i--) {
        if (map[i] == null) continue;

        const firstNull = map.findIndex((x, j) => x == null && j < i);
        if (firstNull === -1) continue;

        map[firstNull] = map[i];
        map[i] = null;
    }

    return map.reduce((a, x, i) => a + (x == null ? 0 : i * x), 0);
}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log("\n" + result);