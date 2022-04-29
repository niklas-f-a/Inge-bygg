const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email }).select('+password');

    const token = bcrypt.compareSync(password, user.password);
    console.log(user, token);
  },
};
