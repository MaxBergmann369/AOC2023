import {getLines} from "../readFile";
import { BigNumber } from 'bignumber.js';

interface IMap {
    dest_range_start: BigNumber,
    src_range_start: BigNumber,
    range_len: BigNumber
}

const lines: string[]  = getLines("05/input.txt");

const seeds: BigNumber[] = [];

const seedSoil: BigNumber[] = [];

const soilFertilizer: BigNumber[] = [];

const fertilizerWater: BigNumber[] = [];

const waterLight: BigNumber[] = [];

const lightTemperature: BigNumber[] = [];

const temperatureHumidity: BigNumber[] = [];

const humidityLocation: BigNumber[] = [];

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

let newSeeds: BigNumber = calcNextSeeds(seeds);

console.log(newSeeds)

function calcNextSeeds(inputSeeds: BigNumber[]): BigNumber {
    let calculatedSeed: BigNumber;
    let newInputSeeds: BigNumber[] = [];
    let lenForSeeds: BigNumber[] = [];
    let resultSeed: BigNumber | null = null;

    for(let i = 0; i < inputSeeds.length; i++) {
        if(i % 2 == 0) {
            newInputSeeds.push(inputSeeds[i]);
        }
        else {
            lenForSeeds.push(inputSeeds[i]);
        }
    }


    for(let i = 0; i < newInputSeeds.length; i++) {
        for(let k = 0; i < lenForSeeds.length; k++) {
            calculatedSeed = newInputSeeds[i].plus(k);
            for(let map1 of maps) {
                for(let map of map1) {
                    if ((calculatedSeed.isGreaterThan(map.src_range_start) || calculatedSeed.isEqualTo(map.src_range_start)) && (calculatedSeed.isLessThan(map.src_range_start.plus(map.range_len)) || calculatedSeed.isEqualTo(map.src_range_start.plus(map.range_len)))) {
                        let number = map.dest_range_start;
                        let add = calculatedSeed.minus(map.src_range_start);
                        let result = number.plus(add);
                        calculatedSeed = result;
                    }
                }
            }

            if(resultSeed === null) {
                resultSeed = calculatedSeed;
            }
            else if(resultSeed.isGreaterThan(calculatedSeed)) {
                resultSeed = calculatedSeed;
            }
        }
    }

    return resultSeed == null ? new BigNumber(0) : resultSeed;
}