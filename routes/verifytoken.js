const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(400).json({"msg":"Login or Register to continue"});
    
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('req.user', req.user)
        next()
    }catch(err){
        res.status(400).json({"msg":"Login first to place the order"})
    }
}