"use strict";
let num = 1;
function fn() {
    return 1 + 3;
}
var NumEnum;
(function (NumEnum) {
    NumEnum[NumEnum["A"] = num] = "A";
    NumEnum[NumEnum["B"] = 1] = "B";
    NumEnum[NumEnum["C"] = NumEnum.A] = "C";
})(NumEnum || (NumEnum = {}));
var StrEnum;
(function (StrEnum) {
    StrEnum["A"] = "A";
    StrEnum[StrEnum["B"] = 1] = "B";
    StrEnum["C"] = "A";
})(StrEnum || (StrEnum = {}));
var DifEnum;
(function (DifEnum) {
    DifEnum[DifEnum["A"] = 0] = "A";
    DifEnum["B"] = "B";
})(DifEnum || (DifEnum = {}));
let xxx = StrEnum.B;
let yyy = StrEnum.B;
