import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database';
import Lead from './lead.model';
import User from './user.model';

interface EmailAttributes {
    id?: number;
    to: string[];
    bcc?: string[];
    from: string;
    subject: string;
    body: string;
    leadId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Email extends Model<EmailAttributes> implements EmailAttributes {
    public id!: number;
    public to!: string[];
    public bcc?: string[];
    public from!: string;
    public subject!: string;
    public body!: string;
    public leadId!: number;
    public userId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Email.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    bcc: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lead, // Lead model
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // User model
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Email',
    tableName: 'emails',
    timestamps: true
});

Email.belongsTo(User, { foreignKey: 'userId', as: 'createdBy' });
Email.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });

export default Email;