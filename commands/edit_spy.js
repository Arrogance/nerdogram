const Command = require('./command');

class EditSpy extends Command {
    start () {
        this.bot.on('edit', (msg) => {
            if (0 === Math.floor(Math.random() * 2)) {
                return;
            }

            msg.reply.text('Hey '+msg.from.username+'... no edites, que está feo!', { asReply: true });
        });
    }
}

module.exports = new EditSpy();