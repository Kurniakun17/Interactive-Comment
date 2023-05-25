const controllers = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/", controllers.getAllUser);
router.post("/", controllers.checkUsername);
router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.get("/drop", controllers.dropUserCollection);
// router.post("/:id", controllers.register);

module.exports = router;
