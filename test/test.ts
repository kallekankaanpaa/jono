import assert from 'assert';
import Queue from '../src/index';

describe('Queue', function () {
    it('should work', function () {
        const queue = new Queue('xd');
        queue.enqueue('first in');
        queue.enqueue('second in', 'third in');
        assert.strictEqual(queue.dequeue(), 'xd');
        assert.strictEqual(queue.dequeue(), 'first in');
        assert.strictEqual(queue.dequeue(), 'second in');
        assert.strictEqual(queue.dequeue(), 'third in');
        queue.enqueue("asdf");
        assert.strictEqual(queue.dequeue(), 'asdf');
    });

    it('has correct length', function () {
        const queue = new Queue();
        assert.strictEqual(queue.length, 0);
        queue.dequeue();
        assert.strictEqual(queue.length, 0);
        queue.enqueue(0, 1, 2, 3, 4);
        assert.strictEqual(queue.length, 5);
        queue.dequeue();
        assert.strictEqual(queue.length, 4);
        queue.enqueue(5);
        assert.strictEqual(queue.length, 5);
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        assert.strictEqual(queue.length, 0);
        queue.dequeue();
        assert.strictEqual(queue.length, 0);
    })

    it('iterates', function () {
        const queue = new Queue(0, 1, 2, 3, 4, 5, 6, 7, 8);
        let count = 0;
        for (const item of queue) {
            assert.strictEqual(item, count);
            count++;
        }
        assert.strictEqual(queue.length, 0);

    })
});
