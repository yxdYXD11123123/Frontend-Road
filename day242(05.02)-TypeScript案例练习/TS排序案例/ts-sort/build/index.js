"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CharacterCollection_1 = require("./CharacterCollection");
const Sorter_1 = require("./Sorter");
// let arr = [10, 5, 8, -3];
// const numbersCollection = new NumbersCollection(arr);
// const sorter = new Sorter(numbersCollection);
const str = "strIng";
const characterCollection = new CharacterCollection_1.CharacterCollection(str);
const sorter = new Sorter_1.Sorter(characterCollection);
// 排序
sorter.sort();
console.log(sorter.collection);
