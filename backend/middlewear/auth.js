const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.clear();

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    console.log("_______________\n\n\n\n\n\n", decodedToken, req.method);
    if (userId === undefined) throw 'Invalid token';
    if (req.method === "POST"){
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      }
    }
    next();

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};