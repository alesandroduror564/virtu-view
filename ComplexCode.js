/*
* Filename: ComplexCode.js
* Description: A complex and elaborate code showcasing various JavaScript concepts and functionalities.
*/

// Class definition for a Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Function to generate a random number between two values
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Array of names
const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

// Creating instances of the Person class and calling the sayHello method
const people = [];
for (let i = 0; i < 5; i++) {
  const name = names[getRandomNumber(0, names.length - 1)];
  const age = getRandomNumber(20, 40);
  const person = new Person(name, age);
  people.push(person);
}
people.forEach(person => person.sayHello());

// Function to calculate the factorial of a number recursively
function factorial(n) {
  if (n === 0)
    return 1;
  else
    return n * factorial(n - 1);
}

console.log(`Factorial of 5 is: ${factorial(5)}`);

// Function to check if a string is a palindrome
function isPalindrome(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

console.log(`Is "racecar" a palindrome? ${isPalindrome('racecar')}`);

// Function to check if a number is prime
function isPrime(num) {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0)
      return false;
  }
  return num > 1;
}

console.log(`Is 17 a prime number? ${isPrime(17)}`);

// Function to calculate the sum of an array of numbers
function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

const numbers = [1, 2, 3, 4, 5];
console.log(`Sum of [1, 2, 3, 4, 5] is: ${sumArray(numbers)}`);

// Class definition for a Rectangle
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.width * this.height;
  }
  
  get perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rectangle = new Rectangle(10, 5);
console.log(`Area of the rectangle: ${rectangle.area}`);
console.log(`Perimeter of the rectangle: ${rectangle.perimeter}`);

// Function to sort an array in ascending order
function bubbleSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const unsortedArray = [5, 3, 9, 1, 7];
const sortedArray = bubbleSort(unsortedArray);
console.log(`Sorted array: ${sortedArray}`);

// ... More complex and elaborate code goes here ...