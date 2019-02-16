var studenti;
var godine = {};
var godina = {};
var key = "";
var secret = "";

//dodavanje godina iz baze u select
function ucitajGodine() {
	var selectEl = document.getElementById("sGodina");
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var odgovor = ajax.responseText;
			var jsoni = JSON.parse(odgovor);
			godine = jsoni;
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
}

//ucitavanje studenata - BitBucket
function ucitajStudente() {

	var noviKey = document.getElementById("key").value;
	var noviSecret = document.getElementById("secret").value;
	if (noviKey == "" && noviSecret == "") {
		return;
	}
	if (noviKey != key || noviSecret != secret) {
		bb = new BitBucket(noviKey, noviSecret);
		key = noviKey;
		secret = noviSecret;
	}
	var id = document.getElementById("sGodina").value;
	var nazivSpi = "";
	var nazivVje = "";
	for (var i = 0; i < godine.length; i++) {
		if (godine[i].id == id) {
			godina = godine[i];
			nazivSpi = godine[i].nazivRepSpi;
			nazivVje = godine[i].nazivRepVje;
		}
	}
	bb.ucitaj(nazivSpi, nazivVje, function (err, s) {
		if (err) {
			document.getElementById("dodajButton").disabled = true;
			alert(err);
		}
		else {
			studenti = s;
			document.getElementById("dodajButton").disabled = false;
		}
	});


}

//dodavanje studenata u bazu - 3a
function dodajStudente() {

	var modul = new PomocniAjax();
	modul.dodajStudente(godina.id, studenti);
}