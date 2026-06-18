"use strict";
// const { response } = require("express");

const asyncFunction1 = () => {
    console.log("Step 2: execution of asyncFunction1 started");
    return new Promise(( resolve, reject) => {
        setTimeout(() => {
            console.log("Step 2a: inside asyncFunction1");
            resolve({ message: "Async1 operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
        }, 5000);
    });
};

const asyncFunction2 = () => {
    console.log("Step 2: execution of asyncFunction2 started");
    return new Promise(( resolve, reject) => {
        setTimeout(() => {
            console.log("Step 2b: inside asyncFunction2");
            reject({ message: "Async2 operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
        }, 1000);
    });
};

const asyncFunction3 = () => {
    console.log("Step 2: execution of asyncFunction3 started");
    return new Promise(( resolve, reject) => {
        setTimeout(() => {
            console.log("Step 2c: inside asyncFunction3");
            resolve({ message: "Async3 operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
        }, 10000);
    });
};

// SIMPLE PROMISE CALL WITHOUT ASYNC/AWAIT
// const main = () => {
//     console.log("Step 1: main function started ");
//     asyncFunction1().then((data) => {
//         console.log("Step 3: Async operation completed:", data);
//     });
//     console.log("Step 4: main function continues without waiting for asyncFunction");
// }

// SIMPLE PROMISE CALL WITH ASYNC/AWAIT
// const main = async () => {
//     console.log("Step 1: main function started ");
//     const data = await asyncFunction1();
//     console.log("Step 3: Async operation completed:", data);
//     console.log("Step 4: main function continues without waiting for asyncFunction");
// }

// PROMISE.ALL USING ASYNC/AWAIT
// const main = async () => {
//     console.log("Step 1: main function started ");
//     const data1 = await asyncFunction1();
//     const [data2, data3] = await Promise.all([
//         asyncFunction2(),           // change reject to resolve
//         asyncFunction3()
//     ]);
//     console.log("Step 3: All async operations completed:", data1, data2, data3);
//     console.log("Step 4: main function continues without waiting for asyncFunction");
// }

// REJECTING PROMISES USING CATCH WITH ASYNC/AWAIT
// const main = async () => {
//     console.log("Step 1: main function started ");
//     try{
//         const resp = await Promise.all([        //  we now know when these promises are all resolved and we can access their results in the .then() callback. This allows us to run multiple async operations in parallel and wait for all of them to complete before proceeding.
//             asyncFunction1(), 
//             asyncFunction2(),
//             asyncFunction3()
//         ])
//         console.log("Step 3: All done!!");
//         console.log("Data from all async functions:", resp);
//     }catch(error){
//         console.log("Step 3: An error occurred:", error);
//     }
// }

// PROMISE.RACE - GIVES EITHER THE FIRST SUCCESS OR THE FIRST ERROR WITH ASYNC/AWAIT
const main = async () => {
    console.log("Step 1: main function started ");

    try{
        const data = await Promise.race([
            asyncFunction1(),
            asyncFunction2(),
            asyncFunction3()
        ])
        console.log("Step 3: The fastest async operation completed:", data)
    } catch (error) {
        console.error("Step 3: An error occurred:", error);
    }
};

main();