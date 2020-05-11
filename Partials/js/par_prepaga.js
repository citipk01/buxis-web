var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

}

function CargarControles(){
		var CAMPO1 = parseInt(bxG("grillaEmp",0,"CBHR_PLANPRPAGA").GridRow.Controls[0].Id)

		$('#'+CAMPO1).prop('disabled', false).focus();

}

function addingRow(curRow){

	ID1 = parseInt(curRow.Controls[0].Id) 

			
	var CBHR_PLANPRPAGA = $('#'+ID1).val() 

	if ( CBHR_PLANPRPAGA != ""){	
		$('#'+ID1).prop('disabled', true);
	}else{
		$('#'+ID1).prop('disabled', false).focus();
	}
	
	if (CBHR_PLANPRPAGA === undefined){
		$('#7').prop('disabled', true);
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