var max_fields = 10;
var wrapper = $(".inputs");
var add_button = $("#adicionarcampo");


var x = 1;
$(add_button).click(function(e) {//Evento acionado ao clicar para adicionar campo
  e.preventDefault();

  if (x < max_fields) {
    x++;
    //Adicionar os campos Produto e quantidade
    $(wrapper).append('<spam><input type="text" class="produto" id="produtoadd" name="produto" placeholder = "Código do Produto"> <input type = "number" class="quantidade" name="quantidade" id="qntdadd"  placeholder = "Quantidade" value = "1" >  <button type="button" id="removebutton" class="remove_field">Remover Campo</button></spam><br>');
  }

});

//Link para remover o campo
$(wrapper).on("click", ".remove_field", function(e) {
  e.preventDefault();
  console.log();
  $(this).parent('spam').remove();
  x--;
});