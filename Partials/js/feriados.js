
$(document).ready(function(){

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function onSelYear(){

if (bxF('Anio').Value() != null) {

			bxF('Feriados').Value(bxF('Anio').Value());
			bxF('Anios').Enable(false);

	}

}



function onSelFer(){





}
function OnSaveFer(){
 //var fecant=curRow.OldValue;
//BXData('CITI.DIAS_FEST.UPD', [new BXParameter(fila.ControlByName('fecha').Value(),fecant)], function(){
//	});
	//BXData('CITI.GET.REGION', [new BXParameter('COD_EMP',bxF('cod_emp').Value())], function()
}


function onAddNewDate(curRow){

	//var b = GetDateFromStr(curRow.ControlByName('feriado').Value())
	var b =  GetDateFromStr(curRow.Value());
	if (b!=null){
	if (b.getFullYear() != bxF('Anio').Value()){
		curRow.Value(null) ;
		Error("No es posible agregar un feriado de un año diferente al seleccionado");
	}
	}

}



