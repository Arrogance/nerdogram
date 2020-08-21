const TeleBot = require('telebot');
const config = require('../config');

class Bot {
    constructor (TelegramToken) {
        this.TelegramToken = TelegramToken;
        this.init();
    }

    get bot () {
        return this.TeleBot;
    }

    start () {
        this.TeleBot.start();
    }

    init () {
        this.TeleBot = new TeleBot({
            token: this.TelegramToken, // Required. Telegram Bot API token.
            // polling: { // Optional. Use polling.
            //     interval: 100, // Optional. How often check updates (in ms).
            //     timeout: 0, // Optional. Update polling timeout (0 - short polling).
            //     limit: 100, // Optional. Limits the number of updates to be retrieved.
            //     retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            // },
            webhook: { // Optional. Use webhook instead of polling.
                url: config.BotWebHookURL, // HTTPS url to send updates to.
                host: config.BotWebHookHost, // Webhook server host.
                port: config.BotWebHookPort, // Server port.
                maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
            },
            allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
            usePlugins: ['askUser']
        });
    }
}

module.exports = {Bot};