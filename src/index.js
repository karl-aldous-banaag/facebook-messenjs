module.exports = {
    BaseAttachment: require('./structures/message/attachments/BaseAttachment'),
    CallButton: require('./structures/buttons/Buttons').CallButton,
    PostbackButton: require('./structures/buttons/Buttons').PostbackButton,
    URLButton: require('./structures/buttons/Buttons').URLButton,
    Client: require('./client/Client'),
    Collection: require('./structures/Collection'),
    Events: require('./util/Events'),
    Message: require('./structures/message/Message'),
    MessageManager: require('./client/MessageManager'),
    Profile: require('./structures/Profile'),
    ProfileManager: require('./client/ProfileManager'),
    TextQuickReply: require('./structures/message/quickReplies/QuickReplies').Text,
    Templates: require('./structures/message/template/Templates')
}