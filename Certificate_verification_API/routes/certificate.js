var express = require("express");
var router = express.Router();
const multipart = require('connect-multiparty');
const Certificatecontroller = require("../controllers/certificateController");

const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

router.get("/getHash/:rollNumber", Certificatecontroller.gethashofCertificate);
router.post("/generate", Certificatecontroller.generate);

router.post("/ipfs", Certificatecontroller.generateHash);
router.post("/add", Certificatecontroller.addCertificate);

router.post("/get", Certificatecontroller.getCertificate);
router.post("/upload",multipartMiddleware, Certificatecontroller.uploadCertz);

module.exports = router;