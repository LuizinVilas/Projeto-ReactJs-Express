const {database, database_user, database_password}=  require('../DatabaseConfigs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database, database_user, database_password, {
    host: 'host.docker.internal',
    dialect: 'mysql',
    port: 3306,
});

class Users extends Sequelize.Model{}
class Contas extends Sequelize.Model {}

Users.init({
    Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    }, 
    Username: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    },
    Password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    },
    Contas: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false
});


Contas.init({
    Id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,  
    },
    Valor: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0,  
        allowNull: false,  
    },
    Descricao: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,  
    },
    User_Id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,  
    },
}, {
    sequelize,
    modelName: 'Contas',
    tableName: 'Contas',
    timestamps: false,
});

Contas.associate = (models) => {
    Contas.belongsTo(models.Users, {
        foreignKey: 'User_Id',
        as: 'user', 
    });
};


module.exports = {Users, Contas};