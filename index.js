let result = true;
let errorValue = null;

function checkType(type, actualValue) {
    if(typeof actualValue === "object" && typeof actualValue === typeof type) {
        return true;
    }
    else if(typeof actualValue === type) {
        return true;
    }
    result = false;
    return false;
}

function JsonSchemaCheck(schema, inputObject) {
    let schemaObj;
    try {
        schemaObj = JSON.parse(schema);
    }
    catch(err) {
        throw new Error("Invalid schema!");
    }

    recursiveChecker(schemaObj, inputObject);
    if(result != true) {
        throw new Error(`Schema didn't match with the provided object. Error when resolve value: ${errorValue} <<<<<<<<<<`);
    }
}

function recursiveChecker(schemaObj, inputObject) {

    if(typeof schemaObj !== "object" && typeof inputObject !== "object" || result == false) {
        return;
    }

    let inputKeys = Object.keys(inputObject);

    for(let i = 0; i < inputKeys.length; i++) {
        let inputValue = inputObject[inputKeys[i]];
        let schemaType = schemaObj[inputKeys[i]];
        if(checkType(schemaType, inputValue)) {
            if(typeof inputValue === "object") {
                recursiveChecker(schemaType, inputValue);
            }
        }
        else {
            errorValue = inputValue;
            return;
        }
    }
}
//USAGE
// JsonSchemaCheck("{\"name\":\"string\",\"age\":\"number\",\"nested\":{\"lastname\":\"string\",\"job\":{\"title\":\"string\", \"salary\":\"number\"}},\"array\":[\"string\",{\"test\": \"string\"}]}", {
//     name: "Pesho",
//     age: 10,
//     nested: {
//         lastname: "Petrov",
//         job: {
//             title: "Software engineer",
//             salary: 1000
//         }
//     },
//     array: [
//         "test",
//         {
//             test: "omg"
//         }
//     ]
// });

module.exports = JsonSchemaCheck;