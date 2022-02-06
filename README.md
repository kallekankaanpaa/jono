# Jono

Jono is a simple Queue implementation that provides constant time `enqueue`, `dequeue`, and `peek` methods.

The Queue is also iterable. Elements in the queue are dequeued as the queue is iterated.

# Example usage

```js
import Queue from 'jono'

const queue = new Queue("First element", "Second element")

queue.dequeue() // "First element"

queue.enqueue("Third element")

queue.peek() // "Second element"

queue.dequeue() //  "Second element"
queue.dequeue() //  "Third element"
queue.dequeue() //  undefined
```

# License

The project is licensed under the MIT license