const EventEmitter = require('events');

const fetch = require('make-fetch-happen');
const BaseAPI = require('../api/BaseAPI');
const Collection = require('../Collection');
const Profile = require('../Profile');
const MessageManager = require('./MessageManager');
const ProfileManager = require('./ProfileManager');

class BaseClient extends EventEmitter {
    /**
     * @param {Object} credObject - JSON object with necessary credentials
     */
    constructor(credObject) {
        super();

        this.messageManager = new MessageManager(this);
        this.profileManager = new ProfileManager(this);

        if ("pageToken" in credObject) {
            this.pageToken = credObject.pageToken;
        }
        if ("verifyToken" in credObject) { this.verifyToken = credObject.verifyToken; }
        if ("appID" in credObject) {
            if (typeof credObject.appID == 'string') {
                this.appID = credObject.appID;
            } else {
                throw new TypeError("credObject.appID is not a string.");
            }
        }
    }

    /**
     * @param {Number} port - Port number of API
     * @param {Function} fn - Function executed after activation of API
     */
    listen(port = 3456, fn) {
        this.port = port;
        this.api = new BaseAPI(this);
        this.api.listen(port, fn);

        this.profileManager.cache.set(this.appID, new Profile(this, this.appID));
    }
}

module.exports = BaseClient;