const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const User = require('./userModel.js');


const Tender = sequelize.define('Tender', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    budget: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('active', 'closed'),
        defaultValue: 'active'       
    },

});

Tender.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = Tender;