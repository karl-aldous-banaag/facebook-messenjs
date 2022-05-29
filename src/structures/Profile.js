const fetch = require('make-fetch-happen');
const Client = require('./client/Client');
const BaseQuickReply = require('./message/quickReplies/BaseQuickReply');
const Buttons = require('./buttons/Buttons');
const BaseTemplate = require('./message/template/BaseTemplate');

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
     * @property {Function} deletePersistentMenu
     * @returns {null}
     */
    deletePersistentMenu() {
        fetch(`https://graph.facebook.com/v14.0/me/custom_user_settings?psid=${this.id}&params=[%22persistent_menu%22]&access_token=${this.client.pageToken}`, {
            method: 'delete'
        });
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
                .then(json => {
                    if (!("data" in json)) { reject(json) }
                    if (!("user_level_persistent_menu" in json.data[0])) { reject(json) }
                    if (!("call_to_actions" in json.data[0].user_level_persistent_menu[0])) { reject(json) }

                    let callToActions = json.data[0].user_level_persistent_menu[0].call_to_actions;
                    let buttons = [];
                    for (let i = 0; i < callToActions.length; i++) {
                        if (callToActions[i].type === "postback") {
                            buttons.push(new Buttons.PostbackButton(
                                callToActions[i].title,
                                callToActions[i].payload
                            ));
                        } else if (callToActions[i].type === "web_url") {
                            buttons.push(new Buttons.URLButton(
                                callToActions[i].title,
                                callToActions[i].url,
                                callToActions[i].webview_height_ratio
                            ));
                        }
                    }

                    resolve(buttons);
                });
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
     * @property {Function} send
     * @param {(String|BaseTemplate)} options
     * @param {Array.<BaseQuickReply>} quickReplies
     * @returns {Promise}
     */
    send(options, quickReplies = []) {
        return new Promise((resolve, reject) => {    
            let replyMsgJSON = {
                sender: { id: this.client.appID },
                recipient:{ id: this.id },
                timestamp: new Date().getTime(),
                message: {
                    text: options
                }
            }

            if (typeof options === "string") {
                replyMsgJSON.message.text = options;
            } else if (options instanceof BaseTemplate) {
                replyMsgJSON.message = {
                    attachment: {
                        type: "template",
                        payload: options.payload
                    }
                }
            }
            
            if (quickReplies.length > 0) {
                if (typeof options.quickReplies !== Array) {
                    throw "quickReplies property in options not an array";
                }

                let qrs = quickReplies.filter(qr => qr instanceof BaseQuickReply);
                replyMsgJSON.message.quick_replies = qrs.map(qr => qr.getJSON());
            }

            fetch(`https://graph.facebook.com/v14.0/me/messages?access_token=${this.client.pageToken}`, {
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

    /**
     * @property {Function} setPersistentMenu
     * @param {Array.<Buttons.BaseButton>} buttons
     * @returns {Promise}
     */
    setPersistentMenu(buttons) {
        return new Promise((resolve, reject) => {
            let postObject = {
                psid: this.id,
                persistent_menu: [
                    {
                        locale: "default",
                        composer_input_disabled: false,
                        call_to_actions: buttons.map(button => button.json)
                    }
                ]
            }
    
            fetch(`https://graph.facebook.com/v14.0/me/custom_user_settings?access_token=${this.client.pageToken}`, {
                method: 'post',
                body: JSON.stringify(postObject),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => resolve(buttons.map(button => button.json)));
        })
    }
}

module.exports = Profile;