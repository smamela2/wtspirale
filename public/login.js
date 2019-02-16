var validacija = "";

function validiraj(){
	
	var greska = document.getElementById("greska");
	validacija=new Validacija(greska);
	var pass = document.getElementById("password");
	validacija.password(pass);
	
}