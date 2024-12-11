import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const User = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'username'
        },
        Cpf:{
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
            field: 'cpf'
        },
        Name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'name'
        },
        Phone: {
            type: DataTypes.STRING(16),
            allowNull: false,
            field: 'phone'
        },
        PasswordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password_hash'
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        Role: {
            type: DataTypes.STRING(255), // admin ou customer
            allowNull: true,
            defaultValue: 'customer',
            field: 'role'
        },
        Cart: {
            type: DataTypes.JSONB,
            allowNull:true,
            field: 'cart'
        },
        Email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            field: 'email'
        },
        recuperation:{
            type: DataTypes.STRING(255),
            allowNull:true,
            expires: 3600
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default User;