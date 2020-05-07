import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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

  jwt.verify(token, process.env.JWT_SECRET)

  const data = jwt.decode(token, {
    json: true,
  })

  req.userId = data.id

  next()
}

export default requiresAuth
