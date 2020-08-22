const db = require('../models');

const check = (groupId, command) => {
    return new Promise((r, e) => {
        db.GroupDisabledCommand.findOne({
            where: { group_id: groupId, command: command }
        }).then((GroupDisabledCommand) => {
            if (GroupDisabledCommand) {
                r(false);
            }
            
            r(true);
        }).catch((error) => {
            e(error);
        });
    });
};

module.exports = check;