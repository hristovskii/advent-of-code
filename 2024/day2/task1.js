const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const reports = data.trim()
                                    .split('\n')
                                    .map(line => line.split(' ')
                                        .map(Number));

    let counter = 0;

    for (const report of reports) {
        let isIncreasing = true;
        let isDecreasing = true;

        for (let i = 0; i < report.length; i++) {
            const diffrence = report[i] - report[i - 1];

            if (Math.abs(diffrence) < 1 || Math.abs(diffrence) > 3) {
                isIncreasing = false;
                isDecreasing = false;
                break;
            }

            if (diffrence < 0) isIncreasing = false;
            if (diffrence > 0) isDecreasing = false;
        }

        if (isIncreasing || isDecreasing) counter++;

    }

    return counter;

}

const inputFile = "input.txt";
const result = calculatePuzzle(inputFile);
console.log(result);