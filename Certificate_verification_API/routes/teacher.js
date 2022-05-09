var express = require("express");
var router = express.Router();
const teacherController = require("../controllers/teacherController.js");

router.post("/login", teacherController.teacherLogin);
router.post("/register", teacherController.registerTeacher);

module.exports = router;
