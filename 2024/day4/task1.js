const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const lines = data.replace(/\r/g, "")
                            .split("\n")
                            .filter(x => x !== "")
                            .map(x => x.split(""));

    let counter = 0;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] !== "X") continue;

            if (y > 2) {
                if (lines[y - 1][x - 1] === "M" &&
                    lines[y - 2][x - 2] === "A" &&
                    lines[y - 3][x - 3] === "S") counter++;

                if (lines[y - 1][x] === "M" &&
                    lines[y - 2][x] === "A" &&
                    lines[y - 3][x] === "S") counter++;

                if (lines[y - 1][x + 1] === "M" &&
                    lines[y - 2][x + 2] === "A" &&
                    lines[y - 3][x + 3] === "S") counter++;
            }

            if (lines[y][x - 1] === "M" &&
                lines[y][x - 2] === "A" &&
                lines[y][x - 3] === "S") counter++;

            if (lines[y][x + 1] === "M" &&
                lines[y][x + 2] === "A" &&
                lines[y][x + 3] === "S") counter++;

            if (y < lines.length - 3) {
                if (lines[y + 1][x - 1] === "M" &&
                    lines[y + 2][x - 2] === "A" &&
                    lines[y + 3][x - 3] === "S") counter++;

                if (lines[y + 1][x] === "M" &&
                    lines[y + 2][x] === "A" &&
                    lines[y + 3][x] === "S") counter++;

                if (lines[y + 1][x + 1] === "M" &&
                    lines[y + 2][x + 2] === "A" &&
                    lines[y + 3][x + 3] === "S") counter++;
            }
        }
    }
    return counter;
}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);