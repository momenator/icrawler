/**
 * Queue data structure class
 */
export default class Queue {
  constructor() {
    this.q = [];
  }
  getQueue() {
    return this.q;
  }
  isElementExist(elem) {
    return this.q.includes(elem);
  }
  // insert an element to to the back of the queue, can only accept one element
  // at a time!
  enq(elem) {
    this.q.push(elem);
  }
  // remove an element from the front of the array
  deq() {
    return this.q.shift();
  }
}
