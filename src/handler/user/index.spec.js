const user = require('./index')
const {
  MissingParamError,
  UnauthedError,
  ServerError
} = require('../../utils/custom-error')

const makeSut = ({ accessToken = 'token', isEmailInvalid = true } = {}) => {
  const authUseCase = async (email, password) => {
    return { accessToken, email, password }
  }

  const validator = {
    email: (email = '') => {
      return email.length && isEmailInvalid
    }
  }

  return {
    authUseCase,
    validator,
    userSpy: user(authUseCase, validator)
  }
}

describe('user handler', () => {
  test('return 500 if httpRequest.body is not provided', async () => {
    const { userSpy } = makeSut()
    const httpResponse = await userSpy.login()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(ServerError('email'))
  })

  test('should return 500 if usecase is not provided', async () => {
    const httpRequest = {
      body: {
        email: '123@email',
        password: '123456'
      }
    }
    const httpResponse = await user().login(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('return 400 if email is not provided', async () => {
    const httpRequest = {
      body: {
        password: '123'
      }
    }
    const { userSpy } = makeSut()
    const httpResponse = await userSpy.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(MissingParamError('email'))
  })

  test('return 400 if password is not provided', async () => {
    const { userSpy } = makeSut()
    const httpRequest = {
      body: {
        email: '123@email'
      }
    }
    const httpResponse = await userSpy.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(MissingParamError('password'))
  })

  test('return 400 if email is invalid', async () => {
    const httpRequest = {
      body: {
        email: '123',
        password: '123'
      }
    }
    const { userSpy } = makeSut({ isEmailInvalid: false })
    const httpResponse = await userSpy.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(MissingParamError('email'))
  })

  test('should call AuthCase with correct params', async () => {
    const { userSpy, authUseCase } = makeSut()
    const httpRequest = {
      body: {
        email: '123',
        password: '456'
      }
    }
    const { email, password } = httpRequest.body
    await userSpy.login(httpRequest)
    const authResponse = await authUseCase(email, password)

    expect(authResponse.email).toBe(email)
    expect(authResponse.password).toBe(password)
  })

  test('should return 401 when email/password auth failed', async () => {
    const { userSpy } = makeSut({ accessToken: null })
    const httpRequest = {
      body: {
        email: 'error@email',
        password: '123456'
      }
    }
    const httpResponse = await userSpy.login(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(UnauthedError())
  })

  test('should return 200 when auth success', async () => {
    const { userSpy, authUseCase } = makeSut()
    const httpRequest = {
      body: {
        email: '123@email',
        password: '456'
      }
    }
    const httpResponse = await userSpy.login(httpRequest)
    const { accessToken } = await authUseCase()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(accessToken)
  })
})
