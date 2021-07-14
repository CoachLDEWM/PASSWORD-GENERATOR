// Assignment Code
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var special = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

//Get password options from the user
function getOptions() {
  var length = prompt("How many characters would you like your password to have?"); 

  //Error Checking
  //Make sure password length is a number
  if (isNaN(length) === true) {
    alert('Password length must be provided as a number');
    return;
  }

  //Check if password length is too small
  if (length < 8) {
    alert('Password length must be at least 8 characters');
    return;
  }

  //Check if password length is too large
  if (length > 128) {
    alert('Password length must less than 129 characters');
    return;
  }

  //Boolean variable to confirm whether or not a special character is included
  var hasSpecial = confirm(
    'Click OK to confirm including special characters.'
  );

  //Boolean variable to confirm whether or not an number is included
  var hasNums = confirm(
    'Click OK to confirm including numeric characters.'
  );

  //Boolean variable to confirm whether or not an lower case character is included
  var hasLower = confirm(
    'Click OK to confirm including lowercase characters.'
  );

  //Boolean variable to confirm whether or not an upper case character is included
  var hasUpper = confirm(
    'Click OK to confirm including uppercase characters.'
  );

  //Check to see if the user inlcuded any type of character.  If not the user will be asked to select at least one type
  if (
    hasSpecial === false &&
    hasNums === false &&
    hasLower === false &&
    hasUpper === false
  ) {
    alert('Must select at least one character type');
    return;
  }

  // Object to store user input
  var passwordOptions = {
    length: length,
    hasSpecial: hasSpecial,
    hasNums: hasNums,
    hasLower: hasLower,
    hasUpper: hasUpper
  };

  return passwordOptions;
}//END GETOPTIONS

//Function that gets a random index
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}

//Function that generates the password
function generatePassword() {
  var options = getOptions();
  //Variable to store the password
  var result = [];

  //Array that stores the types of characters that will be included in the password
  var possibleCharacters = [];

  //Array that has each type of character chosen by the user
  var guaranteedCharacters = [];

  //Adds array of special characters into the array based on user input
  //Push random special character
  if (options.hasSpecial) { 
    possibleCharacters = possibleCharacters.concat(special);
    guaranteedCharacters.push(getRandom(special));
  }

  //Adds array of nums into the array based on user input
  //Push random nums
  if (options.hasNums) {
    possibleCharacters = possibleCharacters.concat(nums);
    guaranteedCharacters.push(getRandom(nums));
  }

  //Adds array of lower case characters into the array based on user input
  //Push random lower case character
  if (options.hasLower) {
    possibleCharacters = possibleCharacters.concat(lower);
    guaranteedCharacters.push(getRandom(lower));
  }

  //Adds array of upper case characters into the array based on user input
  //Push random upper case character
  if (options.hasUpper) {
    possibleCharacters = possibleCharacters.concat(upper);
    guaranteedCharacters.push(getRandom(upper));
  }

  //For loop through password length from the options object randomly and concatenating those characters into the result variable
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);

    result.push(possibleCharacter);
  }

  //Put one of each character into result
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  //Turn result to a string and pass to writePassword()
  return result.join('');
}

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);