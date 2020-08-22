const glob = require('glob');
const path = require('path');
const { Bot } = require('./lib/bot');

const Config = require('./config');

const BotInstance = new Bot(Config.TelegramToken);

const bot = BotInstance.bot;

BotInstance.bot.commands = [];
glob.sync( './commands/**/*.js' ).forEach(function(file) {
    let Command = require(path.resolve(file)); 
    if (typeof Command === 'object') {
        Command.init(bot).start();
        BotInstance.bot.commands.push(Command.constructor.name);
    } 
});

console.info('[bot.info] bot loaded with the following commands:');
BotInstance.bot.commands.forEach((command) => console.info('- '+ command));

BotInstance.start();
