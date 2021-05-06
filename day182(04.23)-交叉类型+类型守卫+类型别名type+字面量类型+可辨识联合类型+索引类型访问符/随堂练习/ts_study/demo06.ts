let getNewObject = <T, U>(target: T, source: U) => {
  return Object.assign(target, source);
}

console.log(getNewObject({ a: 1 }, { b: '2' }));
