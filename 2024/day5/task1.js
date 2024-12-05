const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8").replace(/\r/g, "")
                                                    .split("\n\n");

    const rulesList = data[0].split("\n")
                                   .filter(x => x !== "")
                                   .map(x => x.split("|")
                                   .map(Number));

    const pageList = data[1].split("\n")
                                  .filter(x => x !== "")
                                  .map(x => x.split(",").map(Number));

    const rules = {};

    for (const rule of rulesList) {
        if (typeof rules[rule[0]] == "undefined") rules[rule[0]] = [];
        rules[rule[0]].push(rule[1]);
    }

    const correctPages = [];
    for (let i = 0; i < pageList.length; i++) {
        const pages = pageList[i];
        let correct = true;
        for (let j = 0; j < pages.length; j++) {
            const page = pages[j];
            const pagesAfter = pages.slice(j + 1);

            if (!rules[page]) continue;
            for (const rule of rules[page]) {
                if (pages.includes(rule) && !pagesAfter.includes(rule)) {
                    correct = false;
                    break;
                }
            }

            if (!correct) break;
        }

        if (correct) correctPages.push(i);
    }

    return correctPages.reduce((a, x) => a + pageList[x][pageList[x].length / 2 - 0.5], 0);
}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log(result);