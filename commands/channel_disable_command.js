const Command = require('./command');
const db = require('../models');

class ChannelDisableCommand extends Command {
    start () {
        this.bot.on('/channel_disable_command', (msg) => {
            let commands = msg.text.split(' ');
            commands.shift();

            let validCommands = [];
            commands.forEach(element => {
                if (this.bot.commands.find((item) => {
                    return item === element;
                })) {
                    validCommands.push(element);
                }
            });

            this.disableCommands(msg.chat.id, msg.from.id, validCommands);
            console.log(validCommands);
        });
    }

    disableCommands (groupId, userId, commands) {
        return new Promise((r, e) => {
            const { Op } = require("sequelize");
            
            try {
                db.GroupDisabledCommand.findAll({
                    where: { 
                        command: { [Op.in]: commands },
                        group_id: groupId
                    }
                }).then((GroupDisabledCommands) => {
                    let validCommands = [];
                    commands.forEach(item => {
                        if (GroupDisabledCommands.find((element) => {
                            return item !== element.command;
                        })) {
                            validCommands.push(item);
                        }
                    });

                    let query = [];
                    validCommands.forEach((command) => {
                        query.push({
                            group_id: groupId,
                            disabled_by: userId,
                            command: command
                        });
                    });

                    db.GroupDisabledCommand.bulkCreate(query).then(() => r()).catch(() => e());
                });
            } catch (error) {
                console.log(error);
                e(error);
            }
        });
    }
};

module.exports = new ChannelDisableCommand();