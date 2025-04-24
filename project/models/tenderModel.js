import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';
import {User} from './userModel.js';


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
        allowNull: false
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
        allowNull: false
    },

});

Tender.belongsTo(User, {
    foreignKey: 'userId'
});

export default Tender;