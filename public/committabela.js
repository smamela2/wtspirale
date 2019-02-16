var CommitTabela=(function(){    
//lokalne variable idu ovdje    

	var brojCommita=[0];
	var zaDodati=[0];
	var maxBrojKolona=1;
	
	
	
	var konstruktor=function(divElement,brojZadataka){  
	
	divElement.innerHTML="";
	var tabela = document.createElement('TABLE');
	divElement.appendChild(tabela);
	var tr=document.createElement('tr');
	tabela.appendChild(tr);
	var th=document.createElement('th');
	tr.appendChild(th);
	th.innerHTML='Naziv zadatka';
	var th=document.createElement('th');
	tr.appendChild(th);
	th.innerHTML='Commiti';
	th.colSpan=1;
	
	for(var i=0; i<brojZadataka;i++){
		var tr=document.createElement('tr');
		tabela.appendChild(tr);
		brojCommita.push(0);
		zaDodati.push(1);
		var td=document.createElement('td');
		tr.appendChild(td);
		var a1=document.createElement('a');
		a1.innerHTML='Zadatak '+(i+1);
		a1.href='#';
		td.appendChild(a1);
		
		var td=document.createElement('td');
		td.colSpan=1;
		tr.appendChild(td);
		
	}
	
	
	
	return{        
		dodajCommit:function(rbZadatka,url){
			var redovi=document.getElementsByTagName('tr');
			var a = document.createElement('a');
			a.innerHTML=zaDodati[rbZadatka+1];
			a.href=url;
			var red = redovi[rbZadatka+1];
			
			if(maxBrojKolona==brojCommita[rbZadatka+1]){
				var nova = red.insertCell();
				maxBrojKolona=maxBrojKolona+1;
				nova.appendChild(a);
				brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]+1;
				zaDodati[rbZadatka+1]=zaDodati[rbZadatka+1]+1;
				for(var i = 0 ; i <= brojZadataka ; i++){
					if(i==0){
						redovi[i].cells[1].colSpan=redovi[i].cells[1].colSpan+1;
					}
					else if(i!=rbZadatka+1){
						if(brojCommita[i]==maxBrojKolona-1){
							var x = redovi[i].insertCell();
						}
						else{
						redovi[i].cells[brojCommita[i]+1].colSpan=redovi[i].cells[brojCommita[i]+1].colSpan+1;
						}
					}
					
				}
				
			}
			else if(maxBrojKolona==brojCommita[rbZadatka+1]+1){
				red.cells[brojCommita[rbZadatka+1]+1].appendChild(a);
				brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]+1;
				zaDodati[rbZadatka+1]=zaDodati[rbZadatka+1]+1;
			}
			else{
				
				var trenutni = red.cells[brojCommita[rbZadatka+1]+1].colSpan;
				red.deleteCell(brojCommita[rbZadatka+1]+1);
				var x= red.insertCell();
				x.appendChild(a);
				var x2 = red.insertCell();
				x2.colSpan=trenutni-1;
				brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]+1;
				zaDodati[rbZadatka+1]=zaDodati[rbZadatka+1]+1;
			}
			
			
			
		},     
        editujCommit:function(rbZadatka,rbCommita,url){
			
			if(rbZadatka>=brojZadataka || rbCommita>=brojCommita[rbZadatka+1] || rbZadatka<0 || rbCommita<0){
				return -1;
			}
			var celija=tabela.rows[rbZadatka+1].cells[rbCommita+1];
			var a=celija.childNodes[0];
			a.href=url;	
			
		},      
		obrisiCommit:function(rbZadatka,rbCommita){
			
			console.log(maxBrojKolona);
			console.log(rbCommita);
			
			if(rbZadatka>=brojZadataka || rbCommita>=brojCommita[rbZadatka+1] || rbZadatka<0 || rbCommita<0){
				return -1;
			}
			
			var brojMaksimalnih = 0;
			for(var i = 1 ; i<brojCommita.length ; i++){
				if(brojCommita[i]==maxBrojKolona){
					brojMaksimalnih=brojMaksimalnih+1;
				}
			}
			
			var redovi=document.getElementsByTagName('tr');
			var red = redovi[rbZadatka+1];
			if(brojCommita[rbZadatka+1]==maxBrojKolona){
				if(brojMaksimalnih==1){
				
					red.deleteCell(rbCommita+1);
					if(brojCommita[rbZadatka+1]==1){
						red.insertCell();
					}
					brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]-1;
					for(var i = 0 ; i <= brojZadataka ; i++){
					if(i==0){
						redovi[i].cells[1].colSpan=redovi[i].cells[1].colSpan-1;
					}
					else if(i!=rbZadatka+1){
						if(brojCommita[i]==maxBrojKolona-1 && brojCommita[i]!=0){
							redovi[i].deleteCell(brojCommita[i]+1);
						}
						else{
							
						redovi[i].cells[brojCommita[i]+1].colSpan=redovi[i].cells[brojCommita[i]+1].colSpan-1;}
						
					}
					
					}
				maxBrojKolona=maxBrojKolona-1;
				}
				else{ 
					red.deleteCell(rbCommita+1);
					brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]-1;
					red.insertCell();
				}

			}
			else{
				red.deleteCell(rbCommita+1);
				brojCommita[rbZadatka+1]=brojCommita[rbZadatka+1]-1;
				red.cells[brojCommita[rbZadatka+1]+1].colSpan=red.cells[brojCommita[rbZadatka+1]+1].colSpan+1;
			}
			
		if(maxBrojKolona==0){
			maxBrojKolona=1;
		}
	} 
	
	} 
	}	
	return konstruktor;
}());