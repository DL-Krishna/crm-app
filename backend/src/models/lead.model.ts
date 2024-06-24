import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database';
import User from './user.model';
import Course from './course.model';

// Define the attributes for the Lead model
export interface LeadAttributes {
  id?: number;
  name: string;
  leadSource: string;
  countryCode: string;
  techStack: string;
  phone: string;
  courseId: number;
  email: string;
  classMode: string;
  feeQuoted: number;
  batchTiming: string | null;
  userId?: number;
  description?: string;
  nextFollowUp?: Date;
  leadStatus?: string;
  leadStage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Lead model and specify the attributes
class Lead extends Model<LeadAttributes> implements LeadAttributes {
  public id!: number;
  public name!: string;
  public leadSource!: string;
  public countryCode!: string;
  public techStack!: string;
  public phone!: string;
  public courseId!: number;
  public email!: string;
  public classMode!: string;
  public feeQuoted!: number;
  public batchTiming!: string | null;
  public userId?: number;
  public description?: string;
  public nextFollowUp?: Date;
  public leadStatus?: string;
  public leadStage?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Lead.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leadSource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  techStack: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Course,
      key: 'id'
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  classMode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feeQuoted: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  batchTiming: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  nextFollowUp: {
    type: DataTypes.DATE,
    allowNull: true
  },
  leadStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'contacted'
  },
  leadStage: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'lead'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'Lead',
  tableName: 'leads',
});

Lead.belongsTo(User, { foreignKey: 'userId', as: 'createdBy' });
Lead.belongsTo(Course, { foreignKey: 'courseId', as: 'courseDetails' });

export default Lead;