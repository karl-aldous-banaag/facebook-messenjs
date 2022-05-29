/** Class representing a template */
class BaseTemplate {
    /**
     * @param {String} type
     * @property {String} type - type of message template
     * @property {Object} payload - payload of message template
     */
    constructor(type) {
        this.type = type;
        this.payload = {
            template_type: type
        }
    }
}

module.exports = BaseTemplate;