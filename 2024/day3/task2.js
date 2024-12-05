const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const mulRegex = /mul\((\d+),(\d+)\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    let isEnabled = true;
    let total = 0;

    const instructionRegex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    let match;

    while ((match = instructionRegex.exec(data)) !== null) {
        if (match[0] === "do()") {
            isEnabled = true;
        } else if (match[0] === "don't()") {
            isEnabled = false;
        } else if (match[1] && match[2] && isEnabled) {
            const num1 = parseInt(match[1], 10);
            const num2 = parseInt(match[2], 10);
            total += num1 * num2;
        }
    }

    return total;

}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);