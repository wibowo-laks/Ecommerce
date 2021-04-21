'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Name must be filled'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Image URL must be filled'}
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {msg: 'Price must be filled'},
        min: {
          args: '0',
          msg: 'price must greater than equal 0'
        },
        isDecimal: {
          args: true,
          msg: 'Price must be filled by number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Stock must be filled'},
        min: {
          args: '0',
          msg: 'stock must greater than equal 0'
        },
        isInt: {
          args: true,
          msg: 'Stock must be filled by absolute number'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Category must be filled'}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};