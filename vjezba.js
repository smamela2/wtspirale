const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return Vjezba = sequelize.define("vjezba",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        naziv:{
            type:Sequelize.STRING,
            unique:true
        },
        spirala: Sequelize.BOOLEAN
    })
};
