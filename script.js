const screen = document.getElementById('calculator-screen');
const buttons = document.getElementsByTagName('button');

const equals = document.getElementById('equals');

let firstNumber = '';
let secondNumber = '';
let sign = '';
let signPressed;
let answer;
let prevSign;
let prevSecondNumber;
let buttonsArray = [...buttons];

function init() {
	firstNumber = answer;
	prevSign = sign;
	prevSecondNumber = secondNumber;
	secondNumber = '';
	sign = '';
	signPressed;
	console.log(firstNumber, answer);
}

function allClear(allClear) {
	allClear.classList.add('ac-key-down');
	setTimeout(() => {
		allClear.classList.remove('ac-key-down');
	}, 150);
	firstNumber = '';
	secondNumber = '';
	sign = '';
	signPressed.classList.remove('operator-highlight');
	signPressed;
	screen.value = 0;
}

function keyDownHighlight(keyPressed) {
	keyPressed.classList.add('key-down');
	setTimeout(() => {
		keyPressed.classList.remove('key-down');
	}, 150);
}

function operatorKeyHighlight(operator) {
	operator.classList.add('operator-highlight');
	setTimeout(() => {
		operator.classList.remove('operator-highlight');
	}, 150);
}

function calculator() {
	if (sign === '/') {
		answer = division(firstNumber, secondNumber);
		screen.value = answer;
		init();
	}
	if (sign === '*') {
		answer = multiplication(firstNumber, secondNumber);
		screen.value = answer;
		init();
	}
	if (sign === '-') {
		answer = subtraction(firstNumber, secondNumber);
		screen.value = answer;
		init();
	}
	if (sign === '+') {
		answer = addition(firstNumber, secondNumber);
		screen.value = answer;
		init();
		console.log(answer, firstNumber, screen.value);
	}
}

const addition = (numb1, numb2) => {
	return Number(numb1) + Number(numb2);
};
// subtraction fucntion
const subtraction = (numb1, numb2) => {
	return Number(numb1) - Number(numb2);
};
// multiplication function
const multiplication = (numb1, numb2) => {
	return Number(numb1) * Number(numb2);
};
// division function
const division = (numb1, numb2) => {
	return Number(numb1) / Number(numb2);
};

buttonsArray.forEach(button => {
	// block any signs from being first
	button.addEventListener('click', function (e) {
		if (
			e.target.className === 'operator' &&
			e.target !== equals &&
			firstNumber === '' &&
			secondNumber === ''
		) {
			keyDownHighlight(e.target);
			return;
		}
		// all-clear functionality
		if (e.target.value === 'all-clear') {
			allClear(e.target);
			return;
		}
		// redo operation to answer on equals press
		if (e.target.value === '=' && firstNumber == answer) {
			sign = prevSign;
			secondNumber = prevSecondNumber;
			operatorKeyHighlight(e.target);
			calculator();
			return;
		}
		// Equals functionality
		if (e.target.value === '=') {
			operatorKeyHighlight(e.target);
			calculator();
			return;
		}
		// chaining equations functionality
		if (
			e.target.className === 'operator' &&
			sign.valueOf() !== '' &&
			firstNumber !== '' &&
			secondNumber !== ''
		) {
			calculator();
			init();
			sign += e.target.value;
			signPressed = e.target;
			signPressed.classList.add('operator-highlight');
			return;
		}
		// Second number
		if (sign.valueOf() !== '' && firstNumber !== '') {
			keyDownHighlight(e.target);
			screen.value = '';
			secondNumber += e.target.value;
			screen.value = secondNumber;
			signPressed.classList.remove('operator-highlight');
		}
		// first number(new operation w/o all-clear)
		if (
			screen.value == answer &&
			e.target.className !== 'operator' &&
			secondNumber === ''
		) {
			firstNumber = '';
			secondNumber = '';
			sign = '';
			signPressed.classList.remove('operator-highlight');
			signPressed;
			screen.value = 0;
			keyDownHighlight(e.target);
			firstNumber += e.target.value;
			screen.value = firstNumber;
			return;
		}
		// first Number
		if (e.target.className !== 'operator' && secondNumber === '') {
			keyDownHighlight(e.target);
			firstNumber += e.target.value;
			screen.value = firstNumber;
		}
		// operator
		if (e.target.className === 'operator' && e.target !== equals) {
			sign += e.target.value;
			signPressed = e.target;
			signPressed.classList.add('operator-highlight');
		}
	});
});

// Calculator App

// Master function

// addition function

// master function

// const calculate = () => {};

// testing function

// const testAddition = () => {
// 	const result1 = addition(2, 2);
// 	if (result1 === 4) {
// 		console.log('correct');
// 	} else {
// 		console.log('incorrect');
// 	}
// };
