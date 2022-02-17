import 'mocha';
import assert from 'assert';
import { PriorityQueue } from '../src/index';

describe('PriorityQueue', function () {
    it('works', function () {
        let queue = new PriorityQueue()
        queue.enqueue(4);
        queue.enqueue(1);
        queue.enqueue(8);
        queue.enqueue(3);
        queue.enqueue(7);
        assert.strictEqual(queue.dequeue(), 1)
        assert.strictEqual(queue.dequeue(), 3)
        assert.strictEqual(queue.dequeue(), 4)
        assert.strictEqual(queue.dequeue(), 7)
        assert.strictEqual(queue.dequeue(), 8)
    })
})