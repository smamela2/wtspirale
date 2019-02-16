var Validacija=(function(){
	var bIme = true;
	var bNaziv = true;
	var bIndex = true;
	var bGodine = true;
	var bPassword = true;
	var bRepozitorij = true;
	var bUrl = true;
	var div;

    var konstruktor=function(divElementPoruke){
		div=divElementPoruke;
		
        return{
			
			provjeriValidnost:function(){
				
				var tekst="Sljedeća polja nisu validna: ";
				if(!bIme) tekst=tekst+"ime, ";
				if(!bUrl) tekst=tekst+"url, ";
				if(!bNaziv) tekst=tekst+"naziv, ";
				if(!bIndex) tekst=tekst+"index, ";
				if(!bGodine) tekst=tekst+"godina, ";
				if(!bRepozitorij) tekst=tekst+"repozitorij, ";
				if(!bPassword) tekst=tekst+"password, ";
				
				if(tekst=="Sljedeća polja nisu validna: ")tekst="";
				else{
					tekst=tekst.substring(0,tekst.length-2);
					tekst=tekst+"!";
				}
				
				div.innerHTML=tekst;
			},
			
			ime:function(inputElement){
				var regex = /^('?[A-Z]'?([a-z]'?)+)((-|\s)'?[A-Z]'?([a-z]'?)+){0,3}$/;
				var b =  regex.test(inputElement.value);
				if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bIme=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bIme=true;
				}
				this.provjeriValidnost();
				return bIme;
			},
			godina:function(inputElement){
				var godina = inputElement.value;
				var b = true;
				
				var regex = /20\d{2}\/20\d{2}/;
				if(godina.match(regex) && (parseInt(godina.substring(0,4)) + 1 == parseInt(godina.substring(5, 9)))){
					b=true;
				}
				else{
					b=false;
				}
				
			if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bGodine=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bGodine=true;
				}
				this.provjeriValidnost();
				return bGodine;
				
			},
			repozitorij:function(inputElement,regex){
				var b = regex.test(inputElement.value);
				if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bRepozitorij=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bRepozitorij=true;
				}
				this.provjeriValidnost();
				return bRepozitorij;
			},
			index:function(inputElement){
				var regex=/(1[4-9]|(20)){1}[0-9]{3}$/;
				var b =  regex.test(inputElement.value);
				if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bIndex=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bIndex=true;
				}
				this.provjeriValidnost();
				return bIndex;
			},
			naziv:function(inputElement){
				var regex= /^[A-Za-z][A-Za-z0-9\/\"\-\'\?\!\\]+[a-z0-9]$/;
				var b = regex.test(inputElement.value);
				if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bNaziv=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bNaziv=true;
				}
				this.provjeriValidnost();
				return bNaziv;
			},
			password:function(inputElement){
				var sifra = inputElement.value;
				var regex = /[A-Za-z0-9]{8,}$/;
				var pas = regex.test(sifra);
				var brV=0,brM=0,brB=0;
				if(sifra.length<8) pas=false;
				else{
				for(var i=0;i<sifra.length;i++){
					if(sifra[i]>='a' && sifra[i]<='z'){
						brM=brM+1;
					}
					if(sifra[i]>='A' && sifra[i]<='Z'){
						brV=brV+1;
					}
					if(sifra[i]>='0' && sifra[i]<='9'){
						brB=brB+1;
					}
				}
				
				if((brM>0 && brV>0) || (brV>0&&brB>0) || (brM>0&&brB>0)){
					pas = true;
				}
				else{pas=false;}}
				if(pas==false){
					inputElement.style.backgroundColor = "orangered";
					bPassword=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bPassword=true;
				}
				return bPassword;
				
			},
			url:function(inputElement){
				var regex=/^((https)|(http)|(ssh)|(ftp)){1}:\/\/[a-z0-9]+([a-z0-9\-][a-z0-9])*)\/[a-z0-9]+([a-z0-9\-][a-z0-9])*(\?[a-z0-9]+([a-z0-9\-][a-z0-9])*=[a-z0-9]+([a-z0-9\-][a-z0-9])* (&[a-z0-9]+([a-z0-9\-][a-z0-9])*=[a-z0-9]+([a-z0-9\-][a-z0-9])*)*){0,1} /;
				var b = regex.test(inputElement.value);
				if(b==false){
					inputElement.style.backgroundColor = "orangered";
					bUrl=false;
				}
				else {
					inputElement.style.backgroundColor = "";
					bUrl=true;
				}
				return bUrl;
			}
			
			}
	}
		
		return konstruktor;
	}());