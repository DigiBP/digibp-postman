/*
 * Copyright (c) 2018. University of Applied Sciences and Arts Northwestern Switzerland FHNW.
 * All rights reserved.
 */

var execution = new class Execution {
    constructor() {
        this.data = new Map();
    }

    getVariable(name) {
        return this.data.get(name);
    }

    setVariable(name, value) {
        this.data.set(name, value);
    }

    getProcessInstanceId() {
        if(this.processInstanceId==null)
            this.processInstanceId = Math.floor((1 + Math.random()) * 0x10000);
        return this.processInstanceId;
    }

    setProcessInstanceId(processInstanceId) {
        if(this.processInstanceId!=null)
            console.error("Init process instance id only once");
        else
            this.processInstanceId = processInstanceId;
    }

    getProcessBusinessKey() {
        if(this.processBusinessKey==null)
            this.processBusinessKey = Math.floor((1 + Math.random()) * 0x10000);
        return this.processBusinessKey;
    }

    setProcessBusinessKey(processBusinessKey) {
        if(this.processBusinessKey!=null)
            console.error("Init process business key only once");
        else
            this.processBusinessKey = processBusinessKey;
    }
}();

var connector = new class Connector {
    constructor() {
        try {
            this.data = new Map().set('response', JSON.stringify(pm.response.json()));
        } catch (error) {
            this.data = new Map().set('response', JSON.stringify('invalid json'));
        }
    }

    getVariable(name) {
        return this.data.get(name);
    }
}();

var payload = new class Payload {
    set(body) {
        this.body = body;
        pm.variables.set('payload', body);
    }
}();