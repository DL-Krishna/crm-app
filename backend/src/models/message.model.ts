import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database';
import User from './user.model';
import Lead from './lead.model';

interface MessageAttributes {
    id?: number;
    phoneNumber: string;
    messageId: string;
    messageContent: string;
    leadId: number;
    userId: number;
    type: 'whatsapp' | 'text';
    createdAt?: Date;
    updatedAt?: Date;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
    public id!: number;
    public phoneNumber!: string;
    public messageId!: string;
    public messageContent!: string;
    public leadId!: number;
    public userId!: number;
    public type!: 'whatsapp' | 'text';
    public createdAt!: Date;
    public updatedAt!: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messageId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messageContent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lead,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM('whatsapp', 'text'),
        allowNull: false,
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
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true
});

Message.belongsTo(User, { foreignKey: 'userId', as: 'createdBy' });
Message.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });

export default Message;