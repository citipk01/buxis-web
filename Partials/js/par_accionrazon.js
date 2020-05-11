
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
/* var NOMBRE = bxF('NOMBRE').Value()
if (NOMBRE == '' || NOMBRE=== undefined){
	//alert('Debe ingresar un nombre.')
	Error('Debe ingresar un nombre.')
	return
}*/

}

function CargarControles(){
	if (BtnBarStatus == 'ADS'){
		var ACCION = bxF('accion').Value()
		var ACCION_RAZON = bxF('accion_razon').Value()
		
				var params = [];
		params.push(new BXParameter('ACCION', ACCION));
		params.push(new BXParameter('ACCION_RAZON', ACCION_RAZON));


		BXData('CITI.PAR_ACCION_RAZON.KEY',params,function(){
		ConfigDataTypes(this.ResultType);
		if (this.Results.length == 0){	
			$("#3").focus()
		}else{
			 
			//$("#4").val(this.Results[0][this.ResultType[2].name])
			//$("#5").val(this.Results[0][this.ResultType[3].name])
			
		}
		});	
	}		
	
}