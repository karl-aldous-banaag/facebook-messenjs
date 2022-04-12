const Collection = require("../Collection");
const Message = require("../message/Message");
const BaseClient = require("./BaseClient");

class MessageManager {
    /**
     * @param {BaseClient} client
     */
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }

    fetch(idOrPayload) {
        return new Promise((resolve, reject) => {
            if (typeof idOrPayload == 'string') {
                resolve(this.cache.get(idOrPayload));
            } else if (typeof idOrPayload == 'object') {
                if (!this.cache.get(idOrPayload)) {
                    let createdMessage = new Message(this.client, idOrPayload);
                    this.cache.set(idOrPayload.message.mid, createdMessage);
                    resolve(createdMessage);
                } else {
                    resolve(this.cache.get(idOrPayload));
                }
            }
        });
    }
}

module.exports = MessageManager;