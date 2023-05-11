const controllers = require('../controllers/comment.controller')
const router = require('express').Router()

router.get('/', controllers.getAllRootComments)
router.get('/:id', controllers.getComment)
router.post('/addComment', controllers.addComment)
router.put("/:id", controllers.updateComment);
router.delete("/:id", controllers.deleteComment)

module.exports = router; 