const adapt = require('../utils/express-adapter')
const { user } = require('../handler')

module.exports = router => {
  router.post('/login', adapt(user.login))
}
