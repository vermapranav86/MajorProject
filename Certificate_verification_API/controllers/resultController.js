const db = require("../models");
const generateCertificate= require("../utils/generateCertificate")

const fs = require('fs');
const ipfsAPI = require('ipfs-api');



//Connceting to the ipfs network via infura gateway

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

const Result = db.results;

const addResult = async (req, res) => {
  await Result.create(req.body).then((result) => {
    res.status(200).send({ msg: "Result Added Successfully", status: true });
  });
};

const getAllResults = async (req, res) => {
  let results = await Result.findAll({}).then((result) => {
    res.status(200).send({ msg: "List of Results", results: result });
  });
};

const getOneResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Result.findOne({
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

const viewResult = async (req, res) => {
  let rollNumber = req.body.rollNumber;
  let dateOfBirth = req.body.dateOfBirth;
  let result = await Result.findOne({
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

const updateResults = async (req, res) => {
  const rollNumber = req.body.rollNumber;
  generateCertificate.createCertificate(req.body,'BTeach','A')
  let result = await Result.update(req.body, {
    where: { rollNumber: rollNumber },
  }).then(async (result) => {
    fileName=req.body.studenName.replace(/ /g,'')
    
    await delay(1000)
    res.status(200).send({ msg: "Result Updated Successfully", status: true,file:fileName});
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




const deleteResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Result.destroy({ where: { rollNumber: rollNumber } }).then((result) => {
    res.status(200).send({ msg: "Result Deleted Successfully", status: true });
  });
};

const checkResult = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({
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
  addResult,
  getAllResults,
  getOneResults,
  updateResults,
  deleteResults,
  checkResult,
  viewResult,
  generateHash
};
