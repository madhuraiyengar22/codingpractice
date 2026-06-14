console.log("Test 1");          // this will execute first, demonstrating synchronous behavior until it encounters an asynchronous operation
setTimeout(() => {              // simulating an async operation
    console.log("Test 2");
}, 5000);
console.log("Test 3");          // this will execute before the above timeout callback, demonstrating non-blocking behavior
console.log("Test 4");          
console.log("Test 5");
console.log("Test 6");          
setTimeout(() => {
    console.log("Test 7");      // this will execute after 6 seconds, demonstrating that the event loop continues to run other code while waiting for the timeout
}, 6000);
console.log("Test 8");

const asyncFunction = () => {
    setTimeout(() => {
        console.log("Test 9");  // this will execute after 7 seconds, demonstrating that even within an async function, the event loop allows other code to run
    }, 7000);
}

const main = () => {
    console.log("Test 10");
    asyncFunction();            // calling the async function, which will schedule its own timeout
    console.log("Test 11");     // this will execute immediately after calling asyncFunction, demonstrating that the main function continues to run without waiting for the async operation to complete
}