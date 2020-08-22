const Command = require('./command');
const db = require('../models');

class Start extends Command {
    start () {
        this.bot.on('/start', (msg) => {
            this.addUser(msg.from).then(() => {
                msg.reply.text('Se han actualizado correctamente tus datos en la base de datos');
            }).catch(() => {
                msg.reply.text('‼️ Ops, ahora no puedo añadirte a la base de datos');
            });
        });
    }

    addUser (userData) {
        return new Promise((r, e) => {
            try {
                db.User.findOne({
                    where: { id: userData.id }
                }).then((User) => {
                    if (null === User) {
                        User = db.User.create({
                            id: userData.id,
                            username: userData.username,
                            first_name: userData.first_name,
                            is_bot: userData.is_bot,
                            language_code: userData.language_code
                        }).then(() => r()).catch(() => e());
                    } else {
                        db.User.update({
                            username: userData.username,
                            first_name: userData.first_name,
                            is_bot: userData.is_bot,
                            language_code: userData.language_code
                        }, 
                        { where: { id: User.id }}).then(() => r()).catch(() => e());
                    }
                });
            } catch (error) {
                console.log(error);
                e(error);
            }
        });
    }
};

module.exports = new Start();