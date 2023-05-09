const controllers = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/register", controllers.register);
router.get("/", controllers.getUser);

module.exports = router;
