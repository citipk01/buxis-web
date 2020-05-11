$(document).ready(function(){

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});


function AlGrabar(){
	if (!(bxF('cod_intfc').Value() !=  undefined && bxF('cod_intfc').Value() != null && bxF('cod_intfc').Value() != ''))
	{
		Error("No hay interfaz para desprocesar.");
	}
}