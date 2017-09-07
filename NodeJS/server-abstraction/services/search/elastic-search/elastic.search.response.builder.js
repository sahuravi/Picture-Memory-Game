const TaskResponseModel = require('../models/task.response.model');
const SkillResponseModel = require('../models/skill.response.model');

class ESResponseBuilder {
    constructor() {}
    createResponse(result, type) {
        let response = {};
        response.totalCount = result.hits.total;
        response.items = [];
        if (type === 'task') {
            result.hits.hits.forEach((hit, index) => {
                //console.log(`\t${body.from + ++index} - ${hit._source.title} (score: ${hit._score})`);
                let rowObj = hit._source;
                let taskResponseModel = new TaskResponseModel();
                taskResponseModel.setApplication(rowObj.application);
                //taskResponseModel.setProduct(rowObj.application);
                taskResponseModel.setSeries(rowObj.series);
                taskResponseModel.setChapter(rowObj.chapter);
                taskResponseModel.setTaskId(rowObj.taskID);
                taskResponseModel.setTitle(rowObj.title);
                //taskResponseModel.setScenario(rowObj.application);
                taskResponseModel.setScore(rowObj.score);
                taskResponseModel.setSkill(rowObj.skill);

                response.items.push(taskResponseModel);
            });
        } else if(type === 'skill') {
            result.hits.hits.forEach((hit, index) => {
                //console.log(`\t${body.from + ++index} - ${hit._source.title} (score: ${hit._score})`);
                let skillResponseModel = new SkillResponseModel();
                
                skillResponseModel.setSkillId();
                skillResponseModel.setProduct();
                skillResponseModel.setName();
                skillResponseModel.setCategory();
                skillResponseModel.setSubCategory();
                response.items.push(skillResponseModel);
            });
        }
        return response;
    }
}

module.exports = new ESResponseBuilder();
/* 
{
    "application": "WD",
    "activity": "1.08",
    "description": "Formatting Financial Numbers",
    "skill": [
        "Use the SUM Function"
    ],
    "series": "SKL",
    "chapter": 7,
    "score": 20,
    "taskID": "C"
} */