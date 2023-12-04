import {getLines} from "../readFile";

const lines: string[]  = getLines("04/input.txt");

interface ICard {
    id: number,
    elfCards: number[],
    myCards: number[]
}

const finalCards: ICard[] = [];

for(let line of lines) {
    const vals: string[] = line.split(":")
    const id: number = parseInt(vals[0].replace("Card", "").trim());
    const cards: string[] = vals[1].split("|");
    const elfCards: number[] = [];
    for(let card of cards[0].split(" ")) {
        if(!isNaN(parseInt(card))) {
            elfCards.push(parseInt(card));
        }
    }

    const myCards: number[] = [];
    for(let card of cards[1].split(" ")) {
        if(!isNaN(parseInt(card))) {
            myCards.push(parseInt(card));
        }
    }

    let card: ICard = {
        id,
        elfCards,
        myCards
    };

    finalCards.push(card);
}



function processScratchcards(cards: ICard[]): number {
    let sets: number[] = [];
    let winning: number[] = [];

    for(let card of cards) {
        sets.push(1);
        winning.push(hasWinning(card));
    }

    for(let i: number = 0; i < cards.length; i++) {
        for(let k: number  = 0; k < sets[i]; k++) {
            for (let j: number  = i; j < i + winning[i]; j++) {
                sets[j+1]++;
            }
        }

        console.log(sets[i])
    }

    let sum: number = 0;
    for(let set of sets) {
        sum += set;
    }

    return sum;
}

function hasWinning(finalCard: ICard): number {
    let cnt: number = 0
    for(let card of finalCard.elfCards) {
        if(finalCard.myCards.includes(card)) {
            cnt++;
        }
    }

    return cnt;
}

const result: number = processScratchcards(finalCards);
console.log(result);