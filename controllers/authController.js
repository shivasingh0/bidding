const { register, login } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await register(username, email, password);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
