import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    try {
      const created = await Client.create(req.body);
      return res.json({ created });
    } catch (error) {
      return res.json({ error });
    }
  }

  async index(req, res) {
    try {
      const clients = await Client.findAll({
        attributes: ['uid', 'name', 'cpf'],
      });
      return res.json({ clients });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const client = await Client.findByPk(uid, {
        attributes: ['uid', 'name'],
      });

      return res.json({ client });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new ClientController();
