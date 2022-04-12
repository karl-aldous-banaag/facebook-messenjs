const BaseQuickReply = require('./BaseQuickReply');

class TextQuickReply extends BaseQuickReply{
    constructor(title, payload, imageURL = null) {
        super("text");
        this.title = title;
        this.payload = payload;
        this.imageURL = imageURL;
    }

    getJSON() {
        return {
            content_type: this.contentType,
            title: this.title,
            payload: this.payload,
            image_url: this.imageURL
        }
    }
}

module.exports = TextQuickReply;