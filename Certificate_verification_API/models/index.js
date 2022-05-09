const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dilect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;




db.students = require("./studentModel")(sequelize, DataTypes);
db.institutes = require("./instituteModel")(sequelize, DataTypes);
db.certificates = require("./certificateModel")(sequelize, DataTypes);

db.admin = require("./adminModel")(sequelize, DataTypes);

db.institutes.hasMany(db.students);
db.students.hasMany(db.certificates);
db.institutes.hasMany(db.certificates);


db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log("error while connecting with database");
  });

module.exports = db;
