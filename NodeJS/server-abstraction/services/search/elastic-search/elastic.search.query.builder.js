const textSearchFieldMap = {
    "task": ["title"],
    "skill": ["name"]
}

class ESQueryBuilder {
    constructor() {}
    createQuery(queryModel, type) {
        var mainQuery = {
            bool: {
                must: {},
                filter: []
            }
        };

        if (queryModel.text) {
            let textQuery = this.createTextSearchQuery(queryModel.text, type);
            mainQuery.bool.must = textQuery;
        }

        // This loop is to apply all filters in the search query.
        for (let key in queryModel.filters) {
            let filterQuery = this.createFilterQuery(key, queryModel.filters[key]);
            mainQuery.bool.filter.push(filterQuery);
        }

        return mainQuery;
    }
    createTextSearchQuery(serachText, type) {
        let query = {
            simple_query_string: {
                query: serachText,
                fields: textSearchFieldMap[type],
            }
        }
        return query;
    }
    createFilterQuery(filterkey, filterValue) {
        let query = {
            term: {
                [filterkey]: filterValue
            }
        }
        return query;
    }
}

module.exports = new ESQueryBuilder();