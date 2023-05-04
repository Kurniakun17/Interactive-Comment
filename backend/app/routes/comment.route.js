const controllers = require('../controllers/comment.controller')
const router = require('express').Router()

router.get('/', controllers.getComment)
router.post('/addComment', controllers.addComment)

module.exports = router;