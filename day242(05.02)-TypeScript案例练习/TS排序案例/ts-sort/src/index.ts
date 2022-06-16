import { CharacterCollection } from "./CharacterCollection";
import { NumbersCollection } from "./NumbersCollection";

// let arr = [10, 5, 8, -3];
// const numbersCollection = new NumbersCollection(arr);

// const sorter = new Sorter(numbersCollection);

const str = "strIng";

const characterCollection = new CharacterCollection(str);

// 排序
characterCollection.sort();

console.log(characterCollection.data);
