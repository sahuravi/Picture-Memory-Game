class Response {
    format(data, type) {
        let responseData = {
            'status': 'Success',
            'response': null
        };
        switch (type) {
            case 'json':
                responseData.response = data;
                break;
            case 'xml':
                responseData.response = this.getXMLFormat(data);
                break;
            default:
                responseData.response = data;
                break;
        }
        return responseData;
    }
    getXMLFormat(data) {
        // Convert from JSON to XML.
        return 'This content-type is not yet supported.';
    }
}

module.exports = new Response();