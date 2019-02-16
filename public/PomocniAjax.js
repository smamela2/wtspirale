var PomocniAjax = (function () {
    var konstruktor = function () {

        return {
            //dodavanje godina iz baze u select
            dajGodine: function (selectEl) {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var odgovor = ajax.responseText;
                        var jsoni = JSON.parse(odgovor);
                        selectEl.innerHTML = "";
                        for (var i = 0; i < jsoni.length; i++) {
                            var opcija = document.createElement('option');
                            opcija.value = jsoni[i].id;
                            opcija.innerHTML = jsoni[i].naziv;
                            selectEl.appendChild(opcija);
                        }
                    }
                }
                ajax.open("GET", "http://localhost:8080/vratiGodine", true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            },
            //dodavanje vjezbi iz baze u select 
            dajVjezbe: function (selectEl) {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var odgovor = ajax.responseText;
                        var jsoni = JSON.parse(odgovor);
                        selectEl.innerHTML = "";
                        for (var i = 0; i < jsoni.length; i++) {
                            var opcija = document.createElement('option');
                            opcija.value = jsoni[i].id;
                            opcija.innerHTML = jsoni[i].naziv;
                            selectEl.appendChild(opcija);
                        }
                    }
                }
                ajax.open("GET", "http://localhost:8080/vratiVjezbe", true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            },
            //dodaje zadatke u select za odabranu vjezbu
            dajZadatkeZaVjezbu: function (vjezba, selectEl) {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var odgovor = ajax.responseText;
                        var jsoni = JSON.parse(odgovor);
                        selectEl.innerHTML = "";
                        for (var i = 0; i < jsoni.length; i++) {
                            var opcija = document.createElement('option');
                            opcija.value = jsoni[i].id;
                            opcija.innerHTML = jsoni[i].naziv;
                            selectEl.appendChild(opcija);
                        }
                    }
                }
                ajax.open("GET", "http://localhost:8080/vratiZadatke?vjezba=" + vjezba, true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            },
            //dodavanje studenata - 3a
            dodajStudente: function (godina, studenti) {

                var objekat = { godina: godina, studenti: studenti };
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var odgovor = JSON.parse(ajax.responseText);
                        alert(odgovor.message);
                    }
                }

                ajax.open("POST", "http://localhost:8080/student", true);
                ajax.setRequestHeader("Content-Type", 'application/json');
                ajax.send(JSON.stringify(objekat));
            }
        }
    }

    return konstruktor;
}());