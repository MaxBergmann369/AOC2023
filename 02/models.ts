export interface IGame {
    id: number,
    bags: IBag[]
}

export interface IBag {
    cubes: ICube[]
}

export interface ICube {
    amount: number,
    color: string
}

export function createGames(lines: string[]): IGame[] {
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

    return games;
}