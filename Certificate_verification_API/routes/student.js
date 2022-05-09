var express = require("express");
var router = express.Router();
const StudentController = require("../controllers/studentController");

router.post("/register", StudentController.registerStudent);
router.post("/login", StudentController.studentLogin);
router.post("/alredyGenerated", StudentController.alreadyGenerated);

router.post("/toGenerated", StudentController.toGenerated);

router.get("/getByRoll/:rollNumber", StudentController.getOneStudent);

module.exports = router;
