const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    // email might be helpfull if I want to for example restore the password 
    //
    // email:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,
    //     validate: {
    //         isEmail: true
    //     }
    // },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = User;