let num = 1;

function fn() {
  return 1 + 3
}

enum NumEnum {
  A = num,
  B = 1,
  C = A
}

enum StrEnum {
  A = "A",
  B = 1,
  C = A
}

enum DifEnum {
  A,
  B = "B"
}

type OneType = "1" | "2";



let xxx: StrEnum = StrEnum.B;

let yyy: StrEnum.A | StrEnum.B | StrEnum.C = StrEnum.B;


