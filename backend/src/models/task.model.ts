import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import User from './user.model';
import Lead from './lead.model';

class ActivityTask extends Model {
    public id!: number;
    public subject!: string;
    public dueDate!: Date;
    public priority!: string;
    public userId!: number;
    public leadId!: number;

    // Define timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ActivityTask.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // User model
            key: 'id',
        },
    },
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lead, // Lead model
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
});
ActivityTask.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ActivityTask.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });

export default ActivityTask;
