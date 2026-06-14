const asyncFunction1 = (cb) => {
    setTimeout(() => {
        console.log("Step 2: inside asyncFunction1");
        cb({ message: "Async operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
    }, 1000);
};

const asyncFunction2 = (cb) => {
    setTimeout(() => {
        console.log("Step 2: inside asyncFunction2");
        cb({ message: "Async operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
    }, 1000);
};

const asyncFunction3 = (cb) => {
    setTimeout(() => {
        console.log("Step 2: inside asyncFunction3");
        cb({ message: "Async operation completed" });           // simulating an async operation and then calling the callback with a result ex: database
    }, 1000);
};

const main = () => {
    console.log("Step 1: main function started ");
    asyncFunction1((result) => {
        asyncFunction2((result) => {
            asyncFunction3((result) => {
                console.log("All async operations completed");
            });
            console.log("Step 3: callback executed after asyncFunction2");
            console.log("Step 3a:", result.message);
        });
    });
    console.log("Step 4: main function continues without waiting for asyncFunction");
    };

main();