import Sequelize from 'sequelize';
import 'dotenv/config';
import databaseConfig from '../config/database';

import Brand from '../app/models/Brand';
import Product from '../app/models/Product';
import Sale from '../app/models/Sale';
import Client from '../app/models/Client';
import ProductSale from '../app/models/ProductSale';
import SaleClient from '../app/models/SaleClient';

const models = [Brand, Product, Sale, Client, ProductSale, SaleClient];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    console.log('iniciou banco');
    this.connection = new Sequelize(process.env.DATABASE_URL, databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new DataBase();
