const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018","root","root",{host:"localhost",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.student = sequelize.import(__dirname+'/student.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

//relacije
db.godina.hasMany(db.student,{as:'studenti',foreignKey: 'studentGod'});

db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idvjezba'});
db.godina.belongsToMany(db.vjezba,{as:'vjezbe',through:'godina_vjezba',foreignKey:'idgodina'});

db.vjezba.belongsToMany(db.zadatak,{as:'zadaci',through:'vjezba_zadatak',foreignKey:'idvjezba'});
db.zadatak.belongsToMany(db.vjezba,{as:'vjezbe',through:'vjezba_zadatak',foreignKey:'idzadatak'});


module.exports=db;