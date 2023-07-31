const fetch = require('make-fetch-happen');
const Client = require('../client/Client');
const BaseQuickReply = require('./message/quickReplies/BaseQuickReply');
const { PostbackButton, URLButton } = require('./buttons/Buttons');
const BaseTemplate = require('./message/template/BaseTemplate');
const Message = require('./message/Message');
const { fetchGet, fetchPostJSON, fetchDelete, fetchPostForm } = require('../scripts/fetches');
const BaseAttachment = require('./message/attachments/BaseAttachment');

class Profile {
    /**
     * @param {Client} client
     * @param {string} id - ID of Profile
     * @property {Client} client
     * @property {string} id
     * @property {string} [firstName]
     * @property {string} [lastName]
     * @property {*} [profilePic]
     */
    constructor(client, id) {
        this.client = client;
        this.id = id;

        this.client.profileManager.cache.set(id, this);
    }

    /**
     * @property {Function} deletePersistentMenu
     * @returns {Promise.<boolean>}
     */
    deletePersistentMenu() {
        return new Promise((resolve, reject) => {
            fetchDelete({
                host: "graph.facebook.com",
                path: `/v17.0/me/custom_user_settings?psid=${this.id}&params=[%22persistent_menu%22]&access_token=${this.client.pageToken}`
            })
                .then(res => {
                    const json = JSON.parse(res);
                    const callResult = json.result === "success";
                    if (callResult) {
                        resolve(callResult);
                    } else {
                        reject(callResult);
                    }
                });
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
            fetchGet({
                host: "graph.facebook.com",
                path: `/v17.0/me/custom_user_settings?psid=${this.id}&access_token=${this.client.pageToken}`,
                method: "GET" 
            })
                .then(res => {
                    const json = JSON.parse(res);

                    if (!("data" in json)) { reject(json) }
                    if (!("user_level_persistent_menu" in json.data[0])) { reject(json) }
                    if (!("call_to_actions" in json.data[0].user_level_persistent_menu[0])) { reject(json) }

                    let callToActions = json.data[0].user_level_persistent_menu[0].call_to_actions;
                    let buttons = [];
                    for (let i = 0; i < callToActions.length; i++) {
                        if (callToActions[i].type === "postback") {
                            buttons.push(new PostbackButton(
                                callToActions[i].title,
                                callToActions[i].payload
                            ));
                        } else if (callToActions[i].type === "web_url") {
                            buttons.push(new URLButton(
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
        // if ((this.firstName) && (this.lastName) && (this.profilePic)) {
        //     return new Promise((resolve, reject) => { resolve(this); });
        // }

        let fieldCopy = [...fields];

        if (("first_name" in fieldCopy) && (this.firstName)) fieldCopy.splice(fieldCopy.indexOf("first_name"), 1);
        if (("last_name" in fieldCopy) && (this.lastName)) fieldCopy.splice(fieldCopy.indexOf("last_name"), 1);
        if (("profile_pic" in fieldCopy) && (this.profilePic)) fieldCopy.splice(fieldCopy.indexOf("last_name"), 1);

        if (fieldCopy.length > 0) {
            let fieldParam = fieldCopy.join(',');

            return new Promise((resolve, reject) => {
                fetchGet({
                    host: "graph.facebook.com",
                    path: `/${this.id}?fields=${fieldParam}&access_token=${this.client.pageToken}`
                })
                    .then(res => {
                        const json = JSON.parse(res);
                        this.firstName = json.first_name;
                        this.lastName = json.last_name;
                        this.profilePic = json.profile_pic;
                        resolve(this);
                    })
            });
        }

        return new Promise((resolve, reject) => { resolve(this); });
    }

    /**
     * @property {Function} send
     * @param {(String|BaseTemplate)} options
     * @param {Array.<BaseQuickReply>} quickReplies
     * @returns {Promise<Message>}
     */
    send(options, quickReplies = []) {
        return new Promise((resolve, reject) => {    
            let replyMsgJSON = {
                sender: { id: this.client.appID },
                recipient:{ id: this.id },
                timestamp: new Date().getTime(),
                // message: {
                //     text: options
                // }
            }

            if (typeof options === "string") {
                replyMsgJSON.message = { text: options }
            } else if (options instanceof BaseTemplate) {
                replyMsgJSON.message = {
                    attachment: {
                        type: "template",
                        payload: options.payload
                    }
                }
            } else if (options instanceof BaseAttachment) {
                replyMsgJSON.message = {
                    attachment: {
                        type: options.type,
                        payload: {
                            attachment_id: options.id
                        }
                    }
                }
            }
            
            if (quickReplies.length > 0) {
                let qrs = quickReplies.filter(qr => qr instanceof BaseQuickReply);
                replyMsgJSON.message.quick_replies = qrs.map(qr => qr.getJSON());
            }

            fetchPostJSON({
                host: "graph.facebook.com",
                path: `/v17.0/me/messages?access_token=${this.client.pageToken}`
            }, replyMsgJSON)
                .then(res => {
                    const json = JSON.parse(res);
                    replyMsgJSON.message.mid = json.message_id;
                    let cachedMessage = this.client.messageManager.fetch(replyMsgJSON);
                    if (json.error) {
                        reject(json);
                    } else {
                        resolve(cachedMessage);
                    }
                });
        })
    }

    /**
     * @property {Function} setPersistentMenu
     * @param {Array.<Buttons.<URLButton|PostbackButton>>} buttons
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

            fetchPostJSON({
                host: "graph.facebook.com",
                path: `/v17.0/me/custom_user_settings?access_token=${this.client.pageToken}`
            }, postObject)
                .then(res => {
                    resolve(buttons.map(button => button.json))
                });
        })
    }
}

module.exports = Profile;