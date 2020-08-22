const Command = require('./command');

const answers = [
    'Dime @%username% crack!',
    'Ese soy yo, ¿dígame?',
    '👂🏻 He oído mi nombre? Oh @%username%!'
];

class AnswerName extends Command {
    start () {
        this.bot.on('text', (msg) => { 
            this.bot.getMe().then((me) => {
                let regex = new RegExp('('+me.first_name.toLowerCase()+'|'+me.username.toLowerCase()+')', 'gm');
                let isHighlight = regex.exec(msg.text.toLowerCase());

                if (isHighlight) {
                    let answer = answers[Math.floor(Math.random() * answers.length)];
                    let text = answer.replace('%username%', msg.from.username);

                    this.bot.sendMessage(msg.chat.id, text);
                }
            });
         });
    }
}

module.exports = new AnswerName();