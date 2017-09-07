const QueryModel = require('./models/query.model');
const ModelMap = {
    app: 'Application',
    prd: 'Product',
    s: 'Series',
    ch: 'Chapter',
    scn: 'Scenario',
    skl: 'Skill',
    q: 'SearchText'
}

class QueryModelService {
    constructor() {}
    populate(rawData) {
        let queryModel = new QueryModel();
        for (let key in rawData) {
            if (ModelMap[key] && queryModel["set" + ModelMap[key]]) {
                queryModel["set" + ModelMap[key]].call(queryModel, (ModelMap[key] === 'SearchText' ? rawData[key] : rawData[key].split(',')));
            } else {
                throw new Error('One of the query parameters is missing or not valid. (Bad request)');
            }
        }
        return queryModel;
    }
    /*  createModelMap(rawData) {
         let modelMap = {};
         modelMap.Application = rawData.app && rawData.app.split(',');
         modelMap.Product = rawData.prd && rawData.prd.split(',');
         modelMap.Series = rawData.s && rawData.s.split(',');
         modelMap.Chapter = rawData.ch && rawData.ch.split(',');
         modelMap.Scenario = rawData.scn && rawData.scn.split(',');
         modelMap.Skill = rawData.skl && rawData.skl.split(',');
         modelMap.SearchText = rawData.q;

         return modelMap;
     } */
}

module.exports = new QueryModelService();