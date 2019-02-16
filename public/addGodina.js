function validiraj(){
	
	var greska = document.getElementById("greska");
	var nazivG = document.getElementById("nazivG");
	var nazivV = document.getElementById("nazivV");
	var nazivS = document.getElementById("nazivS");
	
	validacija=new Validacija(greska);
	
	var a = validacija.godina(nazivG);
	var b = validacija.naziv(nazivS);
	var c = validacija.naziv(nazivV);
	
	var rez = a&&b&&c;
	return rez;
}

function godineAjax(){
	
	var sadrzaj = document.getElementById("glavniSadrzaj");
	var modul = new GodineAjax(sadrzaj);
}
