const searchEngineRepository = require('./search.engine.repository');

class SearchFactory {
    getSearchEngineInstance(searchEngineConfig) {
        let serachEngineInstance = searchEngineRepository[searchEngineConfig.searchType];
        let typeConfig = searchEngineConfig[searchEngineConfig.searchType];
        serachEngineInstance.configure(typeConfig);
        return serachEngineInstance;
    }
}

module.exports = new SearchFactory();