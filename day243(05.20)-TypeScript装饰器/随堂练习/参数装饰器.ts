class Params {
  polit(@parameterDecorator speed: string) {
    console.log(speed);
  }
}

function parameterDecorator(target: any, key: string) {}
