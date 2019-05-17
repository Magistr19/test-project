'use strict';

let obj1 = {
	event: 'click',
	element: 'span',
	data: {
		 additional: {
				info: 'hero',
				format: 'uppercase'
		 },
		 target: '_blank'
	}
};

let obj2 = {
	event: 'click',
	element: 'a',
	url: '//www.ringcentral.com',
	data: {
		 additional: {
				info: 'cta',
				format: 'uppercase'
		 }
	}
};


let result = mergeObjects(obj1, obj2);
console.log(result);

/**
* Create new object with copied proporties from first and second objects. Validate function params
*
* @param {obj} - first object
* @param {obj} - second object
* @return {object} - new object with copied proporties
*/ 
function mergeObjects(obj1, obj2) {
	if (!isObject(obj1) || !isObject(obj2)) {
		console.error('Function mergeObjects received no object argument');
		return null;
	} 

	return deepMerge(obj1, obj2);
}


/**
* Checking is the param object
*
* @param {any} - any type of data
* @return {boolean} - true if the param is object
*/ 
function isObject(value) {
	return (Object.prototype.toString.call(value) === '[object Object]');
}


/**
* Create new object with copied proporties from first and second objects
*
* @param {obj} - first object
* @param {obj} - second object
* @return {object} - new object with copied proporties
*/ 
function deepMerge(obj1, obj2) {
	let newObj = {};

	for (let key in obj1) { //Copy obj1 proporties into newObj
		newObj[key] = obj1[key];
	}

	for (let key in obj2) {
		newObj[key] = (isObject(obj1[key])) ? deepMerge(obj1[key], obj2[key]) : obj2[key]; //If obj1 already has a property - object as a obj2 with the same names, do recursion with the next level. 
	}																																										 //If no, write new property in newObj

	return newObj;
}










// А это ход моих мыслей до рефакторинга, без рекурсии:

// function mergeObjects(obj1, obj2) {
// 	if (!isObject(obj1) || !isObject(obj2)) {
// 		console.error('Function mergeObjects received no object argument');
// 		return null;
// 	} 

// 	let newObj = {};

// 	for (let key in obj1) { // Copy obj1 in empty newObj
// 		newObj[key] = obj1[key];
// 	}

// 	for (let key in obj2) { // Obj2 copy into newObj, first level copy
// 		if (isObject(newObj[key])) { // If newObj already has a property object as a obj2 with the same names. Second level copy
// 			let secondLvlNewObj = newObj[key];
// 			let secondLvlObj2 = obj2[key];

// 			for (let key in secondLvlObj2) { 
// 				if (isObject(secondLvlNewObj[key])) { // If newObj already has a property object as a obj2 with the same names. Third level copy
// 					let thirdLvlNewObj = secondLvlNewObj[key];
// 					let thirdLvlObj2 = secondLvlObj2[key];

// 					for (let key in thirdLvlObj2) {
// 						thirdLvlNewObj[key] = thirdLvlObj2[key];
// 					}

// 				} else {
// 					secondLvlNewObj[key] = secondLvlObj2[key];
// 				}
// 			}

// 		} else {
// 			newObj[key] = obj2[key];
// 		}
// 	}


// 	return newObj;
// }