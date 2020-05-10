import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import handleError from '../app/errors/handler'

const requiresAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401)
    throw new Error('unauthorized')
  }

  const token = authorization.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.JWT_SECRET)

    const data = jwt.decode(token, {
      json: true,
    })

    req.userId = data.id

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      handleError(res, new Error('token_expired'))
    }
    throw error
  }
}

export default requiresAuth
