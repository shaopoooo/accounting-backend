const { MissingParamError } = require('./custom-error')

module.exports = {
  badRequest: (paramName) => {
    return {
      statusCode: 400,
      body: MissingParamError(paramName)
    }
  },
  serverError: () => {
    return { statusCode: 500 }
  },
  success: () => {
    return { statusCode: 200 }
  }
}
