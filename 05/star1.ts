import {getLines} from "../readFile";
import { BigNumber } from 'bignumber.js';

interface IMap {
    dest_range_start: BigNumber,
    src_range_start: BigNumber,
    range_len: BigNumber
}

const lines: string[]  = getLines("05/input.txt");

const seeds: BigNumber[] = [];

const seedsData: string[] = lines[0].replace("seeds: ", "").split(" ")

for(let seed of seedsData) {
    if(BigNumber(seed) != undefined){
        seeds.push(BigNumber(seed));
    }
}

let maps: IMap[][] = [];
let oneMap: IMap[] = [];
let flag = false;

for(let line of lines) {
    if(line === "") {
        continue;
    }

    if(line.includes("map")) {
        if(flag) {
            maps.push(oneMap)
            oneMap = [];
        }

        flag = true
    }
    else if(flag){
        let nums: string[] = ["", "", ""];
        let cnt = 0;
        for(let c of line) {
            if(c === " ") {
                cnt++;
            }
            else if(!isNaN(parseInt(c))){
               nums[cnt] += c;
            }
        }

        let destRStart: BigNumber = BigNumber(nums[0]);
        let srcRStart: BigNumber = BigNumber(nums[1]);
        let rangeLen: BigNumber = BigNumber(nums[2]);

        let map: IMap = {
            dest_range_start: destRStart,
            src_range_start: srcRStart,
            range_len: rangeLen
        }

        oneMap.push(map);
    }
}

maps.push(oneMap)

let newSeeds: BigNumber[] = calcNextSeeds(0, seeds);
newSeeds = calcNextSeeds(1, newSeeds);
newSeeds = calcNextSeeds(2, newSeeds);
newSeeds = calcNextSeeds(3, newSeeds);
newSeeds = calcNextSeeds(4, newSeeds);
newSeeds = calcNextSeeds(5, newSeeds);
newSeeds = calcNextSeeds(6, newSeeds);

console.log(sortBigNumArray(newSeeds)[0])

function sortBigNumArray(arr: BigNumber[]): BigNumber[] {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            if(arr[j].isGreaterThan(arr[j+1])) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    return arr;
}

function calcNextSeeds(idx: number, inputSeeds: BigNumber[]): BigNumber[] {
    let seedsToCalc: Map<BigNumber, IMap> = new Map<BigNumber, IMap>;
    let calculatedSeeds: BigNumber[] = [];

    for(let seed of inputSeeds) {
        for(let map of maps[idx]) {
            if((seed.isGreaterThan(map.src_range_start) || seed.isEqualTo(map.src_range_start)) && (seed.isLessThan(map.src_range_start.plus(map.range_len)) || seed.isEqualTo(map.src_range_start.plus(map.range_len))) && seedsToCalc.get(seed) == undefined) {
                seedsToCalc.set(seed, map);
            }
        }
    }

    for(let seed of inputSeeds) {
        let mapFromSeed = seedsToCalc.get(seed)
        if(mapFromSeed != undefined) {
            let number = mapFromSeed.dest_range_start;
            let add = seed.minus(mapFromSeed.src_range_start);
            let result = number.plus(add);
            calculatedSeeds.push(result);
        }
        else {
            calculatedSeeds.push(seed);
        }
    }

    return calculatedSeeds;
}