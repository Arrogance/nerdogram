const TeleBot = require('telebot');

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
            polling: { // Optional. Use polling.
                interval: 100, // Optional. How often check updates (in ms).
                timeout: 0, // Optional. Update polling timeout (0 - short polling).
                limit: 100, // Optional. Limits the number of updates to be retrieved.
                retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            },
            // webhook: { // Optional. Use webhook instead of polling.
            //     key: 'key.pem', // Optional. Private key for server.
            //     cert: 'cert.pem', // Optional. Public key.
            //     url: 'https://....', // HTTPS url to send updates to.
            //     host: '0.0.0.0', // Webhook server host.
            //     port: 443, // Server port.
            //     maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
            // },
            allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
            usePlugins: ['askUser']
        });
    }
}

module.exports = {Bot};