const httpResponse = require('../../utils/http-response')
const HttpCode = require('../../utils/http-response')

// const AuthUseCase = require('./authUseCase')

module.exports = (authUseCase, validator) => ({
  login: async (httpRequest) => {
    try {
      const { email, password } = httpRequest.body
      if (!validator.email(email)) return HttpCode.badRequest('email')
      if (!password) return HttpCode.badRequest('password')

      const { accessToken } = await authUseCase(email, password)
      if (!accessToken) return HttpCode.unauthError()

      return HttpCode.success({ accessToken })
    } catch (err) {
      console.error(err)
      return httpResponse.serverError()
    }
  }
})
