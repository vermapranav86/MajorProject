const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
// var resultRouter = require("./routes/result");

var certificateRouter = require("./routes/certificate");

var adminRouter = require("./routes/admin");


var instituteRouter = require("./routes/institute");


const app = express();
const port = 3000;
var corsOpt = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOpt));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/teacher", teacherRouter);
// app.use("/result", resultRouter);
app.use("/student", studentRouter);


app.use("/certificate", certificateRouter);


app.use("/admin", adminRouter);

app.use("/institute", instituteRouter);

app.listen(port, () => {
  console.log(`Result Management app listening on port ${port}`);
});
