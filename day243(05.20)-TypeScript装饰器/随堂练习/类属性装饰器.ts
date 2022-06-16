class Boat2 {
  @testDecorator
  color: string = "red";
}

function testDecorator(target: any, key: string) {
  console.log(target, key);
  // {} color
}
