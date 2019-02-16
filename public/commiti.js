var tabela = "";

function kreiraj(){
	var div = document.getElementById("tabela");
	var broj = document.getElementById("brojZadataka");
	tabela = new CommitTabela(div,parseInt(broj.value));
}

function dodaj(){
	var broj = document.getElementById("brojZadatkaD");
	var url = document.getElementById("noviUrlD");
	tabela.dodajCommit(parseInt(broj.value), url.value);
	
}

function edituj(){
	var broj = document.getElementById("brojZadatkaE");
	var brojC = document.getElementById("brojCommitaE");
	var url = document.getElementById("noviUrlE");
	tabela.editujCommit(parseInt(broj.value),parseInt(brojC.value),url.value);
}

function obrisi(){
	var brojZ = document.getElementById("brojZadatkaB");
	var brojC = document.getElementById("brojCommitaB");
	tabela.obrisiCommit(parseInt(brojZ.value),parseInt(brojC.value));
}