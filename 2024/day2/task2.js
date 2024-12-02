const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const reports = data.trim()
                              .split('\n')
                              .map(line => line.split(' ')
                                                      .map(Number));

    let counter = 0;

    for (const report of reports) {
        if (isSafe(report)) {
            counter++;
        } else {
            for (let i = 0; i < report.length; i++) {
                const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
                if (isSafe(modifiedReport)) {
                    counter++;
                    break;
                }
            }
        }
    }

    return counter;
}

function isSafe(report) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < report.length; i++) {
        const diffrence = report[i] - report[i - 1];

        if (Math.abs(diffrence) < 1 || Math.abs(diffrence) > 3) return false;


        if (diffrence < 0) isIncreasing = false;
        if (diffrence > 0) isDecreasing = false;
    }

    return isIncreasing || isDecreasing;

}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);