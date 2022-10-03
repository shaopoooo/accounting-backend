// const authUseCase = require('./authUseCase')
const httpResponse = require('../../utils/http-response')
const HttpCode = require('../../utils/http-response')

module.exports = (authUseCase) => ({
  login: async (httpRequest) => {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpCode.badRequest('email')
      // if (!/email/.test(email)) return HttpCode.badRequest('email')
      if (!password) return HttpCode.badRequest('password')

      const { accessToken } = await authUseCase(email, password)
      if (!accessToken) return HttpCode.unauthError()

      return HttpCode.success({ accessToken })
    } catch (err) {
      // console.error(err)
      return httpResponse.serverError()
    }
  }
})
