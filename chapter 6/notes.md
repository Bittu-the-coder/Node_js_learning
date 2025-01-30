```javascript
// Understanding the Event Loop in Node.js

// The event loop is a mechanism that allows Node.js to handle multiple tasks concurrently.
// It's a single-threaded, non-blocking I/O model that makes it efficient for handling a large number of requests.

// Example 1: Understanding the Event Loop with setTimeout
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 2000);

console.log("End");

// Example 2: Understanding the Event Loop with setImmediate
console.log("Start");

setImmediate(() => {
  console.log("Immediate callback");
});

console.log("End");

// Example 3: Understanding the Event Loop with process.nextTick
console.log("Start");

process.nextTick(() => {
  console.log("Next tick callback");
});

console.log("End");

// Example 4: Understanding the Event Loop with async/await
async function asyncExample() {
  console.log("Start");

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Async callback");
      resolve();
    }, 2000);
  });

  console.log("End");
}

asyncExample();

// Example 5: Understanding the Event Loop with a queue
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(callback) {
    this.queue.push(callback);
  }

  dequeue() {
    if (this.queue.length > 0) {
      const callback = this.queue.shift();
      callback();
    }
  }
}

const queue = new Queue();

queue.enqueue(() => {
  console.log("Callback 1");
});

queue.enqueue(() => {
  console.log("Callback 2");
});

queue.dequeue(); // Output: Callback 1
queue.dequeue(); // Output: Callback 2
```
