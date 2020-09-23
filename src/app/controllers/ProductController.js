import Brand from '../models/Brand';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.findAll({
        attributes: ['uid', 'name', 'quantity'],
        include: [
          {
            model: Brand,
            as: 'brand',
            attributes: ['name'],
          },
        ],
      });
      return res.json({ products });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const product = await Product.findByPk(uid, {
        attributes: ['uid', 'name', 'quantity'],
        include: [
          {
            model: Brand,
            as: 'brand',
            attributes: ['uid', 'name'],
          },
        ],
      });

      return res.json({ product });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const created = await Product.create(req.body);
      return res.json({ created });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Product.update(req.body, { where: { uid } });

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
      const deleted = await Product.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('Produto não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new ProductController();
