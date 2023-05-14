let result = true;
let errorKey = null;
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
        throw new Error(`Schema didn't match with the provided object. Error when resolve ${errorKey} >>>>>>>>>> ${errorValue}`);
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
            errorKey = inputKeys[i];
            errorValue = inputValue;
            return;
        }
    }
}

JsonSchemaCheck("{\"name\":\"string\",\"age\":\"number\",\"nested\":{\"lastname\":\"string\",\"job\":{\"title\":\"string\", \"salary\":\"number\"}}}", {
    name: "Pesho",
    age: 10,
    nested: {
        lastname: "Petrov",
        job: {
            title: 1,
            salary: 1000
        }
    }
});

module.exports = JsonSchemaCheck;