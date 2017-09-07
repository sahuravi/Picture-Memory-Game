module.exports = class QueryModel {
    constructor() {
        this.filters = {};
        this.text = ""
    }
    setApplication(app) {
        this.filters["application"] = app
    }
    getApplication(app) {
        this.filters["application"];
    }
    setSearchText(searchText) {
        this.text = searchText;
    }
    getSearchText() {
        return this.text;
    }
}