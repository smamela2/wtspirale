var validacija = "";

function validiraj(){
	
	var greska = document.getElementById("greska");
	validacija=new Validacija(greska);
	var query = document.getElementById("query");
	validacija.ime(query);
	
	
}