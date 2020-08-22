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
        let telebotConfig = {
            token: this.TelegramToken, // Required. Telegram Bot API token.
            allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
            usePlugins: ['askUser']
        };

        if (config.Telebot.connectionType === 'webhook') {
            telebotConfig.webhook = {
                url: config.BotWebHookURL, // HTTPS url to send updates to.
                host: config.BotWebHookHost, // Webhook server host.
                port: config.BotWebHookPort, // Server port.
                maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
            };
        } else {
            telebotConfig.polling = { // Optional. Use polling.
                interval: 100, // Optional. How often check updates (in ms).
                timeout: 0, // Optional. Update polling timeout (0 - short polling).
                limit: 100, // Optional. Limits the number of updates to be retrieved.
                retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            };
        }

        this.TeleBot = new TeleBot(telebotConfig);
    }
}

module.exports = {Bot};