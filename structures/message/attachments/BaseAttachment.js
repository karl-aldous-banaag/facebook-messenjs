const fetch = require('make-fetch-happen');

class BaseAttachment {
    /**
     * @param {BaseClient} client - Facebook Messenger chatbot client
     * @param {String} type - type of attachment
     * @param {String} url - URL of attachment
     * @param {Boolean} reusable
     */
    constructor(client, type, url, reusable = true, id = null) {
        this.client = client;
        this.type = type;
        this.url = url;
        this.reusable = reusable;

        if (id) {
            this.id = id;
        } else {
            fetch(`https://graph.facebook.com/v13.0/me/message_attachments?access_token=${this.client.pageToken}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: {
                        attachment: {
                            type: this.type,
                            payload: {
                                url: this.url,
                                is_reusable: this.reusable
                            }
                        }
                    }
                })
            })
                .then(res => res.json())
                .then(json => {
                    this.id = json.attachment_id;
                });
        }
    }

    getJSON() {
        return {
            type: this.type,
            payload: {
                attachment_id: this.id
            }
        }
    }
}

module.exports = BaseAttachment;