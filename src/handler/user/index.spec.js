const user = {
  login: (httpRequest) => {
    if (!httpRequest || !httpRequest.body) return HttpCode.serverError()

    const { email, password } = httpRequest.body
    if (!email) return HttpCode.badRequest('email')
    if (!password) return HttpCode.badRequest('password')

    return { statusCode: 200 }
  }
}

const HttpCode = {
  badRequest: (paramName) => {
    return {
      statusCode: 400,
      body: MissingParamError(paramName)
    }
  },
  serverError: () => {
    return { statusCode: 500 }
  }
}

const MissingParamError = (paramName) => {
  class CustomError extends Error {
    constructor (paramName) {
      super(`Missing param ${paramName}`)
      this.name = 'MissingParamError'
    }
  }
  return new CustomError(paramName)
}

describe('login Router', () => {
  test('return 500 if httpRequest.body is not provided', () => {
    const sut = user
    const httpResponse = sut.login()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('return 400 if email is not provided', () => {
    const sut = user
    const httpRequest = {
      body: {
        password: '123'
      }
    }
    const httpResponse = sut.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(MissingParamError('email'))
  })

  test('return 400 if password is not provided', () => {
    const sut = user
    const httpRequest = {
      body: {
        email: '123'
      }
    }
    const httpResponse = sut.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(MissingParamError('password'))
  })
})
