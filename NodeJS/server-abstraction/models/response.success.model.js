module.exports = class ResponseObject {
    constructor() {
        this.status = "Success";
        this.response = null;
    }
    setResponse(response) {
        this.response = response;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
}