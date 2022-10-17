const jwt = require("jsonwebtoken");

module.exports = function(req, resp, next) {
    try{
        let token = req.header('x-token');
        if(token == null){
            return resp.status(400).send("token not found");
        }else{
            let decode = jwt.verify(token, 'jwtSecurtyKey');
            req.user = decode.user
            next();
        }

    }catch(err){
        console.log(err);
        return resp.status(500).send("Invalid token or token expired")

    }
}