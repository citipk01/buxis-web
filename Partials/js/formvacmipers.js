
$(document).ready(function(){

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function SelectMiFormVac2(){

	/*var periodo_fecha;
	var hoy;
	
	hoy = new Date();
	
	periodo_fecha = GetDateFromStr(bxF('periodo').Value());

	bxF('licencia_anual').Value(periodo_fecha.getFullYear().toString() + ' / ' + (periodo_fecha.getFullYear() + 1).toString());
	
	bxF('fecha_hoy').Value(FormatDateToStr(hoy));*/

	FormSearch();
}


