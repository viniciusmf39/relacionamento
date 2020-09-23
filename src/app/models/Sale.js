import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        total_price: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        quantity_items: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.ProductSale, {
      as: 'products',
      foreignKey: 'sale_uid',
    });
    this.hasOne(models.SaleClient, {
      as: 'client',
      foreignKey: 'sale_uid',
    });
  }
}

export default Sale;
