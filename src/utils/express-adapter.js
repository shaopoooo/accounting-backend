module.exports = router => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    try {
      const httpResponse = await router(httpRequest)
      if (httpResponse.headers) res.set(httpResponse.headers)

      res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (e) {
      res.status(500).send({ error: 'An unkown error' })
    }
  }
}
