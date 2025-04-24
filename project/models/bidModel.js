import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { Tender } from './tenderModel.js';
import { User } from './userModel.js';



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


