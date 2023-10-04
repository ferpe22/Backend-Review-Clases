const { verifyToken } = require("../utils/jwt")
const UsersService = require("../services/usersService")

class UserMiddleware {
    constructor () {
        this.service = new UsersService()
    }

    async isAuth (req, res, next) {
        const authHeader = req.headers.authorization
        
        if(!authHeader) {
            return res.status(401).json({
                error: 'Necesitas autenticarte'
            })
        }
        
        const token = authHeader.replace('Bearer ', '')

        let payload

        try {
            payload = await verifyToken(token)
        } catch (e) {
            return res.status(401).json({
                error: e.message
            })
        }

        const user = this.service.get(payload.userId)

        if(!user) {
            return res.status(401).json({
                error: 'Token invalido'
            })
        }
        
        console.log({ payload, user })

        return next()
    }
}

module.exports = UserMiddleware