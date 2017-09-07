module.exports = class ResponseObject {
    constructor() {
        this.status = "Error";
        this.error = {};
    }
    setMessage(message) {
        this.error.message = message;
    }
    getMessage() {
        return this.error.message;
    }
    setDescription(description) {
        this.error.description = description;
    }
    getDescription() {
        return this.error.description;
    }
    setCode(code) {
        this.error.code = code;
    }
    getCode() {
        return this.error.code;
    }
}