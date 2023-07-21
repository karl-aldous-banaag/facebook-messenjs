const fetch = require('make-fetch-happen');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const { fetchPostJSON, fetchPostForm } = require('../../../scripts/fetches');

class BaseAttachment {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {string} type Type of attachment
     * @param {object} options data to be stored by Facebook
     * @param {string} [options.content] URL or file path of attachment
     * @param {string} [options.id] id of attachment already saved
     * @param {boolean} [options.reusable] if attachment is reusable
     * @param {Boolean} [reusable]
     * @property {Client} client Facebook Messenger chatbot client
     * @property {String} type Type of attachment
     * @property {String} id ID of attachment
     * @property {Boolean} reusable
     * @property {String} [content] URL or file path of attachment
     * @property {String} [url] URL of attachment if source was from internet
     */
    constructor(client, type, options) {
        this.client = client;
        this.type = type;
        if (options.content) { this.content = options.content; }
        if (options.id) { this.id = options.id; }
        if (typeof options.reusable == "boolean") {
            this.reusable = options.reusable;
        } else {
            this.reusable = false;
        }

        if (options.id) {
            this.id = options.id;
        } else {
            if (options.content.toLowerCase().startsWith("http")) {
                this.url = url;

                fetchPostJSON({
                    host: "graph.facebook.com",
                    path: `/v17.0/me/message_attachments?access_token=${this.client.pageToken}`
                }, {
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
                    .then(res => {
                        const json = JSON.parse(res);
                        this.id = json.attachment_id;
                    })
                    .catch(err => console.error(err));
            } else {
                fetchPostForm({
                    hostname: "graph.facebook.com",
                    path: `/v17.0/me/message_attachments?access_token=${this.client.pageToken}`
                }, {
                    "message": `{"attachment":{"type":"${this.type}","payload":{"is_reusable":${this.reusable}}}}`,
                    "filedata": fs.createReadStream(options.content)
                })
                    .then(res => {
                        const json = JSON.parse(res);
                        this.id = json.attachment_id;
                    })
                    .catch(err => console.error(err));
            }
        }
    }

    /**
     * @property {Function} getJSON
     * @returns {Object}
     */
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