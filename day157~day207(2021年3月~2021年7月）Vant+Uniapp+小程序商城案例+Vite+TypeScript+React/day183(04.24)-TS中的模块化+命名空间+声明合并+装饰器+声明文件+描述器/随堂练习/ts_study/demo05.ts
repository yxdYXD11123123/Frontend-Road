function decoratorOne(target: any) {
  console.dir(target);
}

@decoratorOne
class Student { }
