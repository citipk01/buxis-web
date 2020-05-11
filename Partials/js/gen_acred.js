$(document).ready(function(){

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });
	

	

});


function addingRow(curRow){
		//$( ".bxGridDelLnk" ).hide();
		//$( ".bxGridAddLnk" ).hide();
}

function buscar(){
	var fecha = bxF('FEC_VAL').Value()
	
		var params = [];
		params.push(new BXParameter('FEC_VAL', fecha));
		
		if ($("#anx").is(':checked')){	
			if (bxG("grillaEmp").Rows[0].Controls[0].Value() == ""){
				filas = 0
			}else{
				filas = bxG("grillaEmp").Rows.length
			}
		}else{
			filas = 0
			bxG("grillaEmp").Empty();
		}
		
		

		BXData('CITI.GEN_ACRED.GRID.FILL',params,function(){
		ConfigDataTypes(this.ResultType);
		var resultados = this.Results.length
		if (resultados == 0){	
			//$("#"+ID).val("")
			//$("#"+ID).focus()
			Error("No se encontraron liquidaciones para la fecha ingresada.")
		}else{
		
			for(reg=0;reg<resultados;reg++){
				existe = 0
				for (row = 0;row<bxG("grillaEmp").Rows.length;row++){
					if (this.Results[reg][this.ResultType[0].name] == bxG("grillaEmp").Rows[row].Controls[0].Value()){
						existe = 1
					}
				}
				if (existe == 0){
					if(reg > 0 || filas > 0){
						bxG("grillaEmp").AddRow(null,true);
						//$( ".bxGridDelLnk" ).hide();
						//$( ".bxGridAddLnk" ).hide();
					}
					bxG("grillaEmp").Rows[filas + reg].Controls[0].Value(this.Results[reg][this.ResultType[0].name]);	
					bxG("grillaEmp").Rows[filas + reg].Controls[1].Value(this.Results[reg][this.ResultType[1].name]);	
					bxG("grillaEmp").Rows[filas + reg].Controls[2].Value(this.Results[reg][this.ResultType[2].name]);	
					bxG("grillaEmp").Rows[filas + reg].Controls[3].Value(this.Results[reg][this.ResultType[3].name]);	
					

					//reg_row = reg_row + 1					
				}
				
				

				//$("#"+ID_NOMBRE).val(this.Results[0][this.ResultType[0].name])
			}
			
		}
		});	
		
}

function CambioCampo(campo){

	ID = campo.Id
	
	var CAMPO = $("#"+ID).attr("name")
	
	if (CAMPO == "COD_LQ"){
	
		var LIQUIDACION = $("#"+ID).val()
		
		if (LIQUIDACION == "" || LIQUIDACION === undefined){
			return
		}
		var i = 0
		for (i = 0; i < bxG("grillaEmp").Rows.length - 1; i++) {
			if (bxG("grillaEmp",i,"COD_LQ").Value() == LIQUIDACION && bxG("grillaEmp",i).Status != "D"){
				$("#"+ID).val("")
				$("#"+ID).focus()
				Error("La liquidación "+LIQUIDACION+" ya se encuentra en el listado.");
			}
		}
	
	
		
		
		var params = [];
		params.push(new BXParameter('CODIGO', LIQUIDACION));

		BXData('CITI.COD_LQ_FULL.DESC',params,function(){
		ConfigDataTypes(this.ResultType);
		if (this.Results.length == 0){	
			$("#"+ID).val("")
			$("#"+ID).focus()
			Error("No se encontró la liquidación "+LIQUIDACION+".")
		}else{
			ID_NOMBRE = parseInt(ID) + 1 
			$("#"+ID_NOMBRE).val(this.Results[0][this.ResultType[0].name])
			ID_PROC = parseInt(ID) + 2 
			$("#"+ID_PROC).val(this.Results[0][this.ResultType[1].name])
			ID_COD_EMP = parseInt(ID) + 3 
			$("#"+ID_COD_EMP).val(this.Results[0][this.ResultType[2].name])
			
		}
		});	

	}
}