/*
 * Filename: sophisticated_code.js
 * Description: This code is a demonstration of a complex and elaborate JavaScript program.
 * Author: [Your Name]
 * Date: [Today's Date]
 */

// Class representing a person
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName} and I'm ${this.age} years old.`);
  }
}

// Function to calculate factorial recursively
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Fibonacci series generator
function* fibonacci(n) {
  let current = 0;
  let next = 1;

  while (n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

// Generate a random number within range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create an array of Persons
const people = [
  new Person("John", "Doe", 25),
  new Person("Jane", "Smith", 30),
  new Person("Alice", "Johnson", 35),
];

// Print information about each person
people.forEach((person) => {
  person.greet();
});

// Calculate factorial of a number
const factorialResult = factorial(5);
console.log(`Factorial of 5: ${factorialResult}`);

// Generate and print Fibonacci series
const fibonacciIterator = fibonacci(10);
console.log("Fibonacci Series:");
for (let num of fibonacciIterator) {
  console.log(num);
}

// Generate random numbers and store in an array
const randomNumbers = [];
for (let i = 0; i < 10; i++) {
  randomNumbers.push(getRandomNumber(1, 100));
}
console.log("Random Numbers:", randomNumbers);

// Perform complex computational tasks
let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sin(Math.log(Math.sqrt(i)));
}

console.log("Complex computations result:", result);

// ... (more complex code goes here)

// End of code