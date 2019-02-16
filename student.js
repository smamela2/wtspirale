const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return Student = sequelize.define("student",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        imePrezime: Sequelize.STRING,
        index:{
            type:Sequelize.STRING,
            unique:true
        }

    })
};
