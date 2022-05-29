const BaseButton = require('./BaseButton');

/**
 * Class representing a call button
 * @extends BaseButton
 */
class CallButton extends BaseButton {
    constructor(title, number) {
        super("phone_number");
        this.title = title;
        this.number = number;

        this.json.title = title;
        this.json.payload = number;
    }
}

module.exports = CallButton;