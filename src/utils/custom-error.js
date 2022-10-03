module.exports = {
  MissingParamError: (paramName) => {
    class MissingError extends Error {
      constructor (paramName) {
        super(`Missing param ${paramName}`)
        this.name = 'MissingParamError'
      }
    }
    return new MissingError(paramName)
  },
  InvalidError: (paramName) => {
    class InvalidError extends Error {
      constructor (paramName) {
        super(`Invalid param ${paramName}`)
        this.name = 'InvalidError'
      }
    }
    return new InvalidError(paramName)
  },
  UnauthedError: () => {
    class UnauthedError extends Error {
      constructor () {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
      }
    }
    return new UnauthedError()
  },
  ServerError: () => {
    class ServerError extends Error {
      constructor () {
        super('Internal error')
        this.name = 'ServerError'
      }
    }
    return new ServerError()
  }
}
