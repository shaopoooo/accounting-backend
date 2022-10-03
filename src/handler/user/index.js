// const authUseCase = require('./authUseCase')
const HttpCode = require('../../utils/http-response')

module.exports = {
  login: (httpRequest) => {
    if (!httpRequest || !httpRequest.body) return HttpCode.serverError()

    const { email, password } = httpRequest.body
    if (!email) return HttpCode.badRequest('email')
    if (!password) return HttpCode.badRequest('password')

    return HttpCode.success()
  }
}
