
exports.Sum = function(num1, num2){
	return num1+num2;
}

exports.SumOfArray = function(arrayOfNums){
	var sum_of_array = 0;
	for(i=0;i<arrayOfNums.length;i++){
		sum_of_array += arrayOfNums[i];
	}
	return sum_of_array;
}

// Sum only the unique numbers in the array.
// Ex: If array is [2,3,3,2], the sum is 2+3=5

exports.SumOfUniqueNumbers = function(arrayOfNums){
	var array = [];
	var sum_of_array=0;
	for(i=0;i<arrayOfNums.length;i++){
		if(array.indexOf(arrayOfNums[i]) == -1){
			array.push(arrayOfNums[i]);
		}
	}
	for(i=0;i<array.length;i++){
		sum_of_array+=array[i];
	}
	return sum_of_array;
}

exports.ReverseString = function(str){
	return str.split('').reverse().join('');
}


exports.ReverseArrayOfStrings = function(arrayOfStrings){
	JSIntro = require("./JSIntro.js")
	var reversed_strings = [];
	for(i=0;i<arrayOfStrings.length;i++){
		//reversed_strings.push(arrayOfStrings[i].split('').reverse().join(''));
		reversed_strings.push(JSIntro.ReverseString(arrayOfStrings[i]));
	}
	return reversed_strings;
}
