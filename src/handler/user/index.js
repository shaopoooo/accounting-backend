const authUseCase = require('./authUseCase')

exports.user = {
  login: () => {
    return async (request) => {
      try {
        const { email, password } = request.body

        if (!email) {
          return {
            statusCode: 404,
            body: {
              msg: 'emailError'
            }
          }
        }

        if (!password) {
          return {
            statusCode: 404,
            body: {
              msg: 'passwordError'
            }
          }
        }

        const accessToken = await authUseCase.auth(email, password)

        return {
          statusCode: 200,
          body: {
            accessToken
          }
        }
      } catch (error) {
        return {
          statusCode: 500,
          body: {
            error
          }
        }
      }
    }
  }
}
