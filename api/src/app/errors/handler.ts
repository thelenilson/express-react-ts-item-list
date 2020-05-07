import { Response } from 'express'

const handleError = (res: Response, error: Error): Response => {
  let errorCode = 400
  let errorMessage = {}

  switch (error.message) {
    case 'no_auth_info':
      errorCode = 400
      errorMessage = {
        code: errorCode,
        error: 'no_auth_info',
        error_description: 'No authentication info provided.',
      }
      break
    case 'invalid_user_or_pass':
      errorCode = 404
      errorMessage = {
        code: errorCode,
        error: 'invalid_user_or_pass',
        error_description: 'Invalid email or password.',
      }
      break
    case 'user_already_exists':
      errorCode = 400
      errorMessage = {
        code: errorCode,
        error: 'user_already_exists',
        error_description: 'User already exists.',
      }
      break
    default:
      errorCode = 400
      errorMessage = {
        code: errorCode,
        error: error.message,
        error_description: error.stack,
      }
      break
  }

  return res.status(errorCode).json(errorMessage)
}

export default handleError
