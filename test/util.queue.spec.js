var assert = require('assert');
var Queue = require('../build/util/queue');

describe('util/queue test suite', function() {
  it('should be able to insert an element from the back using enq function', function() {
    const q = new Queue.default();
    q.enq(1);
    q.enq(2);
    q.enq(3);
    assert.equal(3, q.getQueue().length);
    // ensure that the elements are added from the back of the queue
    assert.equal(3, q.getQueue()[2]);
  });

  it('should be able remove an element from the front using deq function', function() {
    const q = new Queue.default();
    q.enq(1);
    q.enq(2);
    const front = q.deq();
    assert.equal(1, front);
    assert.equal(1, q.getQueue().length);
    assert.equal(2, q.getQueue()[0]);
  });

  it('should be able check if element exist in queue', function() {
    const q = new Queue.default();
    q.enq(1);
    q.enq(2);
    q.enq(3);
    assert.equal(true, q.isElementExist(1));
  });
});
