# Install
Run 'npm i json-validator-lightweight' in the terminal
# Usage
````javascript
let schema = "{\"name\":\"string\",\"age\":\"number\",\"information\":{\"lastname\":\"string\",\"job\":{\"title\":\"string\", \"salary\":\"number\"}},\"array\":[\"string\",\"string\"]}";

let object = {
    name: "John",
    age: 10,
    information: {
        lastname: "Doe",
        job: {
            title: "Software Engineer",
            salary: 100000
        }
    },
    friends: [
        "Ronald",
        "Jeff"
    ]
};

try {
    JsonSchemaCheck(schema, object);
}
catch(err) {
    //Error thrown by validator if schema didn't match the object
}
````
