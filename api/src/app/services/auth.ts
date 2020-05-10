import express, { Router, Response, Request } from 'express'
import AuthController from '../../controllers/auth'
import handleError from '../errors/handler'

class AuthService {
  static setupRouter(): Router {
    const router = express.Router()

    router.get('/login', this.login)
    router.post('/register', this.register)

    return router
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers
    if (!authorization) {
      return handleError(res, new Error('no_auth_info'))
    }

    let email
    let password
    let token

    if (authorization.includes('Basic')) {
      ;[email, password] = Buffer.from(
        authorization.replace('Basic ', ''),
        'base64'
      )
        .toString()
        .split(':')
    }

    if (authorization.includes('Bearer')) {
      token = authorization.replace('Bearer ', '')
    }

    try {
      const tokens = await AuthController.login(email, password, token)

      return res.status(200).json(tokens)
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async register(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers
    if (!authorization) {
      return handleError(res, new Error('no_auth_info'))
    }

    const [email, password] = Buffer.from(
      authorization.replace('Basic ', ''),
      'base64'
    )
      .toString()
      .split(':')

    try {
      const tokens = await AuthController.register(email, password)

      return res.status(200).json(tokens)
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default AuthService
