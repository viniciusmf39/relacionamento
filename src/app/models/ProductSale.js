import Sequelize, { Model } from 'sequelize';

class ProductSale extends Model {
  static init(sequelize) {
    super.init(
      {
        product_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'products',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        sale_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'sales',
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
    this.belongsTo(models.Product, {
      as: 'products',
      foreignKey: 'product_uid',
    });
  }
}

export default ProductSale;
