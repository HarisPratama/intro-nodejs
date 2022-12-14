'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init({
    title: {
			type: DataTypes.STRING,
			allowNull: false
		},
    desc: {
			type: DataTypes.STRING,
			allowNull: false
		},
    image: {
			type: DataTypes.STRING,
			allowNull: false
		}
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};