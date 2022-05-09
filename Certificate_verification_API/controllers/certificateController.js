const db = require("../models");
const generateCertificate= require("../utils/generateCertificate")
const fs = require('fs');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

const Certificate = db.certificates;



  const gethashofCertificate = async (req, res) => {
    let rollNumber = req.params.rollNumber;
    await Certificate.findOne({
      where: {
        StudentRollNumber: rollNumber,
      },
    }).then((result) => {
      if (result != null) {
        res.status(200).send({ msg: result.CetificateHash, status: true });
      } else {
        res.status(200).send({ msg: "not found", status: false });
      }
    });
  };
  

  function delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const generate = async (req, res) => {
 
    generateCertificate.createCertificate(req.body)
   
      await delay(1000)
      res.status(200).send({ msg: "Certificate Generated Successfully", status: true});

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

const uploadCertz=async (req, res) => {


  let File=req.files.uploadFile
  let testFile = fs.readFileSync(File.path);

  ipfs.files.add(testFile,  function (err, file) {
    if (err) {
      console.log(err);
      res.status(200).send({ msg: "Result Updated Successfully", status: false});
  
    }
    else{
      console.log(file)
      fs.rmSync(File.path, {
        force: true,
    });
      res.status(200).send({ msg: "Result Updated Successfully", status: true,fileHash:file[0].hash});
 
    }
    
    
  })
}

  const addCertificate = async (req, res) => {
    let details = req.body

    let data ={
      CetificateHash:details.CetificateHash,
      InstituteEthaddress:details.InstituteEthaddress,
      StudentRollNumber:details.rollNumber

    }
    console.log(details)
    await Certificate.create(data).then((result) => {
      res.status(200).send({ msg: "Certificate generated Successfully", status: true });
    });
  };


  const getCertificate=async (req, res) => {
    let rollNumber = req.body.rollNumber

    console.log(req.body);

    Certificate.findOne({
      where: {
        StudentRollNumber: rollNumber,
      },
    }).then((result) => {

      console.log(result.dataValues);

      if (result != null) {
        
        res.status(200).send({ msg: result.dataValues, status: true });
      } else {
        res.status(200).send({ msg: "Invalid Credentials", status: false });
      }
    })


  }

  module.exports = {
    gethashofCertificate,
    generate,
    generateHash,
    addCertificate,
    uploadCertz,
    getCertificate
  };
  
  