const BaseButton = require('./BaseButton');
const CallButton = require('./CallButton');
const PostbackButton = require('./PostbackButton');
const URLButton = require('./URLButton');

/**
 * @property {BaseButton} BaseButton
 * @property {CallButton} CallButton
 * @property {PostbackButton} PostbackButton
 * @property {URLButton} URLButton
 */
module.exports = {
    BaseButton: BaseButton,
    CallButton: CallButton,
    PostbackButton: PostbackButton,
    URLButton: URLButton
}