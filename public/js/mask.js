

// impede entrar outro caractere que não seja número
function M_number(e){
  var N = e.value;

  if(isNaN(N[N.length-1])){ 
      e.value = N.substring(0, N.length-1);
      return;
   }
}

//Cliente
function M_cpf(e){
   
   var v = e.value;
   
   M_number(e);
   
   e.setAttribute("maxlength", "14");
   if (v.length == 3 || v.length == 7) e.value += ".";
   if (v.length == 11) e.value += "-";

}

function M_chassi(e){
   
  var v = e.value;
  
  e.setAttribute("maxlength", "17");

}

function M_datanas(e){
   
  var dat = e.value;
  
  M_number(e);
  
  e.setAttribute("maxlength", "10");
  if (dat.length == 2 || dat.length == 5) e.value += "/";


}

function M_hora(e){
   
  var hora = e.value;
  
  M_number(e);
  e.setAttribute("maxlength", "11");
  if (hora.length == 2 || hora.length == 8) e.value += ":";
  if (hora.length == 5) e.value += "/";


}

function M_rg(e){
	var rg = e.value;

	M_number(e);

    e.setAttribute("maxlength", "7");
}

function M_tel(e){
	var T = e.value;

	M_number(e);

   	e.setAttribute("maxlength", "14");
    if (T.length == 1) e.value = "("+e.value;
    if (T.length == 3) e.value += ")";
    if (T.length == 9) e.value += "-";
}

function M_cnpj(e){
	var T = e.value;

	M_number(e);

  e.setAttribute("maxlength", "18");
  if (T.length == 2) e.value += ".";
  if (T.length == 6) e.value += ".";
  if (T.length == 10) e.value += "/";
  if (T.length == 15) e.value += "-";
}

//Veículo

function M_placa(e){
  var placa = e.value;

  e.setAttribute("maxlength", "8");
    U = e.value.toUpperCase();
    if(placa.length <= 3)e.value = U;
    if(placa.length == 3)e.value += "-";
    if(placa.length > 3 && isNaN(placa[placa.length-1])){
      e.value = placa.substring(0, placa.length-1);
      return;
    }

}

function M_size(e, size){
  var T = e.value;

  e.setAttribute("maxlength", "70");
}

function M_sizebig(e, size){
  var T = e.value;
 
  e.setAttribute("maxlength", "200");
}

function M_size_number(e, size){
  var T = e.value;
  M_number(e);
  e.setAttribute("maxlength", size);
}
