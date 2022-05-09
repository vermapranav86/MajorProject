var express = require("express");
var router = express.Router();
var { validate } = require("../auth/user_Validation");
const resultController = require("../controllers/resultController.js");

router.get("/", validate, resultController.getAllResults);
router.post("/update", validate, resultController.updateResults);
router.post("/add", validate, resultController.addResult);
router.get("/edit/:rollNumber", validate, resultController.getOneResults);
router.delete("/delete/:rollNumber", validate, resultController.deleteResults);
router.get("/check/:rollNumber", validate, resultController.getOneResults);


router.post("/ipfs", validate, resultController.generateHash);

module.exports = router;
