const Command = require('./command');
const db = require('../models');

class ChannelStart extends Command {
    start () {
        this.bot.on('/channel_start', (msg) => {
            if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
                this.bot.getChatMember(msg.chat.id, msg.from.id).then((chatMember) => {
                    if (chatMember.status === 'creator' || chatMember.status === 'administrator') {
                        this.addGroup(msg.chat).then(() => {
                            msg.reply.text('Se ha actualizado correctamente el grupo en la base de datos');
                        }).catch(() => {
                            msg.reply.text('‼️ Ops, ahora no puedo añadir el grupo a la base de datos');
                        });
                    } else {
                        msg.reply.text('‼️ Debes de ser Administrador o Creador para usar este comando');
                    }
                });
                return;
            }

            msg.reply.text('‼️ Este comando sólo se puede ejecutar en un grupo');
        });
    }

    addGroup (groupData) {
        return new Promise((r, e) => {
            try {
                db.Group.findOne({
                    where: { id: groupData.id }
                }).then((Group) => {
                    if (null === Group) {
                        Group = db.Group.create({
                            id: groupData.id,
                            title: groupData.title,
                            type: groupData.type,
                        }).then(() => r()).catch(() => e());
                    } else {
                        db.Group.update({
                            id: groupData.id,
                            title: groupData.title,
                            type: groupData.type,
                        }, 
                        { where: { id: Group.id }}).then(() => r()).catch(() => e());
                    }

                    r();
                });
            } catch (error) {
                console.log(error);
                e(error);
            }
        });
    }
};

module.exports = new ChannelStart();