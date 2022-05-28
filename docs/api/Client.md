
# Client
**extends [EventEmitter](https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter)**
<br>The base class for all clients.

## Constructor
``` js
new Client(credObject);
```

<table width="100%">
    <tr>
        <td><b>PROPERTIES</b></td>
        <td><b>METHODS</b></td>
        <td><b>EVENTS</b></td>
    </tr>
    <tr>
        <td style="vertical-align: text-top;">
            <a href="#messageManager">messageManager</a>
            <br><a href="#profileManager">profileManager</a>
            <br><a href="#pageToken">pageToken</a>
            <br><a href="#verifyToken">verifyToken</a>
            <br><a href="#appID">appID</a>
        </td>
        <td style="vertical-align: text-top;">
            <a href="#listen">listen</a>
        </td>
        <td style="vertical-align: text-top;">
            <a href="#accountLinking">accountLinking</a>
            <br><a href="#messages">messages</a>
            <br><a href="#messageDelivery">messageDelivery</a>
            <br><a href="#messageReaction">messageReaction</a>
            <br><a href="#messageRead">messageRead</a>
            <br><a href="#messagingOptin">messagingOptin</a>
            <br><a href="#messagingPostbacks">messagingPostbacks</a>
            <br><a href="#policyEnforcement">policyEnforcement</a>
            <br><a href="#referral">referral</a>
            <br><a href="#webhookVerify">webhookVerify</a>
        </td>
    </tr>
</table>

## Properties
<div id="messageManager">
    <h3>.messageManager</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Object for storing messages
        </li>
    </ol>
</div>

<div id="profileManager">
    <h3>.profileManager</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Object for storing profiles
        </li>
    </ol>
</div>

<div id="pageToken">
    <h3>.pageToken</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Page token from Facebook
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a>
        </li>
    </ol>
</div>

<div id="verifyToken">
    <h3>.verifyToken</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Token for confirming the API to Facebook
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a>
        </li>
    </ol>
</div>

<div id="appID">
    <h3>.appID</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            ID of application of chatbot from Facebook
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a>
        </li>
    </ol>
</div>

## Methods
<div id="listen">
    <h3>.listen</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Activates the API of the chatbot and allows it to receive data
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>OPTIONAL</b></td>
                    <td><b>DEFAULT</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">port</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">Number</a>
                    </td>
                    <td style="vertical-align: text-top;">✅</td>
                    <td style="vertical-align: text-top;">3456
                    </td>
                    <td style="vertical-align: text-top;">Port number of API</td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">fn</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions">Function</a>
                    </td>
                    <td style="vertical-align: text-top;">✅</td>
                    <td style="vertical-align: text-top;">() => {}
                    </td>
                    <td style="vertical-align: text-top;">What client does after turning on</td>
                </tr>
            </table>
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined">void</a>
        </li>
    </ol>
</div>

<h2>Events</h2>
<div id="accountLinking">
    <h3>accountLinking</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Activates the API of the chatbot and allows it to receive data
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">msgEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>
                    </td>
                    <td style="vertical-align: text-top;">Object with data of API call regarding account linking event</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messages">
    <h3>messages</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted whenever a message is received
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">msgEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="./Message.html">Message</a>
                    </td>
                    <td style="vertical-align: text-top;">The received message</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messageDelivery">
    <h3>messageDelivery</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted whenever a message is delivered
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">deliveryEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="./Events/DeliveryEvent.html">DeliveryEvent</a>
                    </td>
                    <td style="vertical-align: text-top;">Object of special class for processing message deliveries</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messageReaction">
    <h3>messageReaction</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted whenever someone reacts to a message
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">reactionEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="./Events/ReactionEvent.html">ReactionEvent</a>
                    </td>
                    <td style="vertical-align: text-top;">Object of special class for processing message reactions</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messageRead">
    <h3>messageRead</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted whenever someone reads a message
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">readEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="./Events/ReadEvent.html">ReadEvent</a>
                    </td>
                    <td style="vertical-align: text-top;">Object of special class for processing read events</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messagingOptin">
    <h3>messagingOptin</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted when the user accepts a message request received from customer matching via the Send API
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">optinEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>
                    </td>
                    <td style="vertical-align: text-top;">Object with data of API call regarding the event</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="messagingPostbacks">
    <h3>messagingPostbacks</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted when a users clicks a <a href="https://developers.facebook.com/docs/messenger-platform/send-messages/buttons">postback button</a>, <a href="https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/get-started-button">Get Started button</a>, or <a href="https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu">persistent menu item</a>
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">postbackEvtData</td>
                    <td style="vertical-align: text-top;">
                        <a href="./Events/PostbackEvent.html">PostbackEvent</a>
                    </td>
                    <td style="vertical-align: text-top;">Object of special class for processing postback events</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="policyEnforcement">
    <h3>policyEnforcement</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted when a policy enforcement action will be oris taken on the page it manages
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">policyEnforcementData</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>
                    </td>
                    <td style="vertical-align: text-top;">Object with data of API call regarding the event</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="referral">
    <h3>referral</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted when the user already has a thread with the bot and user comes to the thread from the reasons stated <a href="https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals/">here</a>
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">referralData</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>
                    </td>
                    <td style="vertical-align: text-top;">Object with data of API call regarding the event</td>
                </tr>
            </table>
        </li>
    </ol>
</div>

<div id="webhookVerify">
    <h3>webhookVerify</h3>
    <ol>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            Emitted when Facebook verifies the link to the Facebook Messenger chatbot API
        </li>
        <li style="list-style-type: none; margin-bottom: 0.5em;">
            <table width="100%">
                <tr>
                    <td><b>PARAMETER</b></td>
                    <td><b>TYPE</b></td>
                    <td><b>DESCRIPTION</b></td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top;">verifyData</td>
                    <td style="vertical-align: text-top;">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>
                    </td>
                    <td style="vertical-align: text-top;">Object with data of API call regarding the verification of the link to the Facebook Messenger chatbot API</td>
                </tr>
            </table>
        </li>
    </ol>
</div>