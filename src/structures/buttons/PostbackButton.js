const BaseButton = require('./BaseButton');

/**
 * Class representing a postback button
 * @extends BaseButton
 */
class PostbackButton extends BaseButton {
    constructor(title, payload) {
        super("postback");
        this.title = title;
        this.payload = payload;

        this.json.title = title;
        this.json.payload = payload;
    }
}

module.exports = PostbackButton;