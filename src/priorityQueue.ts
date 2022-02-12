class PriorityQueue<T> {
    #heap: T[] = new Array();
    #compareFn: PriorityQueue.CompareFn<T>;
    length = 0;

    constructor(compareFn: PriorityQueue.CompareFn<T> = PriorityQueue.defaultCompare) {
        this.#compareFn = compareFn;
    }

    enqueue(...items: T[]): void {
        for (const item of items) {
            this.#heap.push(item);
            this.#upheap(this.#heap.length - 1);
        }
        this.length = this.#heap.length;
    }

    dequeue(): T | undefined {
        const dequeued = this.#heap[0];
        const last = this.#heap.pop();

        if (this.#heap.length) {
            // SAFETY: if heap length > 0, last must be defined since it was just popped
            this.#heap[0] = last!;
            this.#downheap(0);
        }

        return dequeued;
    }

    peek(): T | undefined {
        return this.#heap[0];
    }

    *[Symbol.iterator](): Generator<T, void, unknown> {
        while (this.length !== 0) {
            // SAFETY: dequeue won't return undefined when lenght is bigger than 0
            yield this.dequeue()!;
        }
        return;
    }

    #upheap(startIndex: number): void {
        const element = this.#heap[startIndex];
        let index = startIndex;
        // Swap parent and element while element is smaller than parent
        while (this.#compareFn(this.#heap[Math.floor(index / 2)], element) > 0) {
            this.#heap[index] = this.#heap[Math.floor(index / 2)];
            index = Math.floor(index / 2);
            if (index <= 0) {
                break;
            }
        }
        this.#heap[index] = element;
    }

    #downheap(startIndex: number): void {
        const element = this.#heap[startIndex];
        let parent = startIndex;
        let child;

        while (parent < Math.floor(this.#heap.length / 2)) {
            child = parent + parent + 1;

            if (child < this.length && this.#compareFn(this.#heap[child], this.#heap[child + 1]) > 0) {
                child++;
            }

            if (this.#compareFn(element, this.#heap[child]) <= 0) {
                break;
            }

            this.#heap[parent] = this.#heap[child];
            parent = child;
        }

        this.#heap[parent] = element;
    }


    static defaultCompare<T>(x: T, y: T): number {
        //INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare

        if (x === undefined && y === undefined)
            return 0;

        if (x === undefined)
            return 1;

        if (y === undefined)
            return -1;

        const xString = PriorityQueue.toString(x);
        const yString = PriorityQueue.toString(y);

        if (xString < yString)
            return -1;

        if (xString > yString)
            return 1;

        return 0;
    };

    static toString(obj: any): string {
        //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-tostring

        if (obj === null)
            return "null";

        if (typeof obj === "boolean" || typeof obj === "number")
            return (obj).toString();

        if (typeof obj === "string")
            return obj;

        if (typeof obj === "symbol")
            throw new TypeError();

        //we know we have an object.
        return (obj).toString();
    };
}


namespace PriorityQueue {
    export interface Node<T> {
        item: T;
        depth: number;
        right: Node<T> | undefined;
        left: Node<T> | undefined;
        parent: Node<T> | undefined;
    }
    export type CompareFn<T> = (firstEl: T, secondEl: T) => number;
}

export default PriorityQueue;