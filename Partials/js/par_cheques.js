var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

}

function CargarControles(){

		var CAMPO1 = parseInt(bxG("grillaEmp",0,"CUENTA").GridRow.Controls[0].Id)
		var CAMPO2 = parseInt(bxG("grillaEmp",0,"COD_MV").GridRow.Controls[2].Id)

		$('#'+CAMPO1).prop('disabled', false).focus();
		$('#'+CAMPO2).prop('disabled', false)

}

function addingRow(curRow){

	ID1 = parseInt(curRow.Controls[0].Id) 
	ID2 = parseInt(curRow.Controls[2].Id) 
			
	var CUENTA = $('#'+ID1).val() 

	if ( CUENTA != ""){	
		$('#'+ID1).prop('disabled', true);
		$('#'+ID2).prop('disabled', true);
	}else{
		$('#'+ID1).prop('disabled', false).focus();
		$('#'+ID2).prop('disabled', false);
	}
	
	if (CUENTA === undefined){
		$('#6').prop('disabled', true);
	}

}
function CambioCampo(campo){

/*	ID = campo.Id
	
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

	}*/
}