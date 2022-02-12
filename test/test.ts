import 'mocha';
import assert from 'assert';
import Queue from '../src/index';

describe('Queue', function () {
    let queue: Queue<any>;
    beforeEach(function () {
        queue = new Queue();
    })

    describe('with 0 elements', function () {
        it('should return undefiend on peek or dequeue', function () {
            assert.strictEqual(queue.peek(), undefined);
            assert.strictEqual(queue.dequeue(), undefined);
        })

        it('should iterate 0 times', function () {
            // Can't use node calltracker to test this since it doesn't support testing 0 calls
            let called = false;
            for (const _ of queue) {
                called = true;
            }
            assert.strictEqual(called, false);
        })

        it('should have length of 0', function () {
            assert.strictEqual(queue.length, 0);
        })

        it('should have 0 length after dequeue', function () {
            assert.strictEqual(queue.length, 0);
            queue.dequeue();
            assert.strictEqual(queue.length, 0);
        })
    })

    describe('with four elements', function () {
        beforeEach(function () {
            queue.enqueue("First", "Second", "Third", "Fourth")
        })

        it('should dequeue elements according to the insertion order', function () {
            assert.strictEqual(queue.dequeue(), "First");
            assert.strictEqual(queue.dequeue(), "Second");
            assert.strictEqual(queue.dequeue(), "Third");
            assert.strictEqual(queue.dequeue(), "Fourth");
        })

        it('should peek first item only', function () {
            assert.strictEqual(queue.peek(), "First");
            assert.strictEqual(queue.peek(), "First");
        })

        it('should return same value for both peek and dequeue', function () {
            assert.strictEqual(queue.peek(), queue.dequeue())
            assert.strictEqual(queue.peek(), queue.dequeue())
        })

        it('should iterate over the elements', function () {
            const callTracker = new assert.CallTracker();
            const testFn = callTracker.calls(4);
            for (const _ of queue) {
                testFn();
            }
            callTracker.verify();
        })
    })

    it('should increase length by one when enqueueing', function () {
        const originalLength = queue.length;
        queue.enqueue("")
        assert.strictEqual(queue.length, originalLength + 1)
    })

    it('should decrease length by one when dequeueing', function () {
        queue.enqueue("First");
        const originalLength = queue.length;
        queue.dequeue();
        assert.strictEqual(queue.length, originalLength - 1)
    })
});
