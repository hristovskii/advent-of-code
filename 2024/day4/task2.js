const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const lines = data.replace(/\r/g, "")
        .split("\n")
        .filter(x => x !== "")
        .map(x => x.split(""));

    let counter = 0;
    for (let y = 1; y < lines.length - 1; y++) {
        for (let x = 1; x < lines[y].length - 1; x++) {

            if (lines[y][x] !== "A") continue;

            if (lines[y - 1][x - 1] === "M" && lines[y + 1][x + 1] === "S") {
                if (lines[y + 1][x - 1] === "M" &&
                    lines[y - 1][x + 1] === "S") counter++;

                if (lines[y - 1][x + 1] === "M" &&
                    lines[y + 1][x - 1] === "S") counter++;

                continue;
            }
            if (lines[y - 1][x + 1] === "M" && lines[y + 1][x - 1] === "S") {
                if (lines[y + 1][x + 1] === "M" &&
                    lines[y - 1][x - 1] === "S") counter++;

                if (lines[y - 1][x - 1] === "M" &&
                    lines[y + 1][x + 1] === "S") counter++;

                continue;
            }
            if (lines[y + 1][x - 1] === "M" && lines[y - 1][x + 1] === "S") {
                if (lines[y - 1][x - 1] === "M" &&
                    lines[y + 1][x + 1] === "S") counter++;

                if (lines[y + 1][x + 1] === "M" &&
                    lines[y - 1][x - 1] === "S") counter++;

                continue;
            }
            if (lines[y + 1][x + 1] === "M" && lines[y - 1][x - 1] === "S") {
                if (lines[y - 1][x + 1] === "M" &&
                    lines[y + 1][x - 1] === "S") counter++;

                if (lines[y + 1][x - 1] === "M" &&
                    lines[y - 1][x + 1] === "S") counter++;

                continue;
            }
        }
    }

    return counter;
}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);