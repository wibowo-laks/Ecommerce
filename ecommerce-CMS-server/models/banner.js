'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Title must be filled'}
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {msg: 'Status must be filled'}
      }
    },
    image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {msg: 'Image URL must be filled'}
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};