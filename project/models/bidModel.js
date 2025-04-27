const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Tender = require('./tenderModel.js');
const User = require('./userModel.js');



const Bid = sequelize.define('Bid', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    amount:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    // updatedAt:{
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },

});

Bid.belongsTo(User, {
    foreignKey: 'userId'
});

Bid.belongsTo(Tender, {
    foreignKey: 'tenderId'
});

module.exports = Bid;
