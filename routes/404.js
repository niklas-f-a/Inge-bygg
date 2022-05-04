const Router = require('express')

const router = new Router()

router.use((req, res) => {
  res.status(404).json({message: 'No such endpoint'})
})



module.exports = router