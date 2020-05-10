import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import User from '../data/models/User'

class AuthController {
  static generateTokens = (user: User): [string, string] => {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    )

    return [accessToken, refreshToken]
  }

  static async login(
    email: string | undefined,
    password: string | undefined,
    token: string | undefined
  ): Promise<object> {
    if (!token) {
      const user = await getRepository(User).findOne({
        email,
        password,
      })

      if (!user) {
        throw new Error('invalid_user_or_pass')
      }

      const [accessToken, refreshToken] = this.generateTokens(user)

      return {
        accessToken,
        refreshToken,
      }
    }

    const userInfo = jwt.decode(token, { json: true })

    const user = await getRepository(User).findOne({
      email: userInfo.email,
    })

    const [accessToken] = this.generateTokens(user)

    return {
      accessToken,
      token,
    }
  }

  static async register(email: string, password: string): Promise<object> {
    const UserRepository = getRepository(User)

    const existingUser = await UserRepository.findOne({
      email,
    })

    if (existingUser) {
      throw new Error('user_already_exists')
    }

    const user = await getRepository(User).save({
      email,
      password,
    })

    const [accessToken, refreshToken] = this.generateTokens(user)

    return {
      accessToken,
      refreshToken,
    }
  }
}

export default AuthController
