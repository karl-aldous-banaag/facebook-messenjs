class BaseQuickReply {
    constructor(contentType) {
        this.contentType = contentType;
    }

    getJSON() {
        return {
            content_type: this.contentType
        }
    }
}

module.exports = BaseQuickReply;