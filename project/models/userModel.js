import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';


const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

});

export default User;