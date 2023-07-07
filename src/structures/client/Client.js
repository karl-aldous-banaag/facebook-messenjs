const EventEmitter = require('events');

const BaseAPI = require('../api/BaseAPI');
// const BaseAPI = require('../api/BaseAPI-old');
const fetch = require('make-fetch-happen');
const Profile = require('../Profile');
const MessageManager = require('./MessageManager');
const ProfileManager = require('./ProfileManager');
const makeDefault = require('../utils/makeDefault');

class Client extends EventEmitter {
    /**
     * @param {Object} options JSON object with necessary options
     * @property {MessageManager} messageManager Property of object for storing messages
     * @property {ProfileManager} profileManager Property of object for storing profiles
     * @property {String} pageToken Page token from Facebook
     * @property {String} verifyToken Token for confirming the API to Facebook
     * @property {String} appID ID of application of chatbot from Facebook
     */
    constructor(options) {
        super();

        this.messageManager = new MessageManager(this);
        this.profileManager = new ProfileManager(this);

        this.pageToken = options.pageToken;
        this.verifyToken = options.verifyToken;
        this.appSecret = options.appSecret;
        this.validation = makeDefault(options.validation, true);
        this.route = makeDefault(options.route, "/");
        if ("appID" in options) {
            if (typeof options.appID == 'string') {
                this.appID = options.appID;
            } else {
                throw new TypeError("options.appID is not a string.");
            }
        }
    }

    /**
     * @property {Function} listen
     * @param {Number} port - Port number of API
     * @param {Function} fn - Function executed after activation of API
     * @returns {void}
     */
    listen(port = 3456, fn = () => {}) {
        this.port = port;
        this.api = new BaseAPI(this, this.route, {
            validation: this.validation
        });
        this.api.listen(port, fn);

        this.profileManager.cache.set(this.appID, new Profile(this, this.appID));
    }

    /**
     * @property {Function} setGetStartedPayload
     * @param {String} payload - Payload of setGetStartedPayload method
     * @returns {(Promise|null)}
     */
    setGetStartedPayload(payload = "<postback_payload>") {
        if (!this.pageToken) { throw "Page token needed to set Get Started payload"; }
        return new Promise((resolve, reject) => {
            fetch(`https://graph.facebook.com/v17.0/me/messenger_profile?access_token=${this.pageToken}`, {
                method: 'post',
                body: JSON.stringify({get_started:{payload:payload}}),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(json => {
                    let success = json.result === "success"
                    if (success) {
                        resolve(success);
                    } else {
                        reject(success);
                    }
                });
        })
    }
}

module.exports = Client;