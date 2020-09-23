import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        brand_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'brands',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Brand, {
      as: 'brand',
      foreignKey: 'brand_uid',
    });
    this.hasMany(models.ProductSale, {
      as: 'sales',
      foreignKey: 'product_uid',
    });
  }
}

export default Product;
