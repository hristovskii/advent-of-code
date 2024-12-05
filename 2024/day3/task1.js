const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const regex = /mul\((\d+),(\d+)\)/g;
    let match;
    let total = 0;

    while ((match = regex.exec(data)) !== null) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        total += num1 * num2;
    }

    return total;

}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);