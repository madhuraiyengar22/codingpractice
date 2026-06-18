function printString(string){
  setTimeout(
    () => {
      console.log(string)
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll1(){
  printString("A")
  printString("B")
  printString("C")
}
printAll1()

// You will notice that A, B, and C print in a different and random order each time you call printAll!
// This is because these functions are asynchronous. Each function gets executed in order, but each one is independent with it’s own setTimeout. 
// They won’t wait for the last function to finish before they start.
// This is super annoying, so let’s fix it with a callback.

// CALLBACK
function printStringCb(string, callback){
  setTimeout(
    () => {
      console.log(string)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll2(){
  printStringCb("A", () => {
    printStringCb("B", () => {
      printStringCb("C", () => {
        console.log("All strings printed!")
      })
    })
  })
}
printAll2()

// Well, the code is a lot uglier now, but at least it works! Each time you call printAll, you get the same result.
// The problem with callbacks is it creates something called “Callback Hell.” 
// Basically, you start nesting functions within functions within functions, and it starts to get really hard to read the code.
// Promises try to fix this nesting problem. Let’s change our function to use Promises

const printStringPr = (string) => {
    console.log("string", string)
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log(string)
                resolve()
            }, 
            Math.floor(Math.random() * 100) + 1
        )
    })
}

function printAll3(){
  printStringPr("A")
  .then(() => printStringPr("B"))
  .then(() => printStringPr("C"))
  .then(() => {
    console.log("all done")
  })
}
printAll3()

// Await is basically syntactic sugar for Promises. 
// It makes your asynchronous code look more like synchronous/procedural code, which is easier for humans to understand.
// The printString function doesn’t change at all from the promise version.

const printStringAa = (string) => {
    console.log("string", string)
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log(string)
                resolve()
            }, 
            Math.floor(Math.random() * 100) + 1
        )
    })
}

async function printAll4(){
  await printStringAa("A")
  await printStringAa("B")
  await printStringAa("C")
}
printAll4()

// The printString function doesn’t return anything and is independent, all we cared about was the order. 
// But what if you wanted to take the output of the first function, do something with it in the second function, and then pass it to the third function?
// Instead of printing the string each time, let’s make a function that will concatenate the string and pass it on.

// CALLBACK
function addStringcb(previous, current, callback){
  setTimeout(() => {
    const result = previous + current;
    console.log(result);
    callback(result);
    }, 
    Math.floor(Math.random() * 100) + 1
)}

function printAll5(){
  addStringcb("A", "B", (result) => {
    addStringcb(result, "C", (result) => {
      console.log("all done!");
    });
  });
}
printAll5()

// PROMISES
function addStringPr(previous, current){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = previous + current;
            console.log(result);
            resolve(result);
        }, Math.floor(Math.random() * 100) + 1);
    });
}

function printAll6(){
    addStringPr("A", "B")
    .then((result) => addStringPr(result, "C"))
    .then((result) => console.log("All done!"))
}
printAll6();

// ASYNC/AWAIT
function addStringAa(previous, current){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = previous + current;
            console.log(result);
            resolve(result);
        }, Math.floor(Math.random() * 100) + 1);
    });
}

async function printAll7(){
    let result = await addStringAa("A", "B")
    result = await addStringAa(result, "C")
    result = await addStringAa(result, "D")
    console.log(result)
}
printAll7();