/**
 * Demonstrates the JavaScript Event Loop, Call Stack, Microtask Queue, and Macrotask Queue.
 * 
 * Execution Order Explanation:
 * 1. Synchronous code executes first (Call Stack).
 * 2. Microtasks (e.g., Promises) execute immediately after the current synchronous code finishes, before any rendering or macrotasks.
 * 3. Macrotasks (e.g., setTimeout) are pushed to the Task Queue via Web APIs and execute after the Call Stack and Microtask Queue are completely empty.
 */
export function demonstrateEventLoop(logCallback) {
    // 1. Synchronous Code (Call Stack)
    // Executes immediately.
    logCallback({ message: "1. [Sync] Starting execution", type: "sync" });

    // 2. Macrotask (Web API -> Task Queue)
    // Sent to Web API, waits 0ms, then pushed to Task Queue (Macrotask).
    // The Event Loop will only pick this up AFTER the Call Stack and Microtask Queue are empty.
    setTimeout(() => {
        logCallback({ message: "4. [Macrotask] setTimeout callback executed", type: "macrotask" });
    }, 0);

    // 3. Microtask (Microtask Queue)
    // Promises are Microtasks. They are queued and executed IMMEDIATELY after the , 
    // current Call Stack is empty, but BEFORE any Macrotasks (like setTimeout) .
    Promise.resolve().then(() => {
        logCallback({ message: "3. [Microtask] Promise resolved", type: "microtask" });
    });

    // 4. Synchronous Code (Call Stack)
    // Executes immediately, still part of the initial synchronous execution block.
    logCallback({ message: "2. [Sync] Ending execution", type: "sync" });
}
