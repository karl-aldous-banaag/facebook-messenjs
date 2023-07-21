const EventEmitter = require('events');

const BaseAPI = require('../structures/api/BaseAPI');
const Profile = require('../structures/Profile');
const MessageManager = require('./MessageManager');
const ProfileManager = require('./ProfileManager');
const makeDefault = require('../scripts/makeDefault');
const { fetchPostJSON } = require('../scripts/fetches');

class Client extends EventEmitter {
    /**
     * @param {Object} options JSON object with necessary options
     * @property {MessageManager} messageManager Property of object for storing messages
     * @property {ProfileManager} profileManager Property of object for storing profiles
     * @property {String} pageToken Page token from Facebook
     * @property {String} verifyToken Token for confirming the API to Facebook
     * @property {String} appID ID of application of chatbot from Facebook
     * @property {number} port port of API bot
     * @property {BaseAPI} [baseAPI] API of the bot
     */
    constructor(options) {
        super();

        this.messageManager = new MessageManager(this);
        this.profileManager = new ProfileManager(this);

        this.pageToken = options.pageToken;
        this.verifyToken = options.verifyToken;
        this.appSecret = options.appSecret;
        this.validation = makeDefault(options.validation, true);
        this.path = makeDefault(options.path, "/");
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
        this.baseAPI = new BaseAPI(this, this.path, {
            validation: this.validation
        });
        this.baseAPI.listen(port, fn);

        this.profileManager.cache.set(this.appID, new Profile(this, this.appID));
    }

    /**
     * @property {Function} setGetStartedPayload
     * @param {String} payload - Payload of setGetStartedPayload method
     * @returns {Promise.<boolean>}
     */
    setGetStartedPayload(payload = "<postback_payload>") {
        if (!this.pageToken) { throw "Page token needed to set Get Started payload"; }
        return new Promise((resolve, reject) => {
            fetchPostJSON({
                host: "graph.facebook.com",
                path: `/v2.6/me/messenger_profile?access_token=${this.pageToken}`
            }, {get_started:{payload:payload}})
                .then(res => {
                    const json = JSON.parse(res);
                    let success = json.result === "success";
                    if (success) {
                        resolve(success);
                    } else {
                        reject(success);
                    }
                })
                .catch(error => reject(error));
        })
    }
}

module.exports = Client;