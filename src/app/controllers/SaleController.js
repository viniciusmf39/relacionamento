import Sale from '../models/Sale';
import Product from '../models/Product';
import Client from '../models/Client';
import ProductSale from '../models/ProductSale';
import SaleClient from '../models/SaleClient';

class SaleController {
  async index(req, res) {
    try {
      const sales = await Sale.findAll({
        attributes: ['uid', 'total_price', 'quantity_items'],
        include: [
          {
            model: ProductSale,
            as: 'products',
            attributes: ['product_uid'],
            include: [
              {
                model: Product,
                as: 'products',
                attributes: ['name'],
              },
            ],
          },
          {
            model: SaleClient,
            as: 'client',
            attributes: ['client_uid'],
            include: [
              {
                model: Client,
                as: 'client',
                attributes: ['name', 'cpf'],
              },
            ],
          },
        ],
      });
      return res.json({ sales });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const sale = await Sale.findByPk(uid, {
        attributes: ['uid', 'total_price', 'quantity_items'],
        include: [
          {
            model: ProductSale,
            as: 'products',
            attributes: ['product_uid'],
            include: [
              {
                model: Product,
                as: 'products',
                attributes: ['name'],
              },
            ],
          },
          {
            model: SaleClient,
            as: 'client',
            attributes: ['client_uid'],
            include: [
              {
                model: Client,
                as: 'client',
                attributes: ['name', 'cpf'],
              },
            ],
          },
        ],
      });

      return res.json({ sale });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    const t = await Sale.sequelize.transaction();

    try {
      const new_sale = await Sale.create(req.body, {
        transaction: t,
      });

      const { products } = req.body;

      const { clients } = req.body;

      await Promise.all(
        products.map(async (product_uid) => {
          const product = await ProductSale.create(
            {
              sale_uid: new_sale.uid,
              product_uid,
            },
            { transaction: t }
          );
          return product;
        }),
        clients.map(async (client_uid) => {
          const client = await SaleClient.create(
            {
              sale_uid: new_sale.uid,
              client_uid,
            },
            { transaction: t }
          );
          return client;
        })
      );

      await t.commit();

      return res.json({ new_sale });
    } catch (error) {
      await t.rollback();
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Sale.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('erro ao atualizar dados');
      }

      return res.json({ result: 'dados atualizados com sucesso' });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Sale.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('Venda não encontrada');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new SaleController();
