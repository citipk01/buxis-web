var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

var i = 0
for (i = 0; i < bxG("grillaEmp").Rows.length; i++) {
	//if (bxG("grillaEmp",i,"COD_MF").Value() == "" && bxG("grillaEmp",i).Status != "D"){
		if (bxG("grillaEmp",i,"COD_MF").Value() == "" && bxG("grillaEmp",i).Status != "D" && bxG("grillaEmp",i).Status != "N" && bxG("grillaEmp",i).Status != "E"){
		$("#"+bxG("grillaEmp",i,"COD_MF").Id).focus()
		Error("Debe ingresar el legajo.");
	}
}
}

function CargarControles(){
		var CAMPO = parseInt(bxG("grillaEmp",0,"COD_MF").GridRow.Controls[0].Id)
		$('#'+CAMPO).prop('disabled', false).focus();


}
function addingRow(curRow){

	ID_LEGAJO = parseInt(curRow.Id) + 1

	var LEGAJO = $('#'+ID_LEGAJO).val()

	if ( LEGAJO != ""){
		$('#'+ID_LEGAJO).prop('disabled', true);
	}else{
		$('#'+ID_LEGAJO).prop('disabled', false).focus();
	}

	if (LEGAJO === undefined){
		$('#3').prop('disabled', true);
	}
}
function CambioCampo(campo){

	ID = campo.Id

	var CAMPO = $("#"+ID).attr("name")

	if (CAMPO == "COD_MF"){

		var LEGAJO = $("#"+ID).val()

		if (LEGAJO == "" || LEGAJO === undefined){
			return
		}
		var i = 0
		for (i = 0; i < bxG("grillaEmp").Rows.length - 1; i++) {
			if (bxG("grillaEmp",i,"COD_MF").Value() == LEGAJO && bxG("grillaEmp",i).Status != "D"){
				$("#"+ID).val("")
				$("#"+ID).focus()
				Error("El legajo "+LEGAJO+" ya se encuentra en el listado.");
			}
		}




		var params = [];
		params.push(new BXParameter('CODIGO', LEGAJO));


		BXData('CITI.NOM_MF.DESC',params,function(){
		ConfigDataTypes(this.ResultType);
		if (this.Results.length == 0){
			$("#"+ID).val("")
			$("#"+ID).focus()
			Error("No se encontró al empleado "+LEGAJO+".")
		}else{
			ID_NOMBRE = parseInt(ID) + 1
			$("#"+ID_NOMBRE).val(this.Results[0][this.ResultType[0].name])

		}
		});

	}

	if (CAMPO == "ACU_FALT" || CAMPO == "ACU_RESV"){
		var ACU_FALTA = 0
		var ACU_RESV = 0
		var ID_SALDO = 0
		var ID_RESV = 0
		var ID_FALTA = 0
			if (CAMPO == "ACU_FALT"){
				ACU_FALTA = $("#"+ID).val()
				ID_RESV = parseInt(ID) + 1
				ACU_RESV =  $("#"+ID_RESV).val()
				ID_SALDO = parseInt(ID) + 2
			}else{
				ID_FALTA = parseInt(ID) - 1
				ACU_FALTA = $("#"+ID_FALTA).val()
				ACU_RESV =  $("#"+ID).val()
				ID_SALDO = parseInt(ID) + 1
			}
			if (ACU_FALTA == "" || ACU_FALTA === undefined){ACU_FALTA = 0}
			if (ACU_RESV == "" || ACU_RESV === undefined){ACU_RESV = 0}

			$("#"+ID_SALDO).val(ACU_FALTA - ACU_RESV)
	}

}




/* EGV - estaba en listas de conceptos, pero el html apuntaba al js de fallas de caja,
se trajo el codigo de fallas de caja aquí y se agregó la funcionalidad del botón de eliminar grilla

var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

}

function CargarControles(){
		var CAMPO = parseInt(bxG("grillaEmp",0,"COD_MF").GridRow.Controls[0].Id)

		$('#'+CAMPO).prop('disabled', false).focus();
}

function addingRow(curRow){

	ID_LEGAJO = parseInt(curRow.Id) + 1

	var LEGAJO = $('#'+ID_LEGAJO).val()

	if ( LEGAJO != ""){
		$('#'+ID_LEGAJO).prop('disabled', true);
	}else{
		$('#'+ID_LEGAJO).prop('disabled', false).focus();
	}

	if (LEGAJO === undefined){
		$('#4').prop('disabled', true);
	}
}
function CambioCampo(campo){

	ID = campo.Id

	var CAMPO = $("#"+ID).attr("name")

	if (CAMPO == "COD_MF"){

		var LEGAJO = $("#"+ID).val()

		if (LEGAJO == "" || LEGAJO === undefined){
			return
		}
		var i = 0
		for (i = 0; i < bxG("grillaEmp").Rows.length - 1; i++) {
			if (bxG("grillaEmp",i,"COD_MF").Value() == LEGAJO && bxG("grillaEmp",i).Status != "D"){
				$("#"+ID).val("")
				$("#"+ID).focus()
				Error("El legajo "+LEGAJO+" ya se encuentra en el listado.");
			}
		}




		var params = [];
		params.push(new BXParameter('CODIGO', LEGAJO));

		BXData('CITI.NOM_MF.DESC',params,function(){
		ConfigDataTypes(this.ResultType);
		if (this.Results.length == 0){
			$("#"+ID).val("")
			$("#"+ID).focus()
			Error("No se encontró al empleado "+LEGAJO+".")
		}else{
			ID_NOMBRE = parseInt(ID) + 1
			$("#"+ID_NOMBRE).val(this.Results[0][this.ResultType[0].name])

		}
		});

	}
}
*/
