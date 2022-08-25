'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			User.hasMany(models.Post, {
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT'
			})
    }
  }
  User.init({
    name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					args: true,
					msg: 'Must be eMail format'
				}
			}
		},
    password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [6, 16] 
			}
		}
  }, {
		hooks: {
			beforeCreate: (user) => {
				user.password = hashPassword(user.password)
			}
		},
    sequelize,
    modelName: 'User',
  });
  return User;
};