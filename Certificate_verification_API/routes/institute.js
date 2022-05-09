var express = require("express");
var router = express.Router();
const instituteController = require("../controllers/instituteController");

router.post("/login", instituteController.instituteLogin);
router.post("/register", instituteController.registerInstitute);
router.get("/approved", instituteController.alreadyapproved);
router.get("/toapprove", instituteController.toapprove);
router.put("/validate", instituteController.validate);
module.exports = router;
