module.exports = class TaskResponseModel {
    constructor() {
        this.application = null;
        this.product = null;
        this.series = null;
        this.chapter = null;
        this.taskId = null;
        this.project = null;
        this.title = null;
        this.scenario = null;
        this.score = null;
        this.skill = null;
    }

    // Setters
    setApplication(app) {
        this.application = app;
    }
    setProduct(product) {
        this.product = product;
    }
    setSeries(series) {
        this.series = series;
    }
    setChapter(chapter) {
        this.chapter = chapter;
    }
    setTaskId(taskId) {
        this.taskId = taskId;
    }
    setTitle(title) {
        this.title = title;
    }
    setScenario(scenario) {
        this.scenario = scenario;
    }
    setScore(score) {
        this.score = score;
    }
    setSkill(skill) {
        this.skill = skill;
    }

    // Getters
    // getApplication(app) {
    //     return this.application;
    // }
    // getProduct() {
    //     return this.product;
    // }
    // getSeries() {
    //     return this.series;
    // }
    // getChapter() {
    //     return this.chapter;
    // }
    // getTaskId() {
    //     return this.taskId;
    // }
    // getDescription() {
    //     return this.description;
    // }
    // getScenario() {
    //     return this.scenario;
    // }
    // getScore() {
    //     return this.score;
    // }
    // getSkill() {
    //     return this.skill;
    // }
}

//module.exports = new ResponseModel();