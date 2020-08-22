module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        is_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: false
        },
        language_code: {
            type: DataTypes.STRING(5),
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
        tableName: 'users', 
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return User;
};