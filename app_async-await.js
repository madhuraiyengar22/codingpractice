// const asyncFunction1 = (cb) => {
//     setTimeout(() => {
//         console.log("Step 2: inside asyncFunction3");
//         cb({ message: "Async operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
//     }, 1000);
// };

const { response } = require("express");

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
            reject({ message: "Async2 operation failed" });           // simulating an async operation and then calling the callback with a result ex: database
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

const asyncFunctionCb1 = (cb) => {
    setTimeout(() => {
        console.log("Step 2: inside asyncFunction1");
        cb({ message: "Async operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
    }, 1000);
};

//convert the above CB function into a promise by creating a wrapper function
const asyncFunctionPromise1 = () => {
    return new Promise((resolve, reject) => {
        asyncFunctionCb1(resolve);
    });
};

// CALLBACK HELL
// const main = () => {
//     console.log("Step 1: main function started ");
//     asyncFunction1().then((response) => {
//         asyncFunction2().then((response) => {
//             asyncFunction3().then((response) => {
//                 console.log("Step 4: All async operations completed");
//             });
//         });
//     });
//     console.log("Step 3: main function continues without waiting for asyncFunction");
//     };

// PROMISE CHAINING - 16 sec
// const main = () => {
//     console.log("Step 1: main function started ");

//     asyncFunction1()
//     .then(asyncFunction2)
//     .then(asyncFunction3)
//     .then(() => {
//         console.log("Step 3: All done!!");
//     })
// }

// PROMISE ALL - 10 sec - Module 4 - Deep dive into Async - 1:47:00
// const main = () => {
//     console.log("Step 1: main function started ");

//     resp = Promise.all([        //  we now know when these promises are all resolved and we can access their results in the .then() callback. This allows us to run multiple async operations in parallel and wait for all of them to complete before proceeding.
//         asyncFunction1(), 
//         asyncFunction2(), 
//         asyncFunction3()
//     ]).then((data) => {
//         console.log("Step 3: All done!!");
//         console.log("Data from all async functions:", data);    // resolved data from all async functions will be available here as an array of results
//     })
//     console.log("Step 4: main function continues without waiting for asyncFunction");
// }

// REJECTING PROMISES USING CATCH
// const main = () => {
//     console.log("Step 1: main function started ");

//     resp = Promise.all([        //  we now know when these promises are all resolved and we can access their results in the .then() callback. This allows us to run multiple async operations in parallel and wait for all of them to complete before proceeding.
//         asyncFunction1(), 
//         asyncFunction2(),
//         asyncFunction3()
//     ]).then((data) => {
//         console.log("Step 3: All done!!");
//         console.log("Data from all async functions:", data);
//     }).catch((error) => {
//         console.error("Step 3: An error occurred:", error);
//     });
// }

// CALLING THE WRAPPER FUNCTION
// const main = () => {
//     console.log("Step 1: main function started ");
//     const resp = asyncFunctionPromise1().then((result) => {
//         console.log("All done!", result);
//     });
// };

// PROMISE.RACE - GIVES EITHER THE FIRST SUCCESS OR THE FIRST ERROR
// const main = () => {
//     console.log("Step 1: main function started ");

//     Promise.race([
//         asyncFunction1(),
//         asyncFunction2(),
//         asyncFunction3()
//     ]).then((winner) => {
//         console.log("Step 3: The fastest async operation completed:", winner);
//     }).catch((error) => {
//         console.error("Step 3: An error occurred:", error);
//     });
// };

// PROMISE.ALLSETTLED - GIVES RESULTS FOR ALL PROMISES REGARDLESS OF SUCCESS OR FAILURE
// const main = () => {
//     console.log("Step 1: main function started ");

//     Promise.allSettled([
//         asyncFunction1(),
//         asyncFunction2(),
//         asyncFunction3()
//     ]).then((results) => {
//         console.log("Step 3: All async operations completed:", results);
//     });
// }

// PROMISE.ANY - GIVES THE FIRST SUCCESSFUL RESULT OR ALL REJECTIONS
const main = () => {
    console.log("Step 1: main function started ");

    Promise.any([
        asyncFunction1(),
        asyncFunction2(),
        asyncFunction3()
    ]).then((winner) => {
        console.log("Step 3: The first successful async operation completed:", winner);
    }).catch((error) => {
        console.error("Step 3: All async operations failed:", error);
    });
}

main(); 