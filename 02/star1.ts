import {getLines} from "../readFile";

const lines = getLines("02/input.txt");

interface IGame {
    id: number,
    bags: IBag[]
}

interface IBag {
    cubes: ICube[]
}

interface ICube {
    amount: number,
    color: string
}

let limit1: ICube = {
    amount: 12,
    color: "red"
}

let limit2: ICube = {
    amount: 13,
    color: "green"
}

let limit3: ICube = {
    amount: 14,
    color: "blue"
}

let games: IGame[] = [];

for(let line of lines) {
    line = line.replace("Game", "");
    const vals: string[] = line.split(":");

    const sets = vals[1].split(";")

    const bags: IBag[] = [];

    for(const set of sets) {
        let cubesRaw: string[] = set.split(",");
        const cubes: ICube[] = [];
        for(const cubeRaw of cubesRaw) {
            const data = cubeRaw.trim().split(" ");
            const cube: ICube = {
                amount: parseInt(data[0]),
                color: data[1]
            }

            cubes.push(cube);
        }

        const bag: IBag = {
            cubes: cubes
        }

        bags.push(bag)
    }

    let game: IGame = {
        id: parseInt(vals[0].trim()),
        bags: bags
    }

    games.push(game);
}

let gameIds: number[] = []

for(let game of games) {
    let bags: IBag[] = game.bags;
    let check: boolean = false;

    for(let bag of bags) {
        for(let cube of bag.cubes) {
            if ((cube.amount > limit1.amount && cube.color === limit1.color)
                || (cube.amount > limit2.amount && cube.color === limit2.color)
                || (cube.amount > limit3.amount && cube.color === limit3.color)) {
                check = true;
                break;
            }
        }
    }

    if(!check) {
        gameIds.push(game.id);
    }
}

let sum: number = 0;

for(let id of gameIds) {
    sum += id;
}

console.log(sum)