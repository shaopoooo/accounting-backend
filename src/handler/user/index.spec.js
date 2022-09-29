const user = {
  login: (httpRequest) => {
    const { email, password } = httpRequest.body

    if (!email) return { statusCode: 400 }
    if (!password) return { statusCode: 400 }

    return { statusCode: 200 }
  }
}

describe('login Router', () => {
  test('return if email is not provided', () => {
    const sut = user
    const httpRequest = {
      body: {
        password: '123'
      }
    }
    const httpResponse = sut.login(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
