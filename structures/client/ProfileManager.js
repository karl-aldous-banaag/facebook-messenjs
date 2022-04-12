const Collection = require("../Collection");
const Profile = require("../Profile");

class ProfileManager {
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }

    fetch(id, returnType = "promise") {
        if (returnType == "promise") {
            return new Promise((resolve, reject) => {
                if (this.cache.get(id)) {
                    resolve(this.cache.get(id));
                } else {
                    let createdProfile = new Profile(this.client, id);
                    this.cache.set(id, createdProfile);
                    resolve(createdProfile);
                }
            })
        } else if (returnType == "profile") {
            if (this.cache.get(id)) {
                return this.cache.get(id);
            } else {
                let createdProfile = new Profile(this.client, id);
                this.cache.set(id, createdProfile);
                return createdProfile;
            }
        }
    }
}

module.exports = ProfileManager;