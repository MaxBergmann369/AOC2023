import {getLines} from "../readFile";

const lines: string[] = getLines("03/input.txt");

let numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

let sum: number = 0;

for(let i: number = 0; i < lines.length; i++) {
    for(let j: number = 0; j < lines[0].length; j++) {
        if(lines[i][j] === "*") {
            sum += getGearRatio([i , j], lines)
        }
    }
}

console.log(sum)

function getGearRatio(pos: number[], lines: string[]): number {
    let gearNumbers: number[][] = [[], [], []];
    pos = [pos[0] - 1, pos[1] - 1];

    if(isNumber(pos, lines)) {
        gearNumbers[0].push(getWholeNumber(pos, lines));
    }

    pos[1]++;
    if(isNumber(pos, lines)) {
        gearNumbers[0].push(getWholeNumber(pos, lines));
    }

    pos[1]++;
    if(isNumber(pos, lines)) {
        gearNumbers[0].push(getWholeNumber(pos, lines));
    }

    pos[0]++;
    if(isNumber(pos, lines)) {
        gearNumbers[1].push(getWholeNumber(pos, lines));
    }

    pos[0]++;
    if(isNumber(pos, lines)) {
        gearNumbers[2].push(getWholeNumber(pos, lines));
    }

    pos[1]--;
    if(isNumber(pos, lines)) {
        gearNumbers[2].push(getWholeNumber(pos, lines));
    }

    pos[1]--;
    if(isNumber(pos, lines)) {
        gearNumbers[2].push(getWholeNumber(pos, lines));
    }

    pos[0]--;
    if(isNumber(pos, lines)) {
        gearNumbers[1].push(getWholeNumber(pos, lines));
    }

    if(gearNumbers.length <= 1) {
        return 0;
    }

    let sum: number = 1;

    gearNumbers[0] = gearNumbers[0].filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    gearNumbers[1] = gearNumbers[1].filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    gearNumbers[2] = gearNumbers[2].filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    if(gearNumbers[0].length + gearNumbers[1].length + gearNumbers[2].length <= 1) {
        return 0;
    }

    for(let gearNum of gearNumbers) {

        for(let num of gearNum) {
            sum *= num;
        }
    }

    return sum;
}

function getWholeNumber(position: number[], lines: string[]): number {
    const pos: number[] = Array.from(position);

    while(numbers.includes(lines[pos[0]][pos[1]])) {
        pos[1]--;
    }

    pos[1]++;

    let number: string = "";

    while(numbers.includes(lines[pos[0]][pos[1]])) {
        number += lines[pos[0]][pos[1]];
        pos[1]++;
    }

    return parseInt(number);
}

function isNumber(pos: number[], lines:string[]): boolean {
    if(pos[0] < 0 || pos[1] < 0 || pos[0] >= lines.length || pos[1] >= lines[pos[0]].length) {
        return false;
    }

    return !isNaN(parseInt(lines[pos[0]][pos[1]]));
}