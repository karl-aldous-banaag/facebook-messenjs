const Client = require("../../client/Client");

class Verify {
    /**
     * 
     * @param {Client} client 
     * @param {Boolean} success 
     * @param {Date} [timestamp]
     */
    constructor(client, success, timestamp = new Date()) {
        this.client = client;
        this.success = success;
        this.timestamp = timestamp;
    }
}

module.exports = Verify;