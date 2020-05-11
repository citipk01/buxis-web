
var sel;

$(document).ready(function(){

	$( "#tabs" ).tabs();

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function Validacion(){

}

function CargarControles(){
		
	if (BtnBarStatus == 'ADS'){
		var respons = bxF('respons').Value()
		
		var params = [];
		params.push(new BXParameter('RESPONS', respons));


		BXData('CITI.PAR_RESPONSABLE.KEY',params,function(){
			bxF('respons').Value(this.Results[0].RESPONS);
			bxF('descrip').Value(this.Results[0].DESCRIP);
			bxF('pais').Value(this.Results[0].PAIS);
			bxF('pcia').Value(this.Results[0].PCIA);
			bxF('ciudad').Value(this.Results[0].CIUDAD);
			bxF('direccion').Value(this.Results[0].DIRECCION);
			bxF('cpostal').Value(this.Results[0].CPOSTAL);
			bxF('cod_mf').Value(this.Results[0].COD_MF);
		});	
	}		
	
}