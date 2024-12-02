const fs = require("fs");

function calculateSimilarityScore(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");
    const lines = data.trim().split("\n");
    const leftList = [];
    const rightList = [];

    for (const line of lines) {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);


    let similarityScore = 0;
    for (let i = 0; i < leftList.length; i++) {
        let number = leftList[i];
        let count = rightList.filter(num => num === number).length;
        similarityScore += number * count;
    }

    return similarityScore;

}

const inputFile = "input.txt";
const result = calculateSimilarityScore(inputFile);
console.log(result);
