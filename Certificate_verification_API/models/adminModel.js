module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
      id: {
        type: DataTypes.INTEGER,      
        primaryKey: true,
        allowNull:false
      },
      username:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Admin;
  };
  