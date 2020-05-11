$(document).ready(function(){

	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });

});

function OnSelMonProc(){
	bxG('grillaProc').EnableAdd(false);
	bxG('grillaProc').EnableDel(false);
}

function BuscarMonitor(){
	var srvParams = [];
	srvParams.push(new BXParameter('QR_USR_EJEC', bxF('qr_usr_ejec').ToService()));
	srvParams.push(new BXParameter('QR_PROCESO', bxF('qr_proceso').ToService()));

	BXData('CITI.MON_PROC.SEARCH',srvParams,function(grid){
			grid.FillWithResults(this);
			grid.EnableAdd(false);
			grid.EnableDel(false);
		},bxG('grillaProc'));
}

function AlAgregarFila(fila){
	for(col=0;col<fila.Controls.length;col++){
		fila.Controls[col].Enable(false);
	}
}

function VerDetalle(fila){
	if ($('#monDetails').length == 0){
		htmlDiag = '<div id="monDetails" title="Detalles" class="searchDialog"></div>';
		bxF().Tag().append(htmlDiag);

		$("#monDetails").dialog({
			autoOpen: false,
			modal: true,
			close : function (event,ui){
					$('#monDetails').html('');
				}
		});
 	}
	$( "#monDetails" ).dialog( "option", "width", 800 );
	if (fila.ControlByName('estado').Value() == 'Pendiente' || fila.ControlByName('estado').Value() == 'Iniciado' || fila.ControlByName('estado').Value() == 'Ejecutando'){
		$( "#monDetails" ).dialog( "option", "buttons",
			[
				{
					text: "Ok",
					click: function() {
						$( this ).dialog( "close" );
					}
				},
				{
					text: "Cancelar Ejecución",
					click: function() {
						CancelarPeticion($('span#idProc').text());
						$( this ).dialog( "close" );
					}
				}
			] );
	}else{
		$( "#monDetails" ).dialog( "option", "buttons",
			[
				{
					text: "Ok",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			] );
	}

	var h = '<div>';
	h += '<p>Id Ejecución: <span id="idProc">' + fila.ControlByName('id_proc').Value() + '</span></p>';
	h += '<p>Proceso: ' + fila.ControlByName('proceso').Value() + '</p>';
	h += '<p>Estado: ' + fila.ControlByName('estado').Value() + '</p>';
	h += '<p>Agendado: ' + fila.ControlByName('fec_agenda').Value() + '</p>';
	h += '<p>Inicio: ' + fila.ControlByName('fec_inicio').Value() + '</p>';
	h += '<p>Finalización: ' + fila.ControlByName('fec_fin').Value() + '</p>';
	h += '<p>Observaciones: ' + fila.ControlByName('observaciones').Value() + '</p>';
	h += '<p></p>';
	h +=  '<p>Log:<input type="hidden" id="pagLog" value="0"/><span class="pkFlechasEfec ui-icon ui-icon-circle-plus" onclick="FillLog();"></span></p>';
	h += '<p><textarea style="width:100%;height:250px;">';
	h += '</textarea></p>';
	$( "#monDetails" ).html(h);

	FillLog();

	$( "#monDetails" ).dialog( "open" );

}

function FillLog(){

	$('#pagLog').val(parseInt($('#pagLog').val(),10) + 1);

	var srvParams = [];
	srvParams.push(new BXParameter('ID_PROC', $('#idProc').text()));
	srvParams.push(new BXParameter('PAGE', $('#pagLog').val()));

	BXData('CITI.MON_PROC.GET_LOG',srvParams,function(txtArea){
			var s = '';
			for(log=0;log < this.Results.length;log++){
				s += this.Results[log].LOG;
				//s += '&#13;&#10;';
				s += '\r\n';
			}
			txtArea.html(txtArea.html() + s);
		},$( "#monDetails").find('textarea'));

}


function CancelarPeticion(idProc){
	var srvParams = [];
	srvParams.push(new BXParameter('ID_PROC', idProc));

	BXData('CITI.MON_PROC.CANCEL',srvParams,function(){
		BuscarMonitor();
		});
}