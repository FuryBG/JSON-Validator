let result = true;
let errorKey = null;
let errorValue = null;

function checkType(type, actualValue) {
    if(typeof actualValue === "object") {
        if(typeof actualValue === typeof type) {
            return true;
        }
    }
    else {
        if(typeof actualValue === type) {
            return true;
        }
    }
    result = false;
    return false;
}

function JsonSchemaCheck(schema, inputObject) {
    let schemaObj = JSON.parse(schema);
    check(schemaObj, inputObject);
    console.log(result);
}


function check(schemaObj, inputObject) {

    if(typeof schemaObj !== "object" || typeof inputObject !== "object") {
        return;
    }

    let inputKeys = Object.keys(inputObject);
    let schemaKeys = Object.keys(schemaObj);

    for(let i = 0; i < inputKeys.length; i++) {
        let inputValue = inputObject[inputKeys[i]];
        let schemaType = schemaObj[inputKeys[i]];
        if(checkType(schemaType, inputValue)) {
            if(typeof inputValue === "object") {
                check(schemaType, inputValue);
            }
        }
        else {
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
            title: "developer",
            salary: 1000
        }
    }
});

module.exports = JsonSchemaCheck;