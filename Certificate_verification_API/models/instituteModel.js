module.exports = (sequelize, DataTypes) => {
    const Institute = sequelize.define("Institute", {
      ethaddress: {
        type: DataTypes.STRING,      
        primaryKey: true,
        allowNull:false
      },
      instituteName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      instituteCode:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      approved:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Institute;
  };
  