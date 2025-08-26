const questions = [
	{
		id: 0,
		question: 'What is the difference between var, let, and const?',
		answer: 'In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified.',
	},
	{
		id: 1,
		question: 'What is JavaScript?',
		answer: 'JavaScript is a lightweight, interpreted programming language primarily used to add interactivity and dynamic behavior to websites.',
	},
	{
		id: 2,
		question: 'What are JavaScript data types?',
		answer: 'The main primitive data types are: string, number, boolean, null, undefined, symbol, and bigint. Non-primitive types include objects and arrays.',
	},
	{
		id: 3,
		question: 'What is the difference between == and === in JavaScript?',
		answer: '== checks for equality after type conversion, while === checks for strict equality without converting types.',
	},
	{
		id: 4,
		question: 'What is a closure in JavaScript?',
		answer: 'A closure is a function that retains access to variables from its lexical scope, even when the function is executed outside that scope.',
	},
	{
		id: 5,
		question: 'What is the difference between var, let, and const?',
		answer: 'var has function scope and is hoisted, let has block scope, and const also has block scope but cannot be reassigned.',
	},
	{
		id: 6,
		question: 'What is the difference between null and undefined?',
		answer: "undefined means a variable has been declared but not assigned a value, while null is an assignment value that represents 'no value'.",
	},
	{
		id: 7,
		question: 'What is hoisting in JavaScript?',
		answer: "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope during compilation.",
	},
	{
		id: 8,
		question: 'What are template literals?',
		// eslint-disable-next-line no-template-curly-in-string
		answer: 'Template literals are string literals enclosed by backticks (`) that allow embedded expressions using ${expression}.',
	},
	{
		id: 9,
		question: 'What is an arrow function?',
		answer: 'Arrow functions are a shorter syntax for writing functions and do not bind their own this value.',
	},
	{
		id: 10,
		question:
			'What is the difference between synchronous and asynchronous code?',
		answer: 'Synchronous code runs sequentially, blocking further execution until completion, while asynchronous code allows non-blocking execution using callbacks, promises, or async/await.',
	},
	{
		id: 11,
		question: 'What are JavaScript promises?',
		answer: 'Promises represent a value that may be available now, later, or never. They are used to handle asynchronous operations.',
	},
	{
		id: 12,
		question: 'What is async/await in JavaScript?',
		answer: 'async/await is syntax that simplifies working with promises. async defines a function returning a promise, and await pauses execution until the promise resolves.',
	},
	{
		id: 13,
		question: 'What is the difference between for...in and for...of loops?',
		answer: 'for...in iterates over the enumerable properties of an object, while for...of iterates over the values of an iterable object like arrays or strings.',
	},
	{
		id: 14,
		question: 'What is event bubbling in JavaScript?',
		answer: 'Event bubbling is a mechanism where an event starts at the deepest target element and propagates up to its ancestors in the DOM tree.',
	},
	{
		id: 15,
		question:
			'What is the difference between localStorage and sessionStorage?',
		answer: 'Both are Web Storage APIs, but localStorage stores data with no expiration, while sessionStorage stores data only for the current session.',
	},
	{
		id: 16,
		question: 'What is the difference between map() and forEach()?',
		answer: 'forEach() executes a function for each array element but returns undefined, while map() creates a new array with the results of calling a function on each element.',
	},
	{
		id: 17,
		question: 'What are JavaScript modules?',
		answer: 'Modules are reusable pieces of code that can be exported from one file and imported into another using import and export statements.',
	},
	{
		id: 18,
		question:
			'What is the difference between function declaration and function expression?',
		answer: 'Function declarations are hoisted and can be used before definition, while function expressions are not hoisted and must be defined before use.',
	},
	{
		id: 19,
		question:
			'What is the difference between shallow copy and deep copy in JavaScript?',
		answer: 'A shallow copy copies only the first level of properties, while a deep copy recursively copies all nested objects and arrays.',
	},
];

export default questions;
