const db = require("../models");
const express = require("express");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Teacher = db.teachers;

const teacherLogin = async (req, res) => {
  const userName = req.body.userName;
  let user = await Teacher.findOne({
    where: {
      userName: userName,
    },
  }).then((result) => {
    if (result) {
      if (compareSync(req.body.password, result.password)) {
        result.password = undefined;
        const jsontoken = sign({ result: result }, "qwert1234", {
          expiresIn: "1d",
        });
        console.log("CREATED");
        res
          .status(200)
          .send({ status: true, userName: result.userName, token: jsontoken });
      } else {
        res.status(200).send({ status: false, msg: "Invalid Password" });
      }
    } else {
      res.status(200).send({ status: false, msg: "Invalid Username" });
    }
  });
};

const registerTeacher = async (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  await Teacher.create(body).then((result) => {
    res
      .status(200)
      .send({ msg: "User Registered Successfully", teacher: result });
  });
};

module.exports = {
  teacherLogin,
  registerTeacher,
};
