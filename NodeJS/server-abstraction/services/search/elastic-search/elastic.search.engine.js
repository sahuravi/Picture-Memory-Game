const BaseSearchEngine = require('../search.engine.interface');
const elasticsearch = require('elasticsearch');
const esQueryBuilder = require('./elastic.search.query.builder');
const responseBuilder = require('./elastic.search.response.builder');

class ElasticSearchEngine extends BaseSearchEngine {
	constructor() {
		super();
	}
	configure(config) {
		this.esClient = new elasticsearch.Client({
			host: config.url,
			log: 'error'
		});
	}
	search(queryModel, type) {
		let query = esQueryBuilder.createQuery(queryModel, type);
		let queryBody = {
			size: 20,
			from: 0,
			query: query
		}
		return this.esClient.search({
				index: "sims",
				type: type,
				body: queryBody
			})
			.then((result) => {
				return responseBuilder.createResponse(result, type);
			}).catch((error) => {
				throw error;
			})
	}
}

module.exports = new ElasticSearchEngine();