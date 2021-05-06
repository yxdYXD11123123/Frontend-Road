interface aInterface {
  a: string
}

interface cInterface {
  c: string
}

interface bInterface extends aInterface, cInterface {
  b: string
}

let obj: bInterface = {
  a: '',
  b: '',
  c: ''
}

class Cat implements bInterface {
  a: string
  b: string
  c: string
  constructor(a: string, b: string, c: string) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}