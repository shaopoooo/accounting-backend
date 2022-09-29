const adapt = require('../utils/express-adapter')
const { user } = require('../handler/user')

module.exports = router => {
  router.post('/login', adapt(user.login()))
}
