const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const url = require('url');
const multer = require('multer');
const pug = require('pug');
const bodyParser = require('body-parser');
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const Sequelize = require("sequelize");
const db = require('./db.js');

db.sequelize.sync();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.naziv + '.pdf');
    }
}
);

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {

        db.zadatak.findOne({ where: { naziv: req.body.naziv } }).then(function (zadatak) {
            if (zadatak != null) {
                return cb(new Error("Postoji file sa istim nazivom"), false);
            }
        }).catch(function (err) { });
        if (path.extname(file.originalname) !== '.pdf') {
            return cb(new Error("Uploadovani file nije pdf"), false);
        }
        /*else if (fs.existsSync('uploads/' + req.body.naziv + '.pdf')) {
            return cb(new Error("Postoji file sa istim nazivom"), false);
        }*/
        else if (req.body.naziv == null || req.body.naziv == "") {
            return cb(new Error("Nije proslijeđen naziv"), false);
        }
        return cb(null, true);
    }
}
).single('postavka');



app.post('/addZadatak', function (req, res, next) {
    //drugi zadatak - treca spirala
    upload(req, res, function (err) {

        if (err) {
            res.render('greska', { tekstGreske: err.message, link: 'addZadatak.html' });
        }
        else if (typeof (req.file) == 'undefined') {
            res.render('greska', { tekstGreske: "Nije uploadovan file", link: 'addZadatak.html' });
        }
        else {
            var pos = "http://localhost:8080/" + encodeURIComponent(req.body.naziv + ".pdf");
            db.zadatak.create({ naziv: req.body.naziv, postavka: pos }).then(function (zadatak) {
                var objekat = { "naziv": req.body.naziv, "postavka": "http://localhost:8080/" + encodeURIComponent(req.body.naziv + ".pdf") }
                fs.writeFile("uploads/" + req.body.naziv + "Zad.json", JSON.stringify(objekat), function (err) { });
                res.contentType('application/json');
                res.status(200);
                res.send(objekat);
            }).catch(function (err) {
                res.render('greska', { tekstGreske: "Greška prilikom dodavanja zadatka", link: 'addZadatak.html' });
            });
        }
    });
});

app.get('/zadatak', function (req, res) {
    //treci zadatak - treca spirala
    var p = url.parse(req.url, true);
    var upit = p.query;
    let upiti = new url.URLSearchParams(upit);
    var nazivZadatka = upiti.get('naziv');
    if (nazivZadatka != null) {
        db.zadatak.findOne({ where: { naziv: nazivZadatka } }).then(function (z) {
            if (z == null) {
                res.render('greska', { tekstGreske: 'Ne postoji traženi zadatak', link: '#' });
            }
            else {
                res.redirect(z.postavka);
            }
        }).catch(function (err) {
            res.render('greska', { tekstGreske: 'Greška', link: '#' });
        });
    }
    else if (nazivZadatka == null) {
        res.render('greska', { tekstGreske: 'Niste proslijedili parametar naziv', link: '#' });
    }
});

app.post('/addGodina', function (req, res) {
    //cetvrti zadatak - treca spirala
    let tijelo = req.body;
    if (tijelo['nazivGod'] == null || tijelo['nazivRepVje'] == null || tijelo['nazivRepSpi'] == null || tijelo['nazivGod'] == "" || tijelo['nazivRepVje'] == "" || tijelo['nazivRepSpi'] == "") {
        res.render('greska', { tekstGreske: 'Nisu proslijeđeni svi parametri', link: 'addGodina.html' });
    }
    else {
        db.godina.create({ nazivGod: tijelo['nazivGod'], nazivRepSpi: tijelo['nazivRepSpi'], nazivRepVje: tijelo['nazivRepVje'] }).then(function (k) {
            res.redirect("addGodina.html");
        }).catch(function (err) {
            res.render('greska', { tekstGreske: 'Postoji već godina sa unesenim nazivom', link: 'addGodina.html' });
        });
    }
});

app.get('/godine', function (req, res) {
    //peti zadatak - treca spirala
    db.godina.findAll().then(function (godine) {
        var sveGodine = godine.map(z => { return { nazivGod: z.nazivGod, nazivRepSpi: z.nazivRepSpi, nazivRepVje: z.nazivRepVje } });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(sveGodine));
    }).catch(function (err) {
        res.render('greska', { tekstGreske: 'Greška pri dobavljanju godina', link: '#' });
    });
});


app.get('/zadaci', function (req, res) {
    //sedmi zadatak - treca spirala
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.zadatak.findAll().then(function (zadaci) {
        var niz = zadaci.map(z => { return { naziv: z.naziv, postavka: z.postavka } });
        var headeri = req.get('Accept');
        var jsonJ = /application\/json/;
        var jsonX2 = /application\/xml/;
        var jsonX1 = /text\/xml/;
        var jsonC = /text\/csv/;

        if (jsonJ.test(headeri)) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(niz));
        }
        else if (jsonC.test(headeri)) {
            var odgovor = "";
            for (var i = 0; i < niz.length; i++) {
                odgovor = odgovor + niz[i].naziv + ',' + niz[i].postavka + '\n';
            }
            res.writeHead(200, { "Content-Type": "text/csv" });
            res.end(odgovor);
        }
        else if (jsonX1.test(headeri) || jsonX2.test(headeri)) {
            var odgovor = "";
            odgovor = odgovor + '<?xml version="1.0" encoding="UTF-8"?><zadaci>';
            for (var i = 0; i < niz.length; i++) {
                odgovor = odgovor + '<zadatak>' + '<naziv> ' + niz[i].naziv + ' </naziv>' + '<postavka> ' + niz[i].postavka + ' </postavka></zadatak>';
            }
            odgovor += '</zadaci>';
            res.writeHead(200, { "Content-Type": "application/xml" });
            res.end(odgovor);
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(niz));
        }
    }).catch(function (err) {
        res.render('greska', { tekstGreske: 'Greška prilikom dobavljanja zadataka', link: '#' });
    });
});



app.post('/addVjezba', function (req, res) {
    //spirala 4 - 2a i 2b
    let tijelo = req.body;

    //2a
    if (tijelo['sGodine'] != null && tijelo['sVjezbe'] != null) {
        db.godina.findOne({ where: { id: tijelo['sGodine'] } }).then(function (god) {
            if (god) {
                db.vjezba.findOne({ where: { id: tijelo['sVjezbe'] } }).then(function (vje) {
                    if (vje) {
                        vje.addGodine(god);
                        res.redirect('addVjezba.html');
                    }
                    else {
                        res.render('greska', { tekstGreske: 'Ne postoji vježba', link: '#' });
                    }
                });
            }
            else {
                res.render('greska', { tekstGreske: 'Ne postoji godina', link: '#' });
            }
        });
    }
    //2b
    else if (tijelo['sGodine'] != null && tijelo['naziv'] != null) {
        db.vjezba.create({ naziv: tijelo['naziv'], spirala: tijelo['spirala'] == 'on' }).then(function (vje) {
            db.godina.findOne({ where: { id: tijelo['sGodine'] } }).then(function (god) {
                if (god) {
                    vje.addGodine(god);
                    res.redirect('addVjezba.html');
                }
                else {
                    res.render('greska', { tekstGreske: 'Ne postoji godina', link: 'http://localhost:8080/addVjezba.html' });
                }
            });
        }).catch(function (err) {
            res.render('greska', { tekstGreske: 'Postoji već vježba sa unesenim nazivom', link: 'http://localhost:8080/addVjezba.html' });
        });
    }
    else {
        res.render('greska', { tekstGreske: 'Niste proslijedili sve parametre', link: 'http://localhost:8080/addVjezba.html' });
    }
});

app.post('/vjezba/:idVjezbe/zadatak', function (req, res) {
    //spirala 4 - 2c
    var tijelo = req.body;
    var id = req.params.idVjezbe;
    db.vjezba.findOne({ where: { id: id } }).then(function (vje) {
        if (vje) {
            db.zadatak.findOne({ where: { id: tijelo['sZadatak'] } }).then(function (zad) {
                if (zad) {
                    zad.addVjezbe(vje);
                    res.redirect('http://localhost:8080/addVjezba.html');
                }
                else {
                    res.render('greska', { tekstGreske: 'Ne postoji zadatak', link: 'http://localhost:8080/addVjezba.html' });
                }
            });
        }
        else { res.render('greska', { tekstGreske: 'Ne postoji vježba', link: 'http://localhost:8080/addVjezba.html' }); }
    });
});

app.post('/student', function (req, res) {
    //spirala 4 - 3a

    if (!req.body.godina || !req.body.studenti) {
        res.render('greska', { tekstGreske: 'Nisu proslijeđeni svi parametri', link: 'addStudent.html' });
    }
    else {
        var godina = req.body.godina;
        var studenti = req.body.studenti;

        var brojDodanih = 0;
        var brojUpisanih = 0;

        if (studenti.length == 0) {
            db.godina.findOne({ where: { id: godina } }).then(function (god) {
                var poruka = "Dodano je " + brojDodanih + " novih studenata i upisano " + brojUpisanih + " na godinu " + god.nazivGod;
                res.writeHead(200, { "Content-Type": "application/json" });
                var j = { message: poruka };
                res.end(JSON.stringify(j));
            });
        }
        else {
            for (var i = 0; i < studenti.length; i++) {
                db.student.create({ imePrezime: studenti[i].imePrezime, index: studenti[i].index, studentGod: godina }).then(function (student) {
                    brojDodanih = brojDodanih + 1;
                    brojUpisanih = brojUpisanih + 1;
                    if (brojUpisanih == studenti.length) {
                        db.godina.findOne({ where: { id: godina } }).then(function (god) {
                            var poruka = "Dodano je " + brojDodanih + " novih studenata i upisano " + brojUpisanih + " na godinu " + god.nazivGod;
                            res.writeHead(200, { "Content-Type": "application/json" });
                            var j = { message: poruka };
                            res.end(JSON.stringify(j));
                        });
                    }
                }).catch(function (error) {
                    db.student.update({ studentGod: godina }, {
                        where: {
                            index: error.fields.index
                        }
                    }).then(function (st) {
                        brojUpisanih = brojUpisanih + 1
                        if (brojUpisanih == studenti.length) {
                            db.godina.findOne({ where: { id: godina } }).then(function (god) {
                                var poruka = "Dodano je " + brojDodanih + " novih studenata i upisano " + brojUpisanih + " na godinu " + god.nazivGod;
                                res.writeHead(200, { "Content-Type": "application/json" });
                                var j = { message: poruka };
                                res.end(JSON.stringify(j));
                            });
                        }
                    })
                });
            }
        }
    }
});


app.get('/vratiVjezbe', function (req, res) {
    db.vjezba.findAll().then(function (vjezbe) {
        var sveVjezbe = vjezbe.map(v => { return { id: v.id, naziv: v.naziv } });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(sveVjezbe));
    });
});

app.get('/vratiGodine', function (req, res) {
    db.godina.findAll().then(function (godine) {
        var sveGodine = godine.map(g => { return { id: g.id, naziv: g.nazivGod, nazivRepSpi: g.nazivRepSpi, nazivRepVje: g.nazivRepVje } });
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify(sveGodine));
    });
});

app.get('/vratiZadatke', function (req, res) {
    var p = url.parse(req.url, true);
    var upit = p.query;
    let upiti = new url.URLSearchParams(upit);
    var idVjezbe = upiti.get('vjezba');
    db.vjezba.findOne({ where: { id: idVjezbe } }).then(function (vjezba) {
        vjezba.getZadaci().then(function (zadaci) {
            db.zadatak.findAll().then(function (sviZadaci) {
                var niz = [];
                for (var i = 0; i < sviZadaci.length; i++) {
                    var ima = 0;
                    for (var j = 0; j < zadaci.length; j++) {
                        if (zadaci[j].id == sviZadaci[i].id) {
                            ima = 1;
                        }
                    }
                    if (ima == 0) {
                        niz.push(sviZadaci[i]);
                    }
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(niz));
            });
        });
    });
});

app.listen(8080);
