export interface ICollection<T> {
    add(item: T): void;
    remove(item: T): boolean;
    contains(item: T): boolean;
    size(): number;
    get(idx: number): T;
    [Symbol.iterator](): Iterator<T>;
}

export interface IStack<T> {
    top(item: T): void;
    pop(): T | undefined;
    contains(item: T): boolean;
    size(): number;
    get(idx: number): T;
    [Symbol.iterator](): Iterator<T>;
}

export interface IQueue<T> {
    queue(item: T): void;
    enqueue(): T | undefined;
    contains(item: T): boolean;
    size(): number;
    get(idx: number): T;
    [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;

    return?(value?: any): IteratorResult<T>;

    throw?(e?: any): IteratorResult<T>;
}

export class List<T> implements ICollection<T>{
    private readonly items: Array<T> = [];

    constructor(items: T[] = []) {
        this.items = items;
    }

    [Symbol.iterator](): Iterator<T> {
        let index: number = -1;
        let data: T[]  = this.items;

        return {
            next: (): IteratorResult<T> => ({ value: data[++index], done: !(index in data) })
        };
    }

    remove(item: T): boolean {
        const index: number = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    contains(item: T): boolean {
        return this.items.includes(item);
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}

export class Stack<T> implements IStack<T>{
    private readonly items: Array<T> = [];

    [Symbol.iterator](): Iterator<T> {
        let index: number = -1;
        let data: T[]  = this.items;

        return {
            next: (): IteratorResult<T> => ({ value: data[++index], done: !(index in data) })
        };
    }

    pop(): T | undefined {
        if(this.size() > 0) {
            return this.items.pop();
        }

        return undefined;
    }

    contains(item: T): boolean {
        return this.items.includes(item);
    }

    size(): number {
        return this.items.length;
    }

    top(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}

export class Queue<T> implements IQueue<T>{
    private readonly items: Array<T> = [];

    [Symbol.iterator](): Iterator<T> {
        let index: number = -1;
        let data: T[]  = this.items;

        return {
            next: (): IteratorResult<T> => ({ value: data[++index], done: !(index in data) })
        };
    }

    contains(item: T): boolean {
        return this.items.includes(item);
    }

    size(): number {
        return this.items.length;
    }

    get(index: number): T {
        return this.items[index];
    }

    enqueue(): T | undefined {
        return this.items.shift();
    }

    queue(item: T): void {
        this.items.push(item);
    }
}