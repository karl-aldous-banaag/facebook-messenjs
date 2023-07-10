const Client = require("../../client/Client");
const Profile = require('../Profile');
const Action = require('./Action');

class Reaction extends Action {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} raw Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Person who reacted
     * @property {Profile} recipient Recipient of reaction
     * @property {String} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Message} message Message of reaction
     * @property {String} action "react" or "unreact"
     * @property {String} emoji Emoji of reaction
     * @property {String} reaction Emoji of reaction in the form of a name
     */
    constructor(client, raw = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: "",
        reaction: {
            mid: "",
            action: "",
            emoji: "",
            reaction: ""
        }
    }) {
        super(client, raw, raw.timestamp);

        this.sender = new Profile(client, raw.sender.id);
        this.recipient = new Profile(client, raw.recipient.id);
        this.timestamp = raw.timestamp;
        this.message = client.messageManager.cache.get(raw.reaction.mid);
        this.action = raw.reaction.action;
        this.emoji = raw.reaction.emoji;
        this.reaction = raw.reaction.reaction;
    }
}

module.exports = Reaction;