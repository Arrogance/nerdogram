const Command = require('./command');
const checkCommand = require('../utils/check_disabled_command');

class EditSpy extends Command {
    start () {
        this.bot.on('edit', (msg) => {
            checkCommand(msg.chat.id, 'EditSpy').then((enabled) => {
                if (!enabled) {
                    return;
                }

                if (0 === Math.floor(Math.random() * 2)) {
                    return;
                }
    
                msg.reply.text('Hey @'+msg.from.username+'... no edites, que está feo!', { asReply: true });
            });
        });
    }
}

module.exports = new EditSpy();