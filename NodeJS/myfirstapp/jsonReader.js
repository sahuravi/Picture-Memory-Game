let mappingJson = require("./moveChellMap.json");
let configJson = require("./moveCellContentUiConfig.json");
const translators = require("./moveChellTranslators.js");


let viewsArray = configJson.Views.View;

const updateJson = function(mappingJson) {
	for(let state in mappingJson) {	//this loop is for each states.

		let stateData = mappingJson[state];
		for(let comp in stateData) {	// this loop is for each component.
			let compData = stateData[comp];
			let initialData = compData.initial;
			let finalData = compData.final;

			let initialAttributes = initialData.attr;
			//let initialAttributeSets = initialData.attr-set;

			//let finalAttributes = finalData.attr;
			//let finalAttributeSets = finalData.attr-set;

			//For initial attrubutes.
			let node = mappingJson[state][comp].initial.attr;
			for(let attrName in initialAttributes) {
				let attrData = initialAttributes[attrName];
				let value = attrData.value;
				if(typeof value !== 'object') {
					
					node[attrName].value = getValue(value);
					//console.log(node[attrName].value);
				}
				else {
					if(value['function-name'] !== undefined) {
						let functionName = value['function-name'];
						let paramArray = value.params;
						for(param in paramArray) {
							value = paramArray[param];
							node[attrName].value = getValue(value);
						}
					}
					else {
						//handle for expression.
					}
				}
			}


			//console.log(JSON.stringify(initialData));
			//console.log(JSON.stringify(finalData));
		}
		
	}
	return mappingJson;
};

let firstLevelValue = function(arr) {

};

let secondLevelValue = function(arr) {
	
};
let thirdLevelValue = function(arr) {
	let view = viewsArray[arr[0]-1];
	let comp = view.comps.comp[arr[1]-1];
	let item = comp.items[arr[2]-1];
	value = item.val;
	return value;
};
let fourthLevelValue = function(arr) {
	
};

let getValue = function(value) {
	let arr = value.split('.');
	switch(arr.length) {
		case 1:
			value = firstLevelValue(arr);
			break;
		case 2:
			value = secondLevelValue(arr);
			break;
		case 3:
			value = thirdLevelValue(arr);
			break;
		case 4:
			value = fourthLevelValue(arr);
			break;
	}
	return value;
}

let updatedJson = updateJson(mappingJson);

console.log(JSON.stringify(updatedJson));