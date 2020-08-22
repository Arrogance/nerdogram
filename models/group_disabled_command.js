module.exports = (sequelize, DataTypes) => {
    const GroupDisabledCommand = sequelize.define('GroupDisabledCommand', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        group_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        command: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        disabled_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, { 
        tableName: 'groups_disabled_commands', 
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return GroupDisabledCommand;
};