const fetch = require('make-fetch-happen');
const Client = require('./client/Client');
const BaseAttachment = require('./message/attachments/BaseAttachment');

class Profile {
    /**
     * @param {Client} client
     * @param {String} id - ID of Profile
     * @property {Client} client
     * @property {String} id
     */
    constructor(client, id) {
        this.client = client;
        this.id = id;

        this.client.profileManager.cache.set(id, this);
    }

    /**
     * @property {Function} getJSON - gets JSON object with data about a user
     * @returns {Object}
     */
    getJSON() {
        return {
            id: this.id
        }
    }

    /**
     * @property {Function} getPersistentMenu - gets data about persistent menu shown to a user
     * @returns {Promise}
     */
    getPersistentMenu() {
        if (!this.id) { throw "user ID missing for getting the persistent menu of a user"; }
        if (!this.client.pageToken) { throw "token missing for client" }

        return new Promise((resolve, reject) => {
            fetch(`https://graph.facebook.com/v14.0/me/custom_user_settings?psid=${this.id}&access_token=${this.client.pageToken}`)
                .then(res => res.json())
                .then(json => resolve(json));
        });
    }

        /**
     * @property {Function} getPersonalInfo
     * @param {Array.<String>} [fields] fields of desired personal information
     * @returns {Promise}
     */
         getPersonalInfo(fields = ["first_name", "last_name", "profile_pic"]) {
            if ((this.firstName) && (this.lastName) && (this.profilePic)) {
                return new Promise((resolve, reject) => { resolve(this); });
            }
    
            let fieldCopy = [...fields];
    
            if (("first_name" in fieldCopy) && (this.firstName)) fieldCopy.splice(fieldCopy.indexOf("first_name"), 1);
            if (("last_name" in fieldCopy) && (this.lastName)) fieldCopy.splice(fieldCopy.indexOf("last_name"), 1);
            if (("profile_pic" in fieldCopy) && (this.profilePic)) fieldCopy.splice(fieldCopy.indexOf("last_name"), 1);
    
            if (fieldCopy.length > 0) {
                let fieldParam = fieldCopy.join(',');
    
                return fetch(`https://graph.facebook.com/${this.id}?fields=${fieldParam}&access_token=${this.client.pageToken}`)
                    .then(res => res.json())
                    .then(json => {
                        this.firstName = json.first_name;
                        this.lastName = json.last_name;
                        this.profilePic = json.profile_pic;
                        return this
                    })
            }
    
            return new Promise((resolve, reject) => { resolve(this); });
        }

    /**
     * 
     * @param {String} text 
     * @param {Array|BaseAttachment} [qrsOrAttachment] 
     * @returns {Promise}
     */
    send(text, qrsOrAttachment = null) {
        return new Promise((resolve, reject) => {    
            let replyMsgJSON = {
                sender: { id: this.client.appID },
                recipient:{ id: this.id },
                timestamp: new Date().getTime(),
                message: {
                    text: text
                }
            }
            
            if (qrsOrAttachment instanceof Array) { // Add quick replies (if any)
                replyMsgJSON.message.quick_replies = [];
                for (let i = 0; i < qrsOrAttachment.length; i++) {
                    replyMsgJSON.message.quick_replies.append(qrsOrAttachment[i]);
                }
            } else if (qrsOrAttachment instanceof BaseAttachment) { // Add attachment (if any)
                replyMsgJSON.message.attachment = qrsOrAttachment.getJSON();
            }

            fetch(`https://graph.facebook.com/v10.0/me/messages?access_token=${this.client.pageToken}`, {
                method: 'post',
                body: JSON.stringify(replyMsgJSON),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(json => {
                    replyMsgJSON.message.mid = json.message_id;
                    let cachedMessage = this.client.messageManager.fetch(replyMsgJSON);
                    resolve(cachedMessage);
                });
        })
    }
}

module.exports = Profile;