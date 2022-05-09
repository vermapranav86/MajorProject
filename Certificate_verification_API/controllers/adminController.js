
const db = require("../models");
const generateCertificate= require("../utils/generateCertificate")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");

const fs = require('fs');
const ipfsAPI = require('ipfs-api');



//Connceting to the ipfs network via infura gateway

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

const Admin = db.admin;






const registerAdmin= async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    await Admin.create(body).then((result) => {
      res
        .status(200)
        .send({status:true, msg: "Admin Registered Successfully", Admin: result });
    },(error)=>{
      res
        .status(501)
        .send({status:false, msg: "Internal server error", error: error });
    });
  };




  const adminLogin = async (req, res) => {
    const username = req.body.username;
    
    let user = await Admin.findOne({
      where: {
        username: username,
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
            .send({ status: true, userName: result, token: jsontoken });
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


  module.exports = {
      registerAdmin,
      adminLogin
  }