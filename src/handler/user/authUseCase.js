const { getUserInfo } = require('../../model/user')

module.exports = {
  auth: async (email, password) => {
    if (!email) throw new Error('missing email')
    if (!password) throw new Error('missing password')

    const user = await getUserInfo(email)
    const valid = user
    if (!valid) return null
    return 'test'
  }
}
