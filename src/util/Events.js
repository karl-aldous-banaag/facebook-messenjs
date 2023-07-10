'use strict';

/**
 * @typedef {Object} Events
 * @property {string} AccountLinking accountLinking
 * @property {string} MessageDelivery messageDelivery
 * @property {string} MessageReaction messageReaction
 * @property {string} MessageRead messageRead
 * @property {string} MessagingOptin messagingOptin
 * @property {string} MessagingPostback messagingPostback
 * @property {string} PolicyEnforcement policyEnforcement
 * @property {string} Referral referral
 * @property {string} WebhookVerify webhookVerify
 */

// JSDoc for IntelliSense purposes
/**
 * @type {Events}
 * @ignore
 */
module.exports = {
    AccountLinking: "accountLinking",
    MessageDelivery: "messageDelivery",
    MessageReaction: "messageReaction",
    MessageRead: "messageRead",
    MessagingOptin: "messagingOptin",
    MessagingPostback: "messagingPostback",
    PolicyEnforcement: "policyEnforcement",
    Referral: "referral",
    WebhookVerify: "webhookVerify"
};