
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

function Validacion(){
 var NOMBRE = bxF('NOMBRE').Value()
if (NOMBRE == '' || NOMBRE=== undefined){
	//alert('Debe ingresar un nombre.')
	Error('Debe ingresar un nombre.')
	return
}

}

function CargarControles(){
	var NRO_FAM = bxF('NRO_FAM').Value()

		var cod_mf = bxF('cod_mf').Value()
		var params = [];
		params.push(new BXParameter('COD_MF', cod_mf));

	if (NRO_FAM == '' || NRO_FAM === undefined){


		//alert(cod_mf)
		//BXData('CITI.FAMILIARES.CNT',params,function(){
		//			ConfigDataTypes(this.ResultType);
		//			bxF('NRO_FAM').Value(this.Results.length + 1)
		//});
		BXData('CITI.FAMILIARES.LAST_NUM',params,function(){
				if (this.Results.length > 0){
					bxF('NRO_FAM').Value(this.Results[0]["LAST_NUM"])
				}
		});
	}

		//alert(cod_mf)
		BXData('CITI.FAMILIARES_SIRADIG.CHK',params,function(){
					ConfigDataTypes(this.ResultType);
					if (this.Results.length == 0){
						bxF('PARENTESCO').Enable(true)
						bxF('FECHAVENC').Enable(true)
						bxF('ACTUA_4TA').Enable(true)
						bxF('FECALTA_GAN').Enable(true)
						bxF('CUIL').Enable(true)
						bxF('DISCAP').Enable(true)
						 $('#SIRADIG').hide();
						 if (bxF('ACTUA_4TA').Value() == "1"){
							bxF('FECHAVENC').Enable(true);
							bxF('FECALTA_GAN').Enable(true);
						 }else{
							bxF('FECHAVENC').Enable(false);
							bxF('FECALTA_GAN').Enable(false);
						 }
						//$("PARENTESCO").prop('disabled', true);
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
						bxF('FECHAVENC').Enable(false)
						bxF('ACTUA_4TA').Enable(false)
						bxF('FECALTA_GAN').Enable(false)
						if (bxF('ACTUA_4TA').Value() == "1")
						{
							bxF('PARENTESCO').Enable(false)
							bxF('CUIL').Enable(false)
							bxF('DISCAP').Enable(false)
						}
						else
						{
							bxF('PARENTESCO').Enable(true)
							bxF('CUIL').Enable(true)
							bxF('DISCAP').Enable(true)
						}
					}

		});

}


function CalculaFechasGanancias(){

	if (bxF('ACTUA_4TA').Value() == "1"){
		if (bxF('FECNAC_FAM').Value() != ""){
			bxF('FECHAVENC').Enable(true);
			bxF('FECALTA_GAN').Enable(true);
			//var a = new Date()
			//bxF('FECALTA_GAN').Value(FormatDateToStr(a));
			bxF('FECALTA_GAN').Value(bxF('FECNAC_FAM').Value());
			bxF('FECHAVENC').Value('');
			switch (bxF('PARENTESCO').Value())
			{
				case 'D':
				case 'S':
				case 'ND':
				case 'NS':
				case 'NE':
				case 'NI':
				case 'GC':
				case 'T':
				case 'B':
				case 'SI':
					//bxF('FECALTA_GAN').Value(bxF('FECNAC_FAM').Value());
					if (bxF('DISCAP').Value() != 'Y'){
						var nac = GetDateFromStr(bxF('FECNAC_FAM').Value());
						var fin = new Date(nac.getFullYear() + 24,nac.getMonth(),nac.getDate(),0,0,0);
						//fin = AddDaysToDate(fin, -1);
						bxF('FECHAVENC').Value(FormatDateToStr(fin));
					}
					break;
			}
		}
	}else{
		bxF('FECHAVENC').Enable(false);
		bxF('FECALTA_GAN').Enable(false);
	}
}
