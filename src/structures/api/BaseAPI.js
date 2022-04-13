const express = require('express');

const Message = require('../message/Message');
const Client = require('../client/Client');
const ReadEvent = require('../events/ReadEvent');
const DeliveryEvent = require('../events/DeliveryEvent');
const resolve = require('path').resolve;

class BaseAPI {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @property {Client} client Facebook Messenger chatbot client of BaseAPI
     */
    constructor(client) {
        this.client = client;
        this.app = express();
        this.app.use(express.json());

        this.app.get('/', (req, res) => {
            if (req.query["hub.challenge"] && req.query["hub.verify_token"]) {
                if (req.query["hub.verify_token"] == client.verifyToken) {
                    res.send(req.query["hub.challenge"]);
                    this.client.emit("webhookVerify", { success: true, date: new Date() });
                } else {
                    res.status(403).send("Unauthorized");
                    this.client.emit("webhookVerify", { success: false, date: new Date() });
                }
            } else {
                res.status(400).send("Missing hub.challenge or hub.verify_token.");
                this.client.emit("webhookVerify", { success: false, date: new Date() });
            }
        });

        if (this.client.webhook) {
            this.app.get('/file', (req, res) => {
                res.sendFile(resolve(req.query.path));
            });
        }

        this.app.post('/', (req, res) => {
            if (req.body) {
                console.log(req.body);
                console.log(req.body.entry[0]);
                if ("messaging" in req.body.entry[0]) {
                    if ("message" in req.body.entry[0].messaging[0]) {
                        let msgEvtData = new Message(this.client, req.body.entry[0].messaging[0]);
                        /**
                         * Receive message event
                         * @event Client#messaging
                         * @type {Message}
                         */
                        this.client.emit("messages", msgEvtData);
                    } else if ("read" in req.body.entry[0].messaging[0]) {
                        let readEvtData = new ReadEvent(this.client, req.body.entry[0].messaging[0].read[0]);

                        /**
                         * Receive message event
                         * @event Client#messageRead
                         * @type {ReadEvent}
                         */
                        this.client.emit("messageRead", readEvtData);
                    } else if ("delivery" in req.body.entry[0].messaging[0]) {
                        let deliveryEvtData = new DeliveryEvent(this.client, req.body.entry[0].messaging[0]);

                        /**
                         * Receive message event
                         * @event Client#messageRead
                         * @type {ReadEvent}
                         */
                        this.client.emit("messageDelivery", deliveryEvtData);
                    } else if ("reaction" in req.body.entry[0].messaging[0]) {

                        /**
                         * Receive message event
                         * @event Client#messageRead
                         */
                        this.client.emit("messageReaction")
                    }
                } else {
                    // console.log(req.body.entry[0]);
                }
            }

            res.status(200).send("Noted.");
        });
    }

    /**
     * @param {Number} port Port number of API
     * @param {Function} fn Function executed after activation of API
     */
    listen(port, fn) { this.app.listen(port, fn); }
}

module.exports = BaseAPI;