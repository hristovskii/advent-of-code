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
                                  .map(x => x.split(",")
                                  .map(Number));

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

    function sortPages(pages) {
        for (let i = 0; i < pages.length; i++) {
            if (!rules[pages[i]]) continue;
            for (const rule of rules[pages[i]]) {
                if (pages.includes(rule) && !pages.slice(i + 1).includes(rule)) {
                    if (!rules[rule]) {
                        const removed = pages.splice(pages.indexOf(rule), 1);
                        pages.push(removed[0]);
                        continue;
                    }

                    const filteredRules = rules[rule].filter(x => pages.includes(x));
                    if (filteredRules.length === 0) {
                        const removed = pages.splice(pages.indexOf(rule), 1);
                        pages.push(removed[0]);
                        continue;
                    }

                    let foundRules = 0;
                    for (let j = pages.length - 1; j > 0; j--) {
                        if (filteredRules.includes(pages[j])) {
                            foundRules++;
                            if (foundRules === filteredRules.length) {
                                const removed = pages.splice(pages.indexOf(rule), 1);
                                pages.splice(j - 1, 0, removed[0]);
                                break;
                            }
                        }
                    }
                }
            }
        }

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

        if (!correct) sortPages(pages);
    }

    const incorrectPages = pageList.filter((_, i) => !correctPages.includes(i));
    for (const pages of incorrectPages) {
        sortPages(pages);
    }

    return incorrectPages.reduce((a, x) => a + x[x.length / 2 - 0.5], 0);
}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log(result);