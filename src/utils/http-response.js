const {
  MissingParamError,
  UnauthedError,
  ServerError
} = require('./custom-error')

module.exports = {
  success: (body) => {
    return {
      statusCode: 200,
      body
    }
  },
  badRequest: (paramName) => {
    return {
      statusCode: 400,
      body: MissingParamError(paramName)
    }
  },
  unauthError: () => {
    return {
      statusCode: 401,
      body: UnauthedError()
    }
  },
  serverError: () => {
    return {
      statusCode: 500,
      body: ServerError()
    }
  }
}
