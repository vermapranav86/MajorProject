var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.adminLogin);
router.post("/register", adminController.registerAdmin);

module.exports = router;