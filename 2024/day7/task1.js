const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const lines = data.replace(/\r/g, "")
                                 .split("\n")
                                 .filter(x => x !== "");

    const targetSums = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const targetSum = parseInt(line.split(":")[0]);
        const numbers = line.split(": ")[1].split(" ").map(Number);

        for (let j = 0; j < 2 ** (numbers.length - 1); j++) {
            const operations = j.toString(2)
                                      .padStart(numbers.length - 1, "0")
                                      .replace(/0/g, "+")
                                      .replace(/1/g, "*");

            const parts = numbers.map((x, k) =>
                                        x + (k < operations.length ? " " + operations[k] + " " : ""))
                                        .join("")
                                        .split(" ");

            let result = parseInt(parts[0]);
            for (let i = 1; i < parts.length; i += 2) {
                if (parts[i] === "+") result += parseInt(parts[i + 1]);
                else if (parts[i] === "*") result *= parseInt(parts[i + 1]);
            }
            if (result === targetSum) {
                targetSums.push(targetSum);
                break;
            }
        }
    }

    return targetSums.reduce((a, x) => a + x, 0);

}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log(result);