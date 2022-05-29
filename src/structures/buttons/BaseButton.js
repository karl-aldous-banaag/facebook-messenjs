/** Class representing a button */
class BaseButton {
    /**
     * 
     * @param {String} type 
     */
    constructor(type) {
        this.type = type;
        this.json = {
            type: type
        }
    }
}

module.exports = BaseButton;