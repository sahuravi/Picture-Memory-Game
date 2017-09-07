module.exports = class SkillResponseModel {
    constructor() {
        this.skillId = null;
        this.name = null;
        this.product = null;
        this.category = null;
        this.subCategory = null;
    }

    // Setters
    setSkillId(skillId) {
        this.skillId = skillId;
    }
    setName(name) {
        this.name = name;
    }
    setProduct(product) {
        this.product = product;
    }
    setCategory(category) {
        this.category = category;
    }
    setSubCategory(subCategory) {
        this.subCategory = subCategory;
    }
}