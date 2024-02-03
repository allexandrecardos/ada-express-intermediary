// middlewares/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if(!accessToken) 
        return res.status(403).json({message: "Token não informado"});
    
    try {
        jwt.verify(accessToken, process.env.PRIVATE_KEY);
        next();
    } catch (error) {
        return res.status(403).json({message: error});
    }
}

module.exports = { authenticate };