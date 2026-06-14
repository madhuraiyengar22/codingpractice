// 1. Create a Simple Promise
// Write a function that returns a Promise that:
// resolves with "Success!" after 1 second
// rejects with "Error!" if a boolean flag is false

// function promiseProblem1(booleanFlag){
//     return new Promise((resolve, reject) => {
//         if (booleanFlag) {
//             setTimeout(() => {
//                 resolve("Success!");
//             }, 3000);
//         } else {
//             reject("Error!");
//         }
//     })
// }

// 2. Using .then() and .catch()
// Call the function from Problem 1 and:
// log the result if resolved
// log the error if rejected

// const main = () => {
//     const booleanFlag = false; // true or false
//     promiseProblem1(booleanFlag).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
// }

// 3. Convert Callback → Promise
// Convert this callback-based function into a Promise:
// function fetchData(callback) {
//   setTimeout(() => {
//     callback(null, "Data received");
//   }, 1000);
// }

function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data received");
  }, 1000);
}

function convertToPromise() {
    return new Promise((resolve, reject) => {
        fetchData(resolve);
    });
}

main();