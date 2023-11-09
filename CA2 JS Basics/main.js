//Can redefine var variables
var num = 25;
var str = "Hello World";
console.log(num);

//Cannot redefine let variables
let num2 = 25;
let str2 = "hellow w0r1d"
let isAvailable = true;
let notDefined;
let isNull = null;
let obj = {firstName: "John", lastName: "Doe"};

//If
let condition = true;
if (condition) {
    console.log("condition is true");
}

else {
    console.log("condition is false");
}


//Loops
for (i = 0; i < 5; i++) {
    console.log(i);
}

let j = 0;

while (j < 5) {
    console.log(j);
    j++;
}

//Making function
function greet(name) {
    console.log("Hello "+name);
}

greet("Jembo");

//Arrays
let fruits = ["Apple", "Orange", "Banana", "Mango"];
console.log(fruits[1]);

//Objects
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 3
}

console.log(person.age);

var varVariable = "I can be redeclared and am a var."
let letVariable = "I can't be redeclared and am a let, I can be changed."
const constVar = "I'm a const and can't be redeclared or changed."

console.log(varVariable);
console.log(letVariable);
console.log(constVar);

varVariable = "Updated var";
letVariable = "Updated let";
//constVar = "Updated const";

class Car {
    constructor (brand, model) {
        this.brand = brand;
        this.model = model;
    }

    displayCar() {
        return this.brand + " " + this.model;
    }
}

let myCar = new Car("Toyota", "Corolla");
console.log(myCar.displayCar());

//Inheritance
class Model extends Car {
    constructor (brand, model, year) {
        super(brand, model);
        this.year = year;
    }

    displayModel() {
        return this.displayCar()+ " " + this.year;
    }
}

let myCar2 = new Model("Toyoyoyo", "HUHUHUH", "2003");
console.log(myCar2.displayModel());

//Arrow Functions (lambdas??)
const arr = [1, 2, 3, 4];
const squares = arr.map((x) => x*x);
console.log(squares);

//Template Literals (printf lol)
let nameGirl = "GIRLNAME";
console.log(`Hello, ${nameGirl}!`);

//import {hello} from "./myModule.js";
//console.log(hello());