module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
      rollNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      studenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Student;
  };
  