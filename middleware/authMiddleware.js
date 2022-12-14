const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        //при отправке токена сначала тип, через пробел сам токен
        const token = req.headers.authorization.split(' ')[1] 
      
        if(!token){
        return  res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        //Заппоминаем юзера и далее используем где нужно
        req.user = decoded
        next()

    } catch (e){
       return  res.status(401).json({message: "Пользователь не авторизован", error: e.message})
    }

    
}