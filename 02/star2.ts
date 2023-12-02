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

let sumOfPows = 0;

for(let game of games) {
    let bags: IBag[] = game.bags;
    let check: boolean = false;

    let green: number = 0;
    let red: number = 0;
    let blue: number = 0;

    for(let bag of bags) {
        for(let cube of bag.cubes) {
            if(cube.color === "green"&& cube.amount > green) {
                green = cube.amount;
            }
            else if(cube.color === "blue"&& cube.amount > blue) {
                blue = cube.amount;
            }
            else if(cube.color === "red" && cube.amount > red) {
                red = cube.amount;
            }
        }
    }

    sumOfPows += (green * red * blue);
}

console.log(sumOfPows);