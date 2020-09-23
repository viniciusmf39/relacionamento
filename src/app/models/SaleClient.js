import Sequelize, { Model } from 'sequelize';

class SaleClient extends Model {
  static init(sequelize) {
    super.init(
      {
        client_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'clients',
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
    this.belongsTo(models.Client, {
      as: 'client',
      foreignKey: 'client_uid',
    });
  }
}

export default SaleClient;
