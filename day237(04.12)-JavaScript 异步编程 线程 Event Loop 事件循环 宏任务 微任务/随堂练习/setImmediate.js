function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
  console.log("ok");
}

// console.log("start");
// sleep(2000);
// console.log("end");

console.log("start");
setImmediate(sleep, 2000);
console.log("end");
