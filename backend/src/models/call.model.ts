import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database';
import User from './user.model';
import Lead from './lead.model';

interface CallAttributes {
    id?: number;
    leadId: number;
    userId: number;
    callType: string;
    outgoingCallStatus: string;
    callStartTime: Date;
    callEndTime: Date;
    voiceRecording: string | null;
    subject: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Call extends Model<CallAttributes> implements CallAttributes {
    public id!: number;
    public leadId!: number;
    public userId!: number;
    public callType!: string;
    public outgoingCallStatus!: string;
    public callStartTime!: Date;
    public callEndTime!: Date;
    public voiceRecording!: string | null;
    public subject!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Call.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    callType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    outgoingCallStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    callStartTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    callEndTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    voiceRecording: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subject: {
        type: DataTypes.STRING,
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
    modelName: 'Call',
    tableName: 'calls',
    timestamps: true
});

Call.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });
Call.belongsTo(User, { foreignKey: 'userId', as: 'createdBy' });

export default Call;
