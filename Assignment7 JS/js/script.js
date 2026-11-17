/* Challenge 1
  
Problem Description
Ask user for their name and age, then display a personalized message using console.log()


Input:
name = "Ahmed", age = "20"
Expected:
Console: "Hello Ahmed! You are 20 years old and you were born around 2006"


Input:
name = "Sara", age = "25"
Expected:
Console: "Hello Sara! You are 25 years old and you were born around 1999"
*/

/*
var name = window.prompt("please enter first name");
var age = window.prompt("please enter age");
var years = 2026 - age;
console.log(
  "Hello" +
    " " +
    name +
    "! You are" +
    " " +
    age +
    " " +
    "years old and you were born around" +
    " " +
    years,
);
*/

/*
var name = window.prompt("please enter first name");
var age = window.prompt("please enter age");
console.log(
  "Hello " +
    name +
    "! You are " +
    age +
    "years old and you were born around " +
    (2026 - age),
);
*/
/* Challenge 2

Currency converter: get amount in EGP, convert to USD, EUR, GBP. USD=47.22, EUR=54.35, GBP=61.95



Input:
egp = "1000"
Expected:
Console: "1000 EGP = $21.18 USD, €18.40 EUR, £16.14 GBP"


Input:
egp = "500"
Expected:
Console: "500 EGP = $10.58 USD, €9.20 EUR, £8.07 GBP"
*/

/*
var EGP = Number(window.prompt("please enter a Number"));
var EGP = +window.prompt("please enter a Number");
var USD = EGP / 47.22;
var EUR = EGP / 54.35;
var GBP = EGP / 61.95;
console.log(
  EGP +
    " " +
    "EGP" +
    " " +
    "=" +
    " " +
    "$" +
    USD.toFixed(2) +
    " " +
    "USD," +
    " " +
    "€" +
    EUR.toFixed(2) +
    " " +
    "EUR," +
    " " +
    "£" +
    GBP.toFixed(2) +
    " " +
    "GBP",
);
*/

/*
var EGP = Number(window.prompt("please enter a Number"));
var EGP = +window.prompt("please enter a Number");

var USD = EGP / 47.22;
var EUR = EGP / 54.35;
var GBP = EGP / 61.95;

console.log(
  `${EGP} EGP = $${USD.toFixed(2)} USD, €${EUR.toFixed(2)} EUR, £${GBP.toFixed(2)} GBP`,
);
*/

/* Challenge 3

Problem Description
Get a number from user, check if it's even or odd, display result


Input:
"24"
Expected:
Console: "24 is an even number"


Input:
"17"
Expected:
Console: "17 is an odd number"
Click "Run" to test this case
*/

/*
var number = Number(window.prompt("please enter a number"));

if (number % 2 == 0) {
  console.log(`${number} is an even number`);
} else {
  console.log(`${number} is an odd number`);
}

if (number % 2 == 0) {
  console.log(number + " " + "is an even number");
} else {
 console.log(number + " " + "is an odd number");
}
*/

/* Challenge 4

Problem Description
Declare a variable `hour` and assign it a number between
 0 and 23. Use an `if-else if-else` statement to log "Good morning!" 
(0-11), "Good afternoon!" (12-17),
 or "Good evening!" (18-23)

 
Input:
hour = 14
Expected:
Good afternoon!
Click "Run" to test this case
2
Test 2
Not Run
Input:
hour = 8
Expected:
Good morning!
Click "Run" to test this case
3
Test 3
Not Run
Input:
hour = 20
Expected:
Good evening!
Click "Run" to test this case
*/

/*
var hour = Number(window.prompt("please enter a number"));

if (hour >= 0 && hour <= 11) {
  console.log("Good morning!");
} else if (hour > 11 && hour <= 17) {
  console.log("Good afternoon!");
} else {
  console.log("Good evening!");
}

*/

/* Challenge 5


Problem Description
Ask for three subject scores, calculate average and display pass/fail status (pass >= 50)



Input:
score1 = "60", score2 = "70", score3 = "55"
Expected:
Console: "Average: 61.67, Status: Pass"
Click "Run" to test this case
2
Test 2
Not Run
Input:
score1 = "40", score2 = "45", score3 = "35"
Expected:
Console: "Average: 40.00, Status: Fail"
Click "Run" to test this case
3
Test 3
Not Run
Input:
score1 = "80", score2 = "90", score3 = "85"
Expected:
Console: "Average: 85.00, Status: Pass"
Click "Run" to test this case
*/

/*

var score1 = Number(window.prompt("please enter a score1"));
var score2 = Number(window.prompt("please enter a score2"));
var score3 = Number(window.prompt("please enter a score3"));
var fullScores = score1 + score2 + score3;
var Avg = fullScores / 3;

if (Avg >= 50) {
  console.log(`Average: ${Avg.toFixed(2)}, Status: Pass`);
} else {
  console.log(`Average: ${Avg.toFixed(2)}, Status: Fail`);
}

*/

/* Challenge 6

Problem Description
Get two numbers and an operator (+,-,*,/), perform calculation and display result

Input:
num1 = "10", num2 = "5", operator = "+"
Expected:
Console: "10 + 5 = 15"
Click "Run" to test this case
2
Test 2
Not Run
Input:
num1 = "20", num2 = "4", operator = "/"
Expected:
Console: "20 / 4 = 5"
Click "Run" to test this case
3
Test 3
Not Run
Input:
num1 = "7", num2 = "3", operator = "*"
Expected:
Console: "7 * 3 = 21"
Click "Run" to test this case
*/

/*
var num1 = Number(window.prompt("please enter number1"));
var num2 = Number(window.prompt("please enter number2"));
var operator = window.prompt("please enter a operator");
switch (operator) {
  case "+":
    var result = num1 + num2;
    console.log(`${num1} + ${num2} = ${result}`);
    break;
  case "-":
    var result = num1 - num2;
    console.log(`${num1} - ${num2} = ${result}`);
    break;
  case "*":
    var result = num1 * num2;
    console.log(`${num1} * ${num2} = ${result}`);
    break;
  default:
    var result = num1 / num2;
    console.log(`${num1} / ${num2} = ${result}`);
}

*/

/* Challenge 7

Problem Description
Get a number, print its multiplication table from 1 to 10 with formatting

1
Test 1
Not Run
Input:
num = "7"
Expected:
Console: "7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70"
Click "Run" to test this case
2
Test 2
Not Run
Input:
num = "5"
Expected:
Console: "5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50"
Click "Run" to test this case
3
Test 3
Not Run
Input:
num = "3"
Expected:
Console: "3 x 1 = 3\n3 x 2 = 6\n...\n3 x 10 = 30"
Click "Run" to test this case
*/
/*
var number = Number(window.prompt("please enter a number"));
var result = "";
for (var i = 1; i <= 10; i++) {
  result += `${number} x ${i} = ${number * i} \n`;
}
console.log(result);
*/

/*  Challenge 8

for (var i = 2; i <= 10; i += 2) {
  console.log(i);
}
var result = "";

for (var i = 2; i <= 10; i += 2) {
  result += i;
}

console.log(result);
*/

/* Challenge 9

var factorial = 1;
for (var i = 1; i <= 5; i++) {
  factorial *= i;
}
console.log(factorial);
*/

/* Challenge 10

var n = 0;

while (n * n <= 50) {
  n++;
}

console.log(n);
*/

/* Challenge 11
var num1 = Number(window.prompt("please enter a num1"));
var num2 = Number(window.prompt("please enter a num2"));
num1 = num1 + num2;
num2 = num1 - num2;
num1 = num1 - num2;
console.log(`After Swapping: num1=${num1}, num2=${num2}`);
*/

/* Challenge 12

var age = Number(window.prompt("please enter your age"));
var ticket = window.prompt("please enter your Boolean");

if (age >= 18 || ticket == "yes") {
  console.log("Access granted: true");
} else {
  console.log("Access granted: false");
}
*/

// Challenge 13
/*
var num1 = Number(window.prompt("please enter a number1"));
var num2 = Number(window.prompt("please enter a number2"));
var num3 = Number(window.prompt("please enter a number3"));

if (num1 > num2 && num1 > num3) {
  console.log(`Largest number is: ${num1}`);
} else if (num2 > num1 && num2 > num3) {
  console.log(`Largest number is: ${num2}`);
} else {
  console.log(`Largest number is: ${num3}`);
}
*/
/*
var num1 = Number(window.prompt("please enter a number1"));
var num2 = Number(window.prompt("please enter a number2"));
var num3 = Number(window.prompt("please enter a number3"));

if (num1 > num2) {
  if (num1 > num3) {
    console.log(`Largest number is: ${num1}`);
  } else {
    console.log(`Largest number is: ${num3}`);
  }
} else {
  if (num2 > num3) {
    console.log(`Largest number is: ${num2}`);
  } else {
    console.log(`Largest number is: ${num3}`);
  }
}
*/

/* Challenge 14

 var hours = Number(window.prompt("please enter hours worked"));
 var rate = Number(window.prompt("please enter hourly rate"));

 var regular;
 var overtime;
 var total
 if (hours > 40) {
   regular = 40 * rate;
   overtime = (hours - 40) * (rate * 1.5);
   total = regular + overtime;
 } else {
   regular = hours * rate;
   overtime = 0;
   total = regular;
 
 console.log(`Regular: $${regular}, Overtime: $${overtime}, Total: $${total}`);
*/

/* Challenge 15

var weight = Number(window.prompt("please enter a weight"));
var height = Number(window.prompt("please enter a height"));

var bmi = weight / (height * height);

if (bmi < 18.5) {
  console.log(`BMI: ${bmi.toFixed(2)} - Underweight`);
} else if (bmi >= 18.5 && bmi <= 24.9) {
  console.log(`BMI: ${bmi.toFixed(2)} - Normal weight`);
} else if (bmi >= 25 && bmi <= 29.9) {
  console.log(`BMI: ${bmi.toFixed(2)} - Overweight`);
} else {
  console.log(`BMI: ${bmi.toFixed(2)} - Obese`);
}

var weight = Number(window.prompt("please enter a weight"));
var height = Number(window.prompt("please enter a height"));

var bmi = weight / (height * height);

if (bmi < 18.5) {
  console.log(`BMI: ${bmi.toFixed(2)} - Underweight`);
} else if (bmi >= 18.5 && bmi <= 24.9) {
  console.log(`BMI: ${bmi.toFixed(2)} - Normal weight`);
} else if (bmi >= 25 && bmi <= 29.9) {
  console.log(`BMI: ${bmi.toFixed(2)} - Overweight`);
} else {
  console.log(`BMI: ${bmi.toFixed(2)} - Obese`);
}

*/

/* Challenge 16
var amount = Number(window.prompt("please enter purchase amount"));

var tax = amount * 0.1;
var discount = 0;

if (amount > 100) {
  discount = amount * 0.05;
}
var final = amount + tax - discount;
console.log(
  `Subtotal: $${amount}, Tax: $${tax}, Discount: $${discount}, Final: $${final}`,
);
*/

// Challenge 17

// var currentBalance = Number(window.prompt("Enter current balance"));
// var operation = Number(window.prompt("Choose operation numbers"));

// switch (operation) {
//   case 1:
//     console.log(`Your balance is: $${currentBalance}`);
//     break;

//   case 2:
//     var amount = Number(window.prompt("Enter amount"));
//     currentBalance = currentBalance - amount;
//     console.log(`Withdrew $${amount}. New balance: $${currentBalance}`);
//     break;

//   case 3:
//     var amount = Number(window.prompt("Enter amount"));
//     currentBalance = currentBalance + amount;
//     console.log(`Deposited $${amount}. New balance: $${currentBalance}`);
//     break;

//   default:
//     console.log("Invalid operation");
// }

/*
var currentBalance = 500;
var operation = Number(window.prompt("Choose operation"));

switch (operation) {
  case 1:
    console.log(`Your balance is: $${currentBalance}`);
    break;

  case 2:
    var amount = Number(window.prompt("Enter amount"));
    currentBalance = currentBalance - amount;
    console.log(`Withdrew $${amount}. New balance: $${currentBalance}`);
    break;

  case 3:
    var amount = Number(window.prompt("Enter amount"));
    currentBalance = currentBalance + amount;
    console.log(`Deposited $${amount}. New balance: $${currentBalance}`);
    break;

  default:
    console.log("Invalid operation");
    break;
}
*/

/* Challenge 18

var result = "";

for (var i = 1; i <= 100; i++) {
  if (i % 3 == 0 && i % 5 == 0) {
    result += "FizzBuzz ";
  } else if (i % 3 == 0) {
    result += "Fizz ";
  } else if (i % 5 == 0) {
    result += "Buzz ";
  } else {
    result += i + " ";
  }
}

console.log(result.trim());
*/

//  Challenge 19

// var rows = Number(window.prompt("Enter number of rows"));

// for (var i = 1; i <= rows; i++) {
//   var stars = "";

//   for (var j = 1; j <= i; j++) {
//     stars += "*";
//   }

//   console.log(stars);
// }
/*
var rows = Number(window.prompt("Enter number of rows"));
var result = "";

for (var i = 1; i <= rows; i++) {
  for (var j = 1; j <= i; j++) {
    result += "*";
  }

  result += "\n";
}

console.log(result.trim());
*/

/* Challenge 20

var rows = Number(window.prompt("Enter number of rows"));
var result = "";

for (var i = 1; i <= rows; i++) {

  طباعة المسافات
  for (var j = 1; j <= rows - i; j++) {
    result += " ";
  }

  طباعة النجوم
  for (var j = 1; j <= i; j++) {
    result += "*";
  }

  الانتقال للسطر التالي
  result += "\n";
}

console.log(result.trimEnd()); 
*/
