# DigiBP Postman

[![DigiBP GitHub](https://img.shields.io/badge/DigiBP-GitHub-lightgrey.svg?longCache=true)](https://github.com/DigiBP)
[![DigiBP Portal](https://img.shields.io/badge/DigiBP-Portal-brightgreen.svg?longCache=true)](https://digibp.github.io)
[![DigiBP Wiki](https://img.shields.io/badge/DigiBP-Wiki-yellow.svg?longCache=true)](https://github.com/DigiBP/digibp.github.io/wiki)
[![DigiBP Camunda Template](https://img.shields.io/badge/DigiBP-Camunda%20Template-red.svg?longCache=true)](https://github.com/DigiBP/digibp-camunda-template)
[![DigiBP Camunda Examples](https://img.shields.io/badge/DigiBP-Camunda%20Examples-blue.svg?longCache=true)](https://github.com/DigiBP/digibp-camunda-examples)


This repository contains Postman collections and environment code.

#### Contents:
- [Camunda Environment](#camunda-environment)
    - [PutsReq Bucket](#putsreq-bucket)
    - [Example](#example)

## Camunda Environment

### PutsReq Bucket

```JavaScript
const parsedBody = JSON.parse(request.body);
    
// Build a response
if (parsedBody.variableA && parsedBody.variableB) {
    response.status = 200;
    response.headers['Content-Type'] = 'application/json';
    response.body = {
        variableA: parsedBody.variableA + " ECHO!!!",
        variableB: parsedBody.variableB  + " ECHO!!!",
        businessKey: parsedBody.businessKey // optional
    };
} else {
    response.status = 404;
    response.headers = {};
    response.body = 'not found';
}
```

```JavaScript
if (request.headers['AUTHORIZATION'] == "Bearer secret") {
    const parsedBody = JSON.parse(request.body);
    
    // Build a response
    if (parsedBody.variableA && parsedBody.variableB) {
        response.status = 200;
        response.headers['Content-Type'] = 'application/json';
        response.body = {
            variableA: parsedBody.variableA + " ECHO!!!",
            variableB: parsedBody.variableB  + " ECHO!!!",
            businessKey: parsedBody.businessKey // optional
        };
    } else {
        response.status = 404;
        response.headers = {};
        response.body = 'not found';
    }
} else {
    response.status = 401;
    response.headers = {};
    response.body = 'Unauthorized';
}
```

### Example

```JavaScript
// Connector-START • Camunda HTTP Connector JavaScript emulation:
eval(pm.environment.get("camunda"));
// Connector-END

// Test-Data-START • Initialise process variables, and (optionally) business key and/or process id:
processVariableA = "Data A";
processVariableB = "Data B";
execution.setBusinessKey("case-001");
// Test-Data-END

// Service-Task-Input-START • Camunda HTTP Connector Input Parameter payload Script:
out = JSON.stringify({
    "variableA": processVariableA,
    "variableB": processVariableB,
    "businessKey": execution.getBusinessKey()
});
// Service-Task-Input-END

// Body-START • Postman Body {{payload}}:
payload.set(out);
// Body-END 
```

```JavaScript
// Connector-START • Camunda HTTP Connector JavaScript emulation:
eval(pm.environment.get("camunda"));
// Connector-END

// Service-Task-Output-START • Camunda HTTP Connector Output Parameter processVariableA Script:
object = JSON.parse(response);
processVariableA = object.variableA;
// Service-Task-Output-END

// Service-Task-Output-START • Camunda HTTP Connector Output Parameter processVariableB Script:
object = JSON.parse(response);
processVariableB = object.variableB;
// Service-Task-Output-END

// Test-START • Postman Test:
pm.test("Test processVariableA: " + processVariableA, function() {
    pm.expect(processVariableA).to.include("ECHO");
});
pm.test("Test processVariableB: " + processVariableB, function() {
    pm.expect(processVariableB).to.include("ECHO");
});
pm.test("Test businessKey: " + JSON.parse(response).businessKey, function() {
    pm.expect(JSON.parse(response).businessKey).to.include("case-001");
});
pm.test("Test statusCode: " + statusCode, function() {
    pm.expect(statusCode).to.be.ok;
});
// Test-END
```