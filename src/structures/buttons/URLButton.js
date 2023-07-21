const BaseButton = require('./BaseButton');

/**
 * Class representing a URL button
 * @extends BaseButton
 */
class URLButton extends BaseButton {
    /**
     * Create a URL button
     * @param {String} title - displayed text on button
     * @param {String} url - URL of button
     * @param {String} webviewHeightRatio - size of webview
     */
    constructor(title, url, webviewHeightRatio = "full") {
        super("web_url");
        this.title = title;
        this.url = url;
        this.webviewHeightRatio = webviewHeightRatio;

        this.json.title = title;
        this.json.url = url;
        this.json.webview_height_ratio = webviewHeightRatio;
    }
}

module.exports = URLButton;