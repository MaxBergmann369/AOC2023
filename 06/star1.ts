import {getLines} from "../readFile";

const lines: string[]  = getLines("06/input.txt");

interface IRace {
    time: number,
    distance: number
}

let carInformation:Map<number, number> = new Map<number, number>;

let dataTimes: string[] = lines[0].replace("Time:", "").split(" ");
let dataDistance: string[] = lines[1].replace("Distance:", "").split(" ");
removeEmpty(dataTimes)
removeEmpty(dataDistance)

let sum = 1;

for(let i = 0; i < dataTimes.length; i++) {
    sum *= calcHowOftenToBeatTheRecord(dataTimes[i], dataDistance[i])
}

console.log(sum)

function calcHowOftenToBeatTheRecord(timeData: string, distanceData: string): number {
    if(isNaN(parseInt(timeData)) || isNaN(parseInt(distanceData))) {
        return 0;
    }

    let time = parseInt(timeData);
    let distance = parseInt(distanceData);

    let cnt = 0;
    for(let i = 0; i < time; i++) {
        if((time-i)*i > distance) {
            cnt++;
        }
    }

    return cnt;
}

function removeEmpty(arr: string[]): void {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === "") {
            arr.splice(i, 1);
            i--;
        }
    }
}