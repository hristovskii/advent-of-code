const fs = require("fs");

function calculateTotalDistance(inputFile) {
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

    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

const inputFile = "input.txt";
const result = calculateTotalDistance(inputFile);
console.log( result);