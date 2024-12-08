const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const mapped = data.replace(/\r/g, "")
                             .split("\n")
                             .filter(x => x !== "")
                             .map(x => x.split(""));

    let xDirection = 0;
    let yDirection = -1;
    const areasVisited = mapped.map(x => x.map(() => false));
    let y = mapped.findIndex(x => x.includes("^"));
    let x = mapped[y].indexOf("^");

    while (x >= 0 && x < mapped[0].length && y >= 0 && y < mapped.length) {
        areasVisited[y][x] = true;

        const movedX = x + xDirection;
        const movedY = y + yDirection;

        if (movedX < 0 || movedX >= mapped[0].length ||
            movedY < 0 || movedY >= mapped.length) break;

        if (mapped[movedY][movedX] === "#") {
            if (xDirection === 0 && yDirection === -1) {
                xDirection = 1;
                yDirection = 0;
            } else if (xDirection === 1 && yDirection === 0) {
                xDirection = 0;
                yDirection = 1;
            } else if (xDirection === 0 && yDirection === 1) {
                xDirection = -1;
                yDirection = 0;
            } else if (xDirection === -1 && yDirection === 0) {
                xDirection = 0;
                yDirection = -1;
            }
        } else {
            x = movedX;
            y = movedY;
        }
    }

    return areasVisited.flat().filter(x => x).length;

}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log(result);