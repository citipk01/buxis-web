var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

}

function CargarControles(){
		var CAMPO1 = parseInt(bxG("grillaEmp",0,"COD_EMP").GridRow.Controls[0].Id)
		var CAMPO2 = parseInt(bxG("grillaEmp",0,"banking").GridRow.Controls[2].Id)
		var CAMPO3 = parseInt(bxG("grillaEmp",0,"cat_cont").GridRow.Controls[4].Id)
		var CAMPO4 = parseInt(bxG("grillaEmp",0,"debt_cred").GridRow.Controls[6].Id)
		var CAMPO5 = parseInt(bxG("grillaEmp",0,"COD_SUC").GridRow.Controls[8].Id)

		$('#'+CAMPO1).prop('disabled', false).focus();
		$('#'+CAMPO2).prop('disabled', false).focus();
		$('#'+CAMPO3).prop('disabled', false).focus();
		$('#'+CAMPO4).prop('disabled', false).focus();
		$('#'+CAMPO5).prop('disabled', false).focus();
}

function addingRow(curRow){
	
	ID1 = parseInt(curRow.Controls[0].Id) 
	ID2 = parseInt(curRow.Controls[2].Id) 
	ID3 = parseInt(curRow.Controls[4].Id) 
	ID4 = parseInt(curRow.Controls[6].Id) 
	ID5 = parseInt(curRow.Controls[8].Id) 
			
	var COD_EMP = $('#'+ID1).val() 

	if ( COD_EMP != ""){	
		$('#'+ID1).prop('disabled', true);
		$('#'+ID2).prop('disabled', true);
		$('#'+ID3).prop('disabled', true);
		$('#'+ID4).prop('disabled', true);
		$('#'+ID5).prop('disabled', true);
	}else{
		$('#'+ID1).prop('disabled', false).focus();
		$('#'+ID2).prop('disabled', false);
		$('#'+ID3).prop('disabled', false);
		$('#'+ID4).prop('disabled', false);
		$('#'+ID5).prop('disabled', false);
	}
	
	if (COD_EMP === undefined){
		$('#4').prop('disabled', true);
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