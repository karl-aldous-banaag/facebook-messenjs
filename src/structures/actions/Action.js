const Client = require("../../client/Client");

class Action {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} payload Object with data about event
     * @param {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Client} client Facebook Messenger chatbot client
     * @property {Object} raw Object with data about event
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     */
    constructor(client, payload, timestamp) {
        this.client = client;
        this.raw = payload;
        this.timestamp = timestamp;
    }
}

module.exports = Action;