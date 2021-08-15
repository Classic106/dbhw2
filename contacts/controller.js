const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  UpdateContact,
} = require("./model");

class Controller {
  async getAll(req, res) {
    const { body } = req;
    try {
      const contacts = await listContacts();
      if (contacts instanceof Error) throw contacts;
      res.json(contacts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  async getById(req, res){
        const { id } = req.params;
        const contact = await getContactById(id);
        res.json(contact);
  }
  async postAdd(req, res) {
    const { body } = req;
    
    if (!body) {
      res.status(401).json({ message: "Wrong body" });
      return;
    }

    try {
      const contact = await addContact(body);
      
      if (contact instanceof Error) throw contact;
      res.json(contact);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  async deleteContact(req, res) {
    const { id } = req.params;
    
    try {
      const contact = await removeContact(id);
      if (contact instanceof Error) throw contact;
      res.json(contact);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  async patchContact(req, res) {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      res.status(401).json({ message: "Wrong body" });
      return;
    }
    if (!id) {
      res.status(401).json({ message: "Id is undefined" });
      return;
    }

    try {
      const contact = await UpdateContact(id, body);
      if (contact instanceof Error) throw contact;
      res.json(contact);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new Controller();
