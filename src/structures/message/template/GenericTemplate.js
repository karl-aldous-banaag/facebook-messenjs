const BaseButton = require('../../buttons/BaseButton');
const BaseTemplate = require('./BaseTemplate');

/**
 * Class representing a generic message template
 * @extends BaseTemplate
 */
class GenericTemplate extends BaseTemplate {
    /**
     * @property {String} type - type of message template
     * @property {Object} payload - payload of message template
     */
    constructor() {
        super("generic");
        this.payload.elements = [];
    }

    /**
     * Sets title of generic template object
     * @property {Function} addElement
     * @param {Object} options 
     */
    addElement(options) {
        if (!("title" in options)) { throw "title property required for adding elements" }

        let elementObj = { title: options.title }

        if ("subtitle" in options) {
            if (typeof options.subtitle === "string") {
                elementObj.subtitle = options.subtitle;
            } else {
                throw "subtitle property must be a string";
            }
        }

        if ("imageURL" in options) {
            if (typeof options.imageURL === "string") {
                elementObj.image_url = options.imageURL;
            } else {
                throw "imageURL property must be a string";
            }
        }

        if ("defaultAction" in options) {
            if (typeof options.defaultAction === "object") {
                elementObj.default_action = options.defaultAction;
            } else {
                throw "defaultAction property must be an object";
            }
        }

        if ("buttons" in options) {
            if (Array.isArray(options.buttons)) {
                let buttons = options.buttons.filter(button => button instanceof BaseButton);
                elementObj.buttons = buttons.map(button => button.json);
            } else {
                throw "buttons property must be an array";
            }
        }

        this.payload.elements.push(elementObj);
        return this;
    }
}

module.exports = GenericTemplate;