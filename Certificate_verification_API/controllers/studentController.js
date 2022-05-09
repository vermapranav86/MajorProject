const db = require("../models");
const generateCertificate= require("../utils/generateCertificate")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");

const fs = require('fs');
const ipfsAPI = require('ipfs-api');





const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

const Student = db.students;

const registerStudent = async (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  await Student.create(body).then((result) => {
    res
      .status(200)
      .send({status:true, msg: "User Registered Successfully", Student: result.rollNumber });
  },(error)=>{
    res
      .status(501)
      .send({status:false, msg: "Internal server error", error: error });
  });
};





const studentLogin = async (req, res) => {
  const email = req.body.email;
  
  let user = await Student.findOne({
    where: {
      email: email,
    },
  }).then((result) => {

    console.log(result)
    if (result!=null) {
      if (compareSync(req.body.password, result.password)) {
        result.password = undefined;
        const jsontoken = sign({ result: result }, "qwert1234", {
          expiresIn: "1d",
        });
        console.log("CREATED");
        res
          .status(200)
          .send({ status: true, userName: result.rollNumber, token: jsontoken });
       } else {
        res.status(200).send({ status: false, msg: "Invalid Password" });
      }
    } else {
      res.status(200).send({ status: false, msg: "Invalid Username" });
    }
  },(error)=>{
    res.status(200).send({ status: false, msg: "Invalid email" });
  });
};



const alreadyGenerated= async (req,res)=>{
  let ethaddress=req.body.ethaddress
  let students = await Student.findAll({
    attributes: {},
    
    where: {
      rollNumber:{
        [Op.in]:db.sequelize.literal(`(
          select StudentRollNumber from  certificates where InstituteEthaddress = "${ethaddress}"
        )`)
      }
      
    }
  }).then((result) => {
    console.log(result)
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
}

const toGenerated= async (req,res)=>{
  let ethaddress=req.body.ethaddress
  let students = await Student.findAll({
    attributes: {},
    
    where: {
      rollNumber:{
        [Op.notIn]:db.sequelize.literal(`(
          select StudentRollNumber from  certificates where InstituteEthaddress = "${ethaddress}"
        )`)
      }
      
    }
  }).then((result) => {
    console.log(result)
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
}

    
    
  


const getAllStudent = async (req, res) => {
  let results = await Student.findAll({}).then((result) => {
    res.status(200).send({ msg: "List of Results", results: result });
  });
};

const getOneStudent = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Student.findOne({
    where: {
      rollNumber: rollNumber,
    },
  }).then((result) => {
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
};

const viewStudent = async (req, res) => {
  let rollNumber = req.body.rollNumber;
  let dateOfBirth = req.body.dateOfBirth;
  let result = await Student.findOne({
    where: {
      rollNumber: rollNumber,
      dateOfBirth: dateOfBirth,
    },
  }).then((result) => {
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
};

function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}




const generate = async (req, res) => {
 
  generateCertificate.createCertificate(req.body)
  .then(async (result) => {
    
    
    await delay(1000)
    res.status(200).send({ msg: "Certificate Generated Successfully", status: true,file:fileName});
  });
};


const generateHash = async (req, res) => {
  
  let testFile = fs.readFileSync("output.pdf");
  ipfs.files.add(testFile,  function (err, file) {
    if (err) {
      console.log(err);
      res.status(200).send({ msg: "Result Updated Successfully", status: false});
  
    }
    else{
      console.log(file)
      res.status(200).send({ msg: "Result Updated Successfully", status: true,fileHash:file[0].hash});

    }
    
    
  })
    
    await delay(500)
    
};




const deleteStudent = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Student.destroy({ where: { rollNumber: rollNumber } }).then((result) => {
    res.status(200).send({ msg: "Result Deleted Successfully", status: true });
  });
};

const checkStudent = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Student.findOne({
    where: {
      rollNumber: rollNumber,
    },
  }).then((result) => {
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Result Not Exist", status: false });
    }
  });
};

module.exports = {
  registerStudent,
  studentLogin,
  alreadyGenerated,
  toGenerated,
  getAllStudent,
  getOneStudent,

  deleteStudent,
  checkStudent,
  viewStudent,
  generateHash
};
