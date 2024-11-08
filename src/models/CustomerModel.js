import { sequelize } from "../config";
import {DataTypes} from "sequelize";


const CustomerModel = sequelize.define(
    "customers",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.CHAR(2),
        },
        creditLimit: {
            field: 'credit_limit',
            type: DataTypes.NUMBER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default CustomerModel;