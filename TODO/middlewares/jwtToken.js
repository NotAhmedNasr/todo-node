const jwt = require('jsonwebtoken')

const signUser = async function (req, res, next) {
  const { body } = req;
  const {password, ...user} = body;

  jwt.sign(
    {
      data: {
        username: user.username
      }
    },
    'secret',
    { expiresIn: '1h' },
    (err, token) => {
      user.jwtToken = token;
      res.json(user);
    });
}

module.exports = {
  signUser
};
