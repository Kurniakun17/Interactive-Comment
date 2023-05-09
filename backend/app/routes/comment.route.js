const controllers = require('../controllers/comment.controller')
const router = require('express').Router()

router.get('/', controllers.getComment)
router.post('/addComment', controllers.addComment)
router.post("/addReply/:commentId", controllers.addReply);

module.exports = router; 