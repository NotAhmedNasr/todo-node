const jwt = require('jsonwebtoken')

// Middleware used to sign the response with the jwt token
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
