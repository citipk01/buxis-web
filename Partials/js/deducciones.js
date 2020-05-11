
var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();
	//$(".bxBtn").button();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });
	//alert('oldvalue ' + bxF('NRO_FAM').OldValue);
	//alert('value ' + bxF('NRO_FAM').Value());
	//alert($('NRO_FAM').val());
	/*var availableTags = [
		{label:"123 - Administracion",value:"123"},
		{label:"456 - Contabilidad",value:"456"},
		{label:"112 - Personal",value:"112"},
		{label:"566 - Sistemas",value:"566"}
	];
	$( "#cencos_mf" ).autocomplete({
		source: availableTags
	});*/

	//$('#periodo').spinner();

	//SearchDisplay('CITI.VAC_SOL.SEL.INI');


});

function deletingRow(curRow){

	var COD_LQ = curRow.Controls[7].Value()
	if ( COD_LQ > 0 /*|| SIRADIG == 0*/) {
		Error('Deducción calculada en liquidación no es posible eliminar la fila.')
	}

	var SIRADIG = bxG("grillaEmp",0,"SIRADIG").Value()
	if ( SIRADIG > 0) {
		Error('El legajo informa F572 Siradig, no es posible eliminar el registro. ')
	}


}

function addingRow(curRow){
/*	var cod_mf = bxF('COD_MF').Value()
	var params = [];
	params.push(new BXParameter('COD_MF', cod_mf));

	var SIRADIG = 1

	BXData('CITI.FAMILIARES_SIRADIG.CHK',params,function(){
						ConfigDataTypes(this.ResultType);
						if (this.Results.length == 0){
							SIRADIG = 0
						}

	});		*/

	var SIRADIG = bxG("grillaEmp",0,"SIRADIG").Value()
	if ( SIRADIG > 0 && curRow.Status == "N") {
		Error('El legajo informa F572 Siradig, no es posible agregar un registro.')
		return
	}

	var COD_LQ = curRow.Controls[7].Value()

	if (SIRADIG > 0){
		$( ".bxGridDelLnk" ).hide();
		$( ".bxGridAddLnk" ).hide();
	}else{
		$( ".bxGridDelLnk" ).show();
		$( ".bxGridAddLnk" ).show();
	}

	if ( COD_LQ > 0 ||  SIRADIG > 0) {
		$('#'+curRow.Controls[0].Id).prop('disabled', true);
		$('#'+curRow.Controls[1].Id).prop('disabled', true);
		$('#'+curRow.Controls[3].Id).prop('disabled', true);
		$('#'+curRow.Controls[4].Id).prop('disabled', true);
		$('#'+curRow.Controls[5].Id).prop('disabled', true);
	}else{
		$('#'+curRow.Controls[0].Id).prop('disabled', false);
		$('#'+curRow.Controls[1].Id).prop('disabled', false);
		$('#'+curRow.Controls[3].Id).prop('disabled', false);
		$('#'+curRow.Controls[4].Id).prop('disabled', false);
		$('#'+curRow.Controls[5].Id).prop('disabled', false);
	}

	if (COD_LQ === undefined || COD_LQ == ""){
		//$('#3').prop('disabled', true);
		curRow.Controls[7].Value(0)
	}
}

function Validacion(){
var i = 0
for (i = 0; i < bxG("grillaEmp").Rows.length; i++) {
	if (bxG("grillaEmp",i,"ANIOMES_ESP").Value() == "" && bxG("grillaEmp",i).Status != "D"){
		$("#"+bxG("grillaEmp",i,"ANIOMES_ESP").Id).focus()
		Error("Debe ingresar la fecha.");
	}
	if (bxG("grillaEmp",i,"TREG_ESP").Value() == "" && bxG("grillaEmp",i).Status != "D"){
		$("#"+bxG("grillaEmp",i,"TREG_ESP").Id).focus()
		Error("Debe ingresar el concepto.");
	}
	if (bxG("grillaEmp",i,"MONTO_ESP").Value() == "" && bxG("grillaEmp",i).Status != "D"){
		$("#"+bxG("grillaEmp",i,"MONTO_ESP").Id).focus()
		Error("Debe ingresar el monto.");
	}
}

}

function CargarControles(){

	var ANIO = bxF('ANIO').Value()
	if (BtnBarStatus == 'ADS'){
			$("#ANIO").val(new Date().getFullYear())
			$("#ANIO").focus()
			$("#ANIO").prop('disabled', false);
	}else{
		$('#ANIO').prop('disabled', true);
	}
		var cod_mf = bxF('COD_MF').Value()
		var params = [];
		params.push(new BXParameter('COD_MF', cod_mf));

	if (ANIO == '' || ANIO=== undefined){


		//alert(cod_mf)
		BXData('CITI.DEDUCCIONES.CNT',params,function(){
					ConfigDataTypes(this.ResultType);
					if (this.Results.length == 0 || BtnBarStatus == 'ADS'){
							bxF('ANIO').Value(new Date().getFullYear())
							var CAMPO_COD_LQ = parseInt(bxG("grillaEmp",0,"COD_LQ").Id)
							$('#'+CAMPO_COD_LQ).val(0)
							var CAMPO_ANIOMES_ESP = parseInt(bxG("grillaEmp",0,"ANIOMES_ESP").Id)
							var CAMPO_TREG_ESP = parseInt(bxG("grillaEmp",0,"TREG_ESP").Id)
							var CAMPO_TDES_ESP = parseInt(bxG("grillaEmp",0,"TDES_ESP").Id)
							var CAMPO_MONTO_ESP = parseInt(bxG("grillaEmp",0,"MONTO_ESP").Id)
							var CAMPO_OBSERVACION = parseInt(bxG("grillaEmp",0,"OBSERVACION").Id)

							$('#'+CAMPO_ANIOMES_ESP).prop('disabled', false);
							$('#'+CAMPO_TREG_ESP).prop('disabled', false);
							$('#'+CAMPO_TDES_ESP).prop('disabled', false);
							$('#'+CAMPO_MONTO_ESP).prop('disabled', false);
							$('#'+CAMPO_OBSERVACION).prop('disabled', false);
					}

		});
	}

		//alert(cod_mf)
		BXData('CITI.FAMILIARES_SIRADIG.CHK',params,function(){
					ConfigDataTypes(this.ResultType);
					if (this.Results.length == 0){
						/*bxF('PARENTESCO').Enable(true)
						bxF('FECHAVENC').Enable(true)
						bxF('ACTUA_4TA').Enable(true)
						bxF('FECALTA_GAN').Enable(true)
						bxF('CUIL').Enable(true)
						bxF('DISCAP').Enable(true)*/
						 $('#SIRADIG').hide();
						///$("PARENTESCO").prop('disabled', true);
						//$("FECHAVENC").prop('disabled', true);
						//$("ACTUA_4TA").prop('disabled', true);
						//$("FECALTA_GAN").prop('disabled', true);
						//$("#CUIL").prop('disabled', true);
						//$("DISCAP").prop('disabled', true);
					}else{
						//$("PARENTESCO").prop('disabled', false);
						//$("FECHAVENC").prop('disabled', false);
						//$("ACTUA_4TA").prop('disabled', false);
						//$("FECALTA_GAN").prop('disabled', false);
						//$("#CUIL").prop('disabled', false);
						//$("DISCAP").prop('disabled', false);
						$('#SIRADIG').show();
						/*bxF('PARENTESCO').Enable(false)
						bxF('FECHAVENC').Enable(false)
						bxF('ACTUA_4TA').Enable(false)
						bxF('FECALTA_GAN').Enable(false)
						bxF('CUIL').Enable(false)
						bxF('DISCAP').Enable(false)			*/
					}

		});

}

function CambioCampo(campo){

	ID = campo.Id

	var CAMPO = $("#"+ID).attr("name")
	var ANIO = bxF('ANIO').Value()

	if (CAMPO == "ANIOMES_ESP"){

		var ANIOMES = $("#"+ID).val()

		if (ANIOMES == "" || ANIOMES === undefined){
			return
		}

		if (ANIOMES.substring(0, 2) != "01"){
			$("#"+ID).val("01" + ANIOMES.substring(2))
			//$("#"+ID).focus()
			//Error("La fecha debe ser el primer día del mes.");
			//return

		}

		if (ANIOMES.substring(6, 10) != ANIO){
				$("#"+ID).val("")
				$("#"+ID).focus()
				Error("La fecha debe ser del año: "+ANIO+".");
				return
		}






		/*var params = [];
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
		});	*/

	}
}
