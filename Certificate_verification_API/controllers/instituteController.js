const db = require("../models");
const express = require("express");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Institute = db.institutes;

const instituteLogin = async (req, res) => {
  const ethaddress = req.body.ethaddress;
  
  let user = await Institute.findOne({
    where: {
      ethaddress: ethaddress,
    },
  }).then((result) => {

    
    if (result) {
      if (result.approved==1) {
        result.password = undefined;
        const jsontoken = sign({ result: result }, "qwert1234", {
          expiresIn: "1d",
        });
        
        res
          .status(200)
          .send({ status: true, userName: result.ethaddress, token: jsontoken });
      } else {
        res.status(200).send({ status: false, approval:false, msg: "Approval is pending contact to Admin" });
      }
    } else {
      res.status(200).send({ status: false, msg: "You have used wrong address or you dosen't register with us. Please Register yourself" });
    }
  });
};

const registerInstitute = async (req, res) => {
  const body = req.body;
  body.approved=0
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  await Institute.create(body).then((result) => {
    res
      .status(200)
      .send({status:true, msg: "User Registered Successfully", Institute: result });
  });
};




const alreadyapproved= async (req,res)=>{
  
  let institutes = await Institute.findAll({    
    where: {
      approved:1
      
    }
  }).then((result) => {

    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
}

const toapprove= async (req,res)=>{
  
  let institutes = await Institute.findAll({    
    where: {
      approved:0
      
    }
  }).then((result) => {
    
    if (result != null) {
      res.status(200).send({ msg: result, status: true });
    } else {
      res.status(200).send({ msg: "Invalid Credentials", status: false });
    }
  });
}

const validate= async (req,res)=>{
  let ins = req.body;
console.log(ins[1]);
  await Institute.update({approved:1},{
    where: {
      ethaddress:ins[1]
      
    }
  }).then((result) => {
    
      res.status(200).send({ msg: result, status: true });
  
  },(error)=>{
    res.status(200).send({ msg: "internal error", status: false });
  });
}

module.exports = {
  instituteLogin,
  registerInstitute,
  alreadyapproved,
  toapprove,
  validate
};
