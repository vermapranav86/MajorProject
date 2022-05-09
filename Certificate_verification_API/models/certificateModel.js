module.exports = (sequelize, DataTypes) => {
    const Certificate = sequelize.define("Certificate", {
      CetificateHash: {
        type: DataTypes.STRING,      
        primaryKey: true,
        allowNull:false
      },
      
      
    });
  
    return Certificate;
  };
  