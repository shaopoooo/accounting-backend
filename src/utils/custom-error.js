module.exports = {
  MissingParamError: (paramName) => {
    class CustomError extends Error {
      constructor (paramName) {
        super(`Missing param ${paramName}`)
        this.name = 'MissingParamError'
      }
    }
    return new CustomError(paramName)
  }
}
