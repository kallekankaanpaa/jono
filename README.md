# Jono

Jono is a Queue library that provides implementations for a simple LIFO queue and for a priority queue.
The queues have identical APIs that allow easy `enqueue`, `dequeue` and `peek` operations.

The `enqueue`, `dequeue` and `peek` operations on Queue require constant time.

On PriorityQueue `peek` is constant time but `enqueue` and `dequeue` take O(log n) time.

Both queues are also iterable. Elements in the queue are dequeued as the queue is iterated.

# Example usage

## Queue
```js
import { Queue } from 'jono'

const queue = new Queue("First element", "Second element")

queue.dequeue() // "First element"

queue.enqueue("Third element")

queue.peek() // "Second element"

queue.dequeue() //  "Second element"
queue.dequeue() //  "Third element"
queue.dequeue() //  undefined
```

## PriorityQueue
```js
import { PriorityQueue } from 'jono'

const queue = new PriorityQueue(8, 1, 3, 9)

queue.dequeue() // 1

queue.enqueue(4)

queue.peek() // 3

queue.dequeue() //  4
queue.dequeue() //  8
queue.dequeue() //  9
queue.dequeue() //  undefined
```

# License

The project is licensed under the MIT license