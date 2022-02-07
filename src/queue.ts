class Queue<T> {
    #head: Queue.Node<T> | undefined;
    #tail: Queue.Node<T> | undefined;
    length = 0;

    /**
     * Constructs a queue with the provided items
     * @param items Items to enqueue
     */
    constructor(...items: T[]) {
        this.enqueue(...items);
    }

    /**
     * Enqueues provided items to the que in the order they are given to the function
     * @param items Items to enqueue
     */
    enqueue(...items: T[]): void {
        for (const item of items) {
            if (!this.#tail) {
                this.#tail = { item, next: undefined, prev: undefined };
                this.#head = this.#tail;
            } else {
                this.#tail.prev = { item, next: this.#tail, prev: undefined };
                this.#tail = this.#tail.prev;
            }
            this.length++;
        }
    }

    /**
     * Dequeues elements from the queue
     * @returns the next element in the queue or undefined if queue is empty
     */
    dequeue(): T | undefined {
        if (!this.#head) {
            return undefined;
        }

        const dequeued = this.#head.item;

        if (!this.#head.prev) {
            this.#tail = undefined;
            this.#head = undefined;
        } else {
            this.#head = this.#head.prev;
            this.#head.next = undefined;
        }

        this.length--;

        return dequeued;
    }

    /**
     * Returns the current head of the queue without removing it.
     * 
     * @returns the head of the queue or undefined if queue is empty
     */
    peek(): T | undefined {
        return this.#head?.item;
    }

    *[Symbol.iterator](): Generator<T, void, unknown> {
        while (this.#head) {
            // SAFETY: dequeue cannot return undefined when #head is defined
            yield this.dequeue()!;
        }
        return;
    }
}

namespace Queue {
    export interface Node<T> {
        item: T;
        next: Node<T> | undefined;
        prev: Node<T> | undefined;
    }
}

export default Queue;