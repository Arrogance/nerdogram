module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(28),
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
        tableName: 'groups', 
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return Group;
};