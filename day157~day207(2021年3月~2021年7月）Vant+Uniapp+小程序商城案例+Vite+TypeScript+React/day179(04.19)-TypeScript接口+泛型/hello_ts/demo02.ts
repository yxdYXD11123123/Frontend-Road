interface carInterface {
  color: string,
  run(): void
}

let specialCar: carInterface = {
  color: '红色',
  run() { }
}

class Ben implements carInterface {
  color: string
  constructor(color: string) {
    this.color = color;
  }
  run() {
    console.log("running");
  }
}

let ben = new Ben("蓝色");
console.log(ben); // Ben { color: '蓝色' }
ben.run();
