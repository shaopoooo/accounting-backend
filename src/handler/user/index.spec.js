const user = require('./index')
const { MissingParamError } = require('../../utils/custom-error')

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
