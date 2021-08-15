const { 
    listUsers,
    regUsers,
    logUsers
} = require('./model');

class Controller {
  async getAll(req, res) {
    try {
      const users = await listUsers();
      if (users instanceof Error) throw users;
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async postReg(req, res) {
    const { body } = req;

    if (!body.login || !body.password) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }

    try {
      const user = await regUsers(body);
      if (user instanceof Error) throw user;
      res.header('Authorization', user.token);
      res.json(user.user);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  async postLog(req, res) {
    const { body } = req;

    if (!body.login || !body.password) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }

    try {
      const user = await logUsers(body);
      if (user instanceof Error) throw user;
      res.header('Authorization', user.token);
      res.json(user.user);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = new Controller();
