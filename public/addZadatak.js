validacija = "";

function validiraj(){
	var greska = document.getElementById("greska");
	validacija = new Validacija(greska);
	var naziv = document.getElementById("naziv");
	return validacija.naziv(naziv);
}