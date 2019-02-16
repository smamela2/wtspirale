const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return Godina = sequelize.define("godina",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nazivGod:{
            type:Sequelize.STRING,
            unique:true
        },
        nazivRepSpi: Sequelize.STRING,
        nazivRepVje:Sequelize.STRING
    })
};
