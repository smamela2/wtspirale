validacijaNova = "";

function validirajNovu() {
	var naziv = document.getElementById("naziv");
	var greska = document.getElementById("greska2");
	validacijaNova = new Validacija(greska);
	return validacijaNova.naziv(naziv);
}

function ucitajStranicu() {

	//popunjavanje selecta podacima iz baze prilikom učitavanja stranice
	var modul = new PomocniAjax();
	modul.dajGodine(document.getElementById("sGodine"));
	modul.dajGodine(document.getElementById("sGodineN"));
	modul.dajVjezbe(document.getElementById("sVjezbe"));
	modul.dajVjezbe(document.getElementById("sVjezbePZ"));

	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var odgovor = ajax.responseText;
			var jsoni = JSON.parse(odgovor);
			if (jsoni[0] != undefined) {
				document.getElementById("fPoveziZadatak").action = "http://localhost:8080/vjezba/" + jsoni[0].id + "/zadatak";
				modul.dajZadatkeZaVjezbu(jsoni[0].id, document.getElementById("sZadatak"));
			}
		}
	}
	ajax.open("GET", "http://localhost:8080/vratiVjezbe", true);
	ajax.setRequestHeader('Content-Type', 'application/json');
	ajax.send();
}

//dodaje zadatke u select za odabranu vjezbu
function selectZadatak() {

	var modul = new PomocniAjax();
	var vjezba = document.getElementById("sVjezbePZ");
	var idVjezbe = vjezba.options[vjezba.selectedIndex].value;
	modul.dajZadatkeZaVjezbu(idVjezbe, document.getElementById("sZadatak"));
	document.getElementById("fPoveziZadatak").action = "http://localhost:8080/vjezba/" + idVjezbe + "/zadatak";
}
