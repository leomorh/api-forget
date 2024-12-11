import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./UserModel";

const Adress = sequelize.define(
    'adresses',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'zip_code'
        },
        State: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'state'
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'city'
        },
        Street: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'street'
        },
        District: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'district'
        },
        Numberforget: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'number_forget'
        },

        Number: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'number'
        },

        Complement: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'complement'
        }


    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        onDelete: 'SET NULL',
    },

);
Adress.belongsTo(User,{
    as: 'user',
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idUser',
        allowNull: 'false',
        field: 'id_user'
    }
})

export default Adress;