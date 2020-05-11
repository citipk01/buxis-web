var BtnBarStatus = '';
// BtnBarStatus INI - Al inicializar el formulario, esto es antes de ingresar al mismo, antes de dispararse la búsqueda
// BtnBarStatus UPD - Actualizar, cuando se selecciona un registro desde la búsqueda o desde la búsqueda de subkey o luego de grabar (aunque haya sido un alta).
// BtnBarStatus ADD - Agregar uno totalmente nuevo, se ingreso con el botón de Agregar desde la pantalla de búsqueda.  Ingresando una nueva clave 1
// BtnBarStatus ADS - Agregar una nueva clave 2 o subKey. Se setea este estado cuadno se presiona el botón de agregar subkey dentro del formulario.
var servPrefix = 'CITI'
var BxBtns = Object;

function bxColDesc(idCol,descCol){
	this.Id = idCol;
	this.Descr = descCol;
}


function BxBtnInit(){

	$( "#ulBotonera li" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);

	if ($('div.bxBtns').length != 1){
		Error('No existe el div.bxBtns o hay más de uno');
	}

	if ($('div.bxBtns')[0].id == ""){
		$('div.bxBtns')[0].id = "idBxBtns";
	}
	BxBtns.Id = $('div.bxBtns')[0].id;

	BxBtns.Service = function(){
		return $('#'+BxBtns.Id).attr('bx-servBtn');
	}

	BxBtns.ServInit = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.INI';
	}

	BxBtns.ServSel = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.SEL';
	}

	BxBtns.ServSelLast = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.LAST';
	}

	BxBtns.ServSelIni = function(){
			return servPrefix + '.' +  BxBtns.Service() + '.SEL.INI';
	}

	BxBtns.ServKey = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.KEY';
	}

	BxBtns.ServUpd = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.UPD';
	}

	BxBtns.ServDel = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.DEL';
	}

	BxBtns.ServIns = function(){
		return servPrefix + '.' +  BxBtns.Service() + '.INS';
	}

	BxBtns.ServSubKeyAll = function(){
		return servPrefix + '.' + BxBtns.Service() + '.SUB.ALL';
	}

	BxBtns.ServSubKey = function(){
		return servPrefix + '.' + BxBtns.Service() + '.SUB.KEY';
	}

	BxBtns.UseEffdt = function(){
		if ($('#'+BxBtns.Id).attr('bx-effdt') == "1"){
			return true;
		}
		return false;
	}

	BxBtns.BtnAgregar = function(){
		if($('#'+BxBtns.Id).attr('bx-btnAgregar') == "0"){
			return false;
		}
		return true;
	}

	BxBtns.BtnBuscar = function(){
		if($('#'+BxBtns.Id).attr('bx-btnBuscar') == "0"){
			return false;
		}
		return true;
	}

	BxBtns.SearchCols = function(campo){
		/*
		var ret = [];
		var searchCols = [];
		var searchCols2 = [];
		var isrc = 0;
		if ($('#'+BxBtns.Id).attr('bx-searchCols') != undefined && $('#'+BxBtns.Id).attr('bx-searchCols') != null){
			searchCols = $('#'+BxBtns.Id).attr('bx-searchCols').split(",");
			for(isrc = 0; isrc < searchCols.length ; isrc++)
			{
				searchCols2 = searchCols[isrc].split(":");
				ret.push(new bxColDesc(searchCols2[0],searchCols2[1]));
			}

		}
		return ret;
		*/
	
		var searchCols = [];
		var searchCols2 = [];
		var isrc = 0;
		if ($('#'+BxBtns.Id).attr('bx-searchCols') != undefined && $('#'+BxBtns.Id).attr('bx-searchCols') != null){
			searchCols = $('#'+BxBtns.Id).attr('bx-searchCols').split(",");
			for(isrc = 0; isrc < searchCols.length ; isrc++)
			{
				
				searchCols2 = searchCols[isrc].split(":");
				if (campo == searchCols2[0]){
					return searchCols2[1];
				}
			}

		}
		return campo;
	}

	BxBtns.SearchField = function(campo){
		var searchCols = [];
		var searchCols2 = [];
		var isrc = 0;
	
		if ($('#'+BxBtns.Id).attr('bx-searchFields') != undefined && $('#'+BxBtns.Id).attr('bx-searchFields') != null){
			searchCols = $('#'+BxBtns.Id).attr('bx-searchFields').split(",");
			for(isrc = 0; isrc < searchCols.length ; isrc++)
			{
				searchCols2 = searchCols[isrc].split(":");
				if (campo == searchCols2[0]){
					return searchCols2[1];
				}
			}

		}
		else
		{
			return BxBtns.SearchCols(campo);
		}
		return null;
	}


	BxBtns.ProcForm = false;

	if ($('#'+BxBtns.Id).attr('bx-procForm') != undefined && $('#'+BxBtns.Id).attr('bx-procForm') != null && $('#'+BxBtns.Id).attr('bx-procForm') == "1"){
		BxBtns.ProcForm = true;
	}

	BxBtns.SaveBtn = true;
	if ($('#'+BxBtns.Id).attr('bx-saveBtn') != undefined && $('#'+BxBtns.Id).attr('bx-saveBtn') != null && $('#'+BxBtns.Id).attr('bx-saveBtn') == "0"){
		BxBtns.SaveBtn = false;
	}

	BxBtns.CancelBtn = true;
	if ($('#'+BxBtns.Id).attr('bx-cancelBtn') != undefined && $('#'+BxBtns.Id).attr('bx-cancelBtn') != null && $('#'+BxBtns.Id).attr('bx-cancelBtn') == "0"){
		BxBtns.CancelBtn = false;
	}

	BxBtns.PrintBtn = false;
	if ($('#'+BxBtns.Id).attr('bx-btnPrint') != undefined && $('#'+BxBtns.Id).attr('bx-btnPrint') != null && $('#'+BxBtns.Id).attr('bx-btnPrint') == "1"){
			BxBtns.PrintBtn = true;
	}

	BxBtns.OnSave = new Function();
	BxBtns.OnInit = new Function();
	BxBtns.OnSelect = new Function();
	BxBtns.OnDelete = new Function();
	BxBtns.OnCancel = new Function();

	if ($('#'+BxBtns.Id).attr('bx-onInit') != undefined && $('#'+BxBtns.Id).attr('bx-onInit') != null && $('#'+BxBtns.Id).attr('bx-onInit') != ""){
		BxBtns.OnInit = new Function($('#'+BxBtns.Id).attr('bx-onInit'));
	}

	if ($('#'+BxBtns.Id).attr('bx-onSelect') != undefined && $('#'+BxBtns.Id).attr('bx-onSelect') != null && $('#'+BxBtns.Id).attr('bx-onSelect') != ""){
		BxBtns.OnSelect = new Function($('#'+BxBtns.Id).attr('bx-onSelect'));
	}

	if ($('#'+BxBtns.Id).attr('bx-OnSave') != undefined && $('#'+BxBtns.Id).attr('bx-onSave') != null && $('#'+BxBtns.Id).attr('bx-onSave') != ""){
		BxBtns.OnSave = new Function($('#'+BxBtns.Id).attr('bx-onSave'));
	}

	if ($('#'+BxBtns.Id).attr('bx-onDelete') != undefined && $('#'+BxBtns.Id).attr('bx-onDelete') != null && $('#'+BxBtns.Id).attr('bx-onDelete') != ""){
		BxBtns.OnDelete = new Function($('#'+BxBtns.Id).attr('bx-onDelete'));
	}

	if ($('#'+BxBtns.Id).attr('bx-onCancel') != undefined && $('#'+BxBtns.Id).attr('bx-onCancel') != null && $('#'+BxBtns.Id).attr('bx-onCancel') != ""){
		BxBtns.OnCancel = new Function($('#'+BxBtns.Id).attr('bx-onCancel'));
	}

	InitForm();

	if(BxBtns.SaveBtn || BxBtns.CancelBtn || BxBtns.PrintBtn){
		bxF().Tag().append('<div class="bxBtnsEnd"></div>');
		if (BxBtns.CancelBtn){
			if (BxBtns.ProcForm){
				if (BxBtns.Service() != 'GEN_RECIBO'){
					bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="curForm.Empty();">Limpiar</span>');
					}
			}else{
				bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="FormSearch();">Cancelar</span>');
			}
		}
		if (BxBtns.SaveBtn){
			
			if (BxBtns.ProcForm){

					bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="Aceptar();">Ejecutar</span>');
				
			}else{
				if (BxBtns.Service() == 'MIRECIBO'){
					bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="Descargar();">Descargar</span>');
				}else{
					bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="Aceptar();">Guardar</span>');
				}
			}
		}
		if (BxBtns.PrintBtn){
			bxF().Tag().find('div.bxBtnsEnd').append('<span class="bxBtn" onclick="Imprimir();">Imprimir</span>');
		}

	}
	$(".bxBtn").button();

	if (BxBtns.UseEffdt()){
		$('#idDivFecEfec').css("display","inline");
	}else{
		for(i=0;i<bxF().Controls.length;i++){
			if (bxF().Controls[i].Name() == "fecha_efectiva"){
				bxF().Controls.splice(i, 1);
				i = i - 1;
			}
		}
		$('#idDivFecEfec').css("display","none");
	}

	// EGV MIVACFORM Inicio
	/*
	BxBtns.OnInit.call();

	BtnBarStatus = 'INI';

	if (!BxBtns.ProcForm){
		SearchDisplay(BxBtns.ServSelIni());
	}else{
		SelectLastProcParam();
	}
	*/


	BtnBarStatus = 'INI';

	bxF().Empty();
	bxF().Hide();

	searchArray = [];
	searchDataIndex = 0;
	$('#idSearchGrid').html('');

	if (BxBtns.ServInit() != ""){

		var srvParams = [];

		BXData(BxBtns.ServInit(),srvParams,function(){
				ConfigDataTypes(this.ResultType);

				subKeyArray = [];
				subKeyDataIndex = 0;

				BxBtns.OnInit.call();
				SetSrvChainEndFunc(function(){
		
					if (!BxBtns.ProcForm){
						SearchDisplay(BxBtns.ServSelIni());
					}else{
						SelectLastProcParam();
					}

				})
				},null,function(){
					subKeyArray = [];
					subKeyDataIndex = 0;

					BxBtns.OnInit.call();
					SetSrvChainEndFunc(function(){

						if (!BxBtns.ProcForm){
							SearchDisplay(BxBtns.ServSelIni());
						}else{
							SelectLastProcParam();
						}
					})

				});

	}


	// EGV MIVACFORM Fin

}

function DisableForm(){
	//$('form.bxForm').addClass('bxGrey');
	bxF().Disable();
	DisableAllButtons();
}

function EnableForm(){
	//$('form.bxForm').removeClass('bxGrey');
	bxF().Enable();
	EnableAllButtons();
}


function DisableAllButtons(){
	var a = $( "#ulBotonera li" );
	for(i=0;i<a.length;i++){
		DisableBarButton(a[i].id);
	}
	$('.pkFlechasEfec').addClass( "ui-state-disabled" );
	$(".bxBtn").button( "option", "disabled", true );
}

function EnableAllButtons(){
	var a = $( "#ulBotonera li" );
	for(i=0;i<a.length;i++){
		EnableBarButton(a[i].id);
	}
	$('.pkFlechasEfec').removeClass( "ui-state-disabled" );
	$(".bxBtn").button( "option", "disabled", false );
}

function DisableBarButton(idBarButton){
	$('#' + idBarButton).addClass( "ui-state-disabled" );
	document.getElementById(idBarButton).style.pointerEvents = "none";
}


function EnableBarButton(idBarButton){
	$('#' + idBarButton).removeClass( "ui-state-disabled" );
	document.getElementById(idBarButton).style.pointerEvents = "auto";
}

//Funciones de los Botones
function Agregar(){
	if(bxF().HasChanged){
		Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){AddSubKey();});
	}else{
		AddSubKey();
	}
}


function Eliminar(){
	if (BtnBarStatus == 'UPD'){

		Question('Se eliminará el registro ¿Desea continuar?',function(){

				DisableForm();

				var srvParams = [];
				for(i=0;i<bxF().Controls.length;i++){
					if (bxF().Controls[i].IsField() && (bxF().Controls[i].Key() || bxF().Controls[i].SubKey())){
						srvParams.push(new BXParameter(bxF().Controls[i].Field(), bxF().Controls[i].ToService()));
					}
				}

				BXScript(BxBtns.ServDel(),srvParams,function(){
					bxF().Empty();
					if(searchArray.length == 0){
						FormSearch();
					}else{
						FormMove(searchDataIndex);
					}
				});
			});
	}
}


function SelectLastProcParam(){

	curForm.Empty();
	curForm.Show();
	DisableForm();
	BtnBarStatus = 'ADD';

	if (BxBtns.ServKey() != ""){

		BXData(BxBtns.ServSelLast(),[],function(){
				ConfigDataTypes(this.ResultType);

				FillForm(this.Results,0,false);

				SelectLastProcParamSub();

				BtnBarStatus = 'ADD';
				BxBtns.OnSelect.call();
				SetSrvChainEndFunc(function(){EnableForm()});
		});
	}
}

function SelectLastProcParamSub(){

	var gridL;

	for(gp=0;gp<curForm.Grids.length;gp++){

		gridL = curForm.Grids[gp];

		BXData(gridL.LastSrv(),[],function(grid){
				grid.FillWithResults(this);
			
				for(gr=0;gr<grid.Rows.length;gr++){
					if(grid.Rows[gr].Status == 'S'){
						grid.Rows[gr].Status = 'I';
					}
				}
			},gridL);
	}
}




function SelectKey(){

	if (BxBtns.ServKey() != ""){

		DisableForm();

		var srvParams = [];
		var ik = 0;
		
		for(ik=0;ik<bxF().Controls.length;ik++){

			if (bxF().Controls[ik].IsField() && bxF().Controls[ik].Key()){
				
				srvParams.push(new BXParameter(bxF().Controls[ik].Field(), bxF().Controls[ik].ToService()));
				
				bxF().Controls[ik].Enable(false);
			}
		
		}
	
		BXData(BxBtns.ServKey(),srvParams,function(){
				ConfigDataTypes(this.ResultType);

				if (this.Results.length > 1){
					Error('El servicio devolvió más de un registro.');
				}
				FillForm(this.Results,1);

				subKeyArray = [];
				subKeyDataIndex = 0;

				if (this.Results.length > 0){
			
					if(bxF().HasSubKey()){

						BXData(BxBtns.ServSubKeyAll(), this.Parameters, function(){
							subKeyArray = [];
							subKeyDataIndex = 0;

							for(isub=0;isub<this.Results.length;isub++){
								var subCol = 0;
								var subKeys = {};
								var isEqual = true;
								for(sk=0;sk<curForm.Controls.length;sk++){
									if (curForm.Controls[sk].IsField() && curForm.Controls[sk].SubKey()){
										subKeys[curForm.Controls[sk].Field()] = this.Results[isub][this.ResultType[subCol].name];
								
										if(subKeys[curForm.Controls[sk].Field()] != curForm.Controls[sk].Value()){
											isEqual = false;
										}
										subCol++;
									}
								}
								
								subKeyArray.push(subKeys);
								if (isEqual){
									subKeyDataIndex = subKeyArray.length - 1;
								}
							}
							BtnBarStatus = 'UPD';
							//EnableForm();
							BxBtns.OnSelect.call();
							SetSrvChainEndFunc(function(){EnableForm()});
						});
					}else{
					
							BtnBarStatus = 'UPD';
							//EnableForm();
							BxBtns.OnSelect.call();
							SetSrvChainEndFunc(function(){EnableForm()});
					}
				}else{
					BtnBarStatus = 'ADS';
					//EnableForm();
					BxBtns.OnSelect.call();
					SetSrvChainEndFunc(function(){EnableForm()});
				}
				//BxBtns.OnCargarControles.call();
		});
	}
}

function AddSubKey(){

	bxF().Empty(1);

	BtnBarStatus = 'ADS';

	//searchArray = [];
	//searchDataIndex = 0;
	//$('#idSearchGrid').html('');

	if (BxBtns.ServInit() != ""){

		DisableForm();

		var srvParams = [];

		BXData(BxBtns.ServInit(),srvParams,function(){
				ConfigDataTypes(this.ResultType);

				FillForm(this.Results,1);

				//subKeyArray = [];
				//subKeyDataIndex = 0;

				//EnableForm();
				BxBtns.OnSelect.call();
				SetSrvChainEndFunc(function(){EnableForm()});
		});
	}
}

function AddKey(){

	bxF().Empty();

	BtnBarStatus = 'ADD';

	searchArray = [];
	searchDataIndex = 0;
	$('#idSearchGrid').html('');

	if (BxBtns.ServInit() != ""){

		DisableForm();

		var srvParams = [];

		BXData(BxBtns.ServInit(),srvParams,function(){
				ConfigDataTypes(this.ResultType);

				FillForm(this.Results,0);

				subKeyArray = [];
				subKeyDataIndex = 0;

				//EnableForm();
		
				for(ik=0;ik<bxF().Controls.length;ik++){
					if (bxF().Controls[ik].IsField() && bxF().Controls[ik].Key()){
						bxF().Controls[ik].Enable(true);
					}
				}

				BxBtns.OnSelect.call();
				SetSrvChainEndFunc(function(){EnableForm()});

		});
	}

}


function SelectSubKey(){

	if (BxBtns.ServSubKey() != ""){

		DisableForm();

		var srvParams = [];
		var ik = 0;
		for(ik=0;ik<bxF().Controls.length;ik++){
			if (bxF().Controls[ik].IsField() && (bxF().Controls[ik].Key() || bxF().Controls[ik].SubKey())){
				srvParams.push(new BXParameter(bxF().Controls[ik].Field(), bxF().Controls[ik].ToService()));
				if (bxF().Controls[ik].Key()){
					bxF().Controls[ik].Enable(false);
				}
			}
		}


		BXData(BxBtns.ServSubKey(),srvParams,function(){
				ConfigDataTypes(this.ResultType);
				if (this.Results.length > 1){
					Error('El servicio devolvió más de un registro.');
				}
				if (this.Results.length < 1){
					Error('El servicio no devolvió registros.');
				}
				FillForm(this.Results,2);

				subKeyArray = [];
				subKeyDataIndex = 0;

				if(bxF().HasSubKey()){

					BXData(BxBtns.ServSubKeyAll(), this.Parameters, function(){
						subKeyArray = [];
						subKeyDataIndex = 0;

						for(isub=0;isub<this.Results.length;isub++){
							var subCol = 0;
							var subKeys = {};
							var isEqual = true;
							for(sk=0;sk<curForm.Controls.length;sk++){
								if (curForm.Controls[sk].IsField() && curForm.Controls[sk].SubKey()){
									subKeys[curForm.Controls[sk].Field()] = this.Results[isub][this.ResultType[subCol].name];
									if(subKeys[curForm.Controls[sk].Field()] != curForm.Controls[sk].Value()){
										isEqual = false;
									}
									subCol++;
								}
							}
							subKeyArray.push(subKeys);
							if (isEqual){
								subKeyDataIndex = subKeyArray.length - 1;
							}
						}
						BtnBarStatus = 'UPD';
						BxBtns.OnSelect.call();
						SetSrvChainEndFunc(function(){EnableForm()});
					});
				}else{
						BtnBarStatus = 'UPD';
						//EnableForm();
						BxBtns.OnSelect.call();
						SetSrvChainEndFunc(function(){EnableForm()});
				}
		});
	}
}


function GrabarDatos(serv){

	if (serv != ""){

		DisableForm();

		if (serv == BxBtns.ServIns() && bxF().HasSubKey()){
			ValidateSubKeyDup();
		}

		StandardSaveValidation();

		BxBtns.OnSave.call();

		//SetSrvChainEndFunc(function(){});

		var srvParams = [];
		for(i=0;i<bxF().Controls.length;i++){
			if (bxF().Controls[i].IsField()){
				srvParams.push(new BXParameter(bxF().Controls[i].Field(), bxF().Controls[i].ToService()));
			}
		}
		for(i=0;i<bxF().Grids.length;i++){
			if(bxF().Grids[i].ServName() != ""){
				srvParams.push(new BXParameter(bxF().Grids[i].ServName(), bxF().Grids[i].ToService()));
			}
		}
		BXScript(serv,srvParams,function(){
			if (!BxBtns.ProcForm)
			{
				if (bxF().HasSubKey()){
					SelectSubKey();
				}else{
					SelectKey();
				}
			}else
			{
				Msg('Proceso agendado.');
				SelectLastProcParam();
			}
		});
	}
}

function DescargarDatos(COD_LQ){

	

		//DisableForm();
	/*	var value = "; " + document.cookie;
 var value = "; " + document.cookie;
  var parts = value.split("; buxisseg=");  
var buxisseg = parts.pop().split(";").shift();
  var parts2 = buxisseg.split(";token=");  
var token = parts2.pop().split("&").shift();
var token2 = token.substring(6,token.length);*/


		//window.open('http://vm-7408-853c:8100/buxis/partials/asp/download.asp?FileID='+COD_LQ+'&token='+token2)
		//url = 'http://vm-7408-853c:8100/buxis/partials/asp/download.asp?FileID='+COD_LQ
		url = window.location.origin+'/Buxis/Partials/Asp/Download.asp?FileID='+COD_LQ
		window.location.href=url
		/*var srvParams = [];
		srvParams.push(new BXParameter("COD_LQ",COD_LQ ));
		BXScript("CITI.MIRECIBO.DOWNLOAD",srvParams,function(){
				SelectKey();
		});*/
	
}


function Descargar(){		
			var mensajeDescargaRecibo = '¿Confirma la descarga del recibo? Recuerde imprimirlo, firmarlo y enviarlo a Payroll.';	

			mensajeDescargaRecibo = "	<b>¿Confirma la descarga del recibo?</b>" +
									"	<br><br>" +
									"	Desde ya agradecemos su colaboración para hacernos llegar firmado el mismo a HRSS Payroll. " +
									"	<br><br>" +
									"	Le recordamos que los medios para devolverlo son los siguientes: " +
									"	<ul>" +
									"		<li><b>•</b>	Buzón de Citicenter ubicado en Planta Baja – Fase II</li>" +
									"		<li><b>•</b>	Buzón en Bartolomé Mitre – 5to.Piso</li>" +
									"		<li><b>•</b>	Por correo interno a Citicenter – Planta baja – Fase II – HRSS Payroll </li>" +
									"	</ul>";


			Question(mensajeDescargaRecibo, function(){
				DescargarDatos(bxF().Controls[0].OldValue);
			});
			document.getElementById("questionDialog").innerHTML = mensajeDescargaRecibo;

	
}

function Aceptar(){



	if(!BxBtns.ProcForm){

			if(bxF().HasChanged){

				switch (BtnBarStatus){
					case 'UPD':
						if (bxF().HasSubKey() && bxF().SubKeyChanged){
							Question('Se insertará un nuevo registro. ¿Desea continuar?',function(){
									for(gri=0;gri<bxF().Grids.length;gri++){
										for(col=0;col<bxF().Grids[gri].Rows.length;col++){
											var gRow = bxF().Grids[gri].Rows[col];
											switch (gRow.Status){
												case 'S':
												case 'U':
													gRow.Status = 'I';
													break;
												case 'D':
													gRow.Status = 'E';
													break;
											}
										}
									}
									GrabarDatos(BxBtns.ServIns());
								});
						}else{
							GrabarDatos(BxBtns.ServUpd());
						}
						break;
					case 'ADS':
						GrabarDatos(BxBtns.ServIns());
						break;
					case 'ADD':
						GrabarDatos(BxBtns.ServIns());
						break;
				}
			}
		
	}else{
		Question('¿Confirma la ejecución del proceso?',function(){
				GrabarDatos(BxBtns.ServIns());
			});
	}

}

function ValidateSubKeyDup(){
	var dup = true;

	for(sk=0;sk<subKeyArray.length;sk++){
		dup = true;
		for(skCtrl=0;skCtrl<bxF().Controls.length;skCtrl++){
			if(bxF().Controls[skCtrl].IsField() && bxF().Controls[skCtrl].SubKey()){
				if(bxF().Controls[skCtrl].Value() != subKeyArray[sk][bxF().Controls[skCtrl].Field()]){
					dup = false;
					break;
				}
			}
		}
		if(dup){
			Error('Valor clave duplicado.');
		}
	}
}

function Imprimir(){

	win = window.open(", ", 'popup', 'toolbar = no, status = no, scrollbars = yes, resizable = yes');
  	win.document.write($('#bxPrintArea').html());
  	win.document.close();
	win.focus();
  	win.print();
  	win.close();
}

/*function Cancelar(){

	switch (BtnBarStatus){
		case 'UPD':
			bxF().Empty();
			if(bxF().HasSubKey()){
				SelectSubKey();
			}else{
				SelectKey();
			}
			break;
		case 'ADD':
			AddKey();
			break;
	}

}
*/

function FormMove(newIndex){

	bxF().Empty();
	searchDataIndex = newIndex;
	for(k=0;k<curForm.Controls.length;k++){
		if (curForm.Controls[k].IsField() && curForm.Controls[k].Key()){
			curForm.Controls[k].Value(searchArray[searchDataIndex][curForm.Controls[k].Field()],true);
		}
	}
	SelectKey();

}

function FormForward(){

	if (searchDataIndex < searchArray.length - 1){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){FormMove(searchDataIndex+1)});
		}else{
			FormMove(searchDataIndex+1);
		}
	}

}

function FormRewind(){

	if (searchDataIndex > 0){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){FormMove(searchDataIndex-1)});
		}else{
			FormMove(searchDataIndex-1);
		}
	}

}


function FormEnd(){
	if (searchDataIndex < searchArray.length - 1){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){FormMove(searchArray.length - 1)});
		}else{
			FormMove(searchArray.length - 1);
		}
	}
}

function FormBegin(){
	if (searchDataIndex > 0){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){FormMove(0)});
		}else{
			FormMove(0);
		}
	}
}

function FormSearch(){
	if(bxF().HasChanged){
		Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){SearchDisplay();});
	}else{
		SearchDisplay();
	}
}


function SubKeyMove(newIndex){

	bxF().Empty();
	subKeyDataIndex = newIndex;
	for(k=0;k<curForm.Controls.length;k++){
		if (curForm.Controls[k].IsField() && curForm.Controls[k].Key()){
			curForm.Controls[k].Value(searchArray[searchDataIndex][curForm.Controls[k].Field()],true);
		}else{
			if (curForm.Controls[k].IsField() && curForm.Controls[k].SubKey()){
				curForm.Controls[k].Value(subKeyArray[subKeyDataIndex][curForm.Controls[k].Field()],true);
			}
		}
	}
	SelectSubKey();
}

function SubKeyForward(){

	if (subKeyDataIndex < subKeyArray.length - 1){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){SubKeyMove(subKeyDataIndex+1)});
		}else{
			SubKeyMove(subKeyDataIndex+1);
		}
	}
}

function SubKeyRewind(){

	if (subKeyDataIndex > 0){
		if(bxF().HasChanged){
			Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){SubKeyMove(subKeyDataIndex-1)});
		}else{
			SubKeyMove(subKeyDataIndex-1);
		}
	}
}


function AddDisplay(){
	$( "#searchForm" ).css("display","none");
	bxF().Show();
	AddKey();
}


function SearchDisplay(serviceName){

	var callService = false;
	if (serviceName != undefined && serviceName != null && serviceName != ''){
		callService = true;
	}

	bxF().Empty();
	bxF().Hide();

	if (callService){
		$( "#searchForm" ).html = "";

		var params = [];
		if ($('.bxSearchField').length > 0){
			for(s=0;s<$('.bxSearchField').length;s++){
				params.push(new BXParameter($('.bxSearchField')[s].name, $('.bxSearchField')[s].value));
			}
		}

		BXData(serviceName,params,function(){

				//var htmlFields = BuildSearchFields(this.ResultType);
				var htmlFields = '';
				if (BxBtns.BtnBuscar()){
					htmlFields = BuildSearchFields(this.ResultType);
				}


				//var htmlBtns = '<div style="float:right"><p><span class="bxSearchBtn" onclick="SearchDisplay(\'' + BxBtns.ServSel() + '\');">Buscar</span></p>'
				var htmlBtns = '';

				if (BxBtns.BtnBuscar() || BxBtns.BtnAgregar()){

					htmlBtns = '<div style="float:right">'

					if(BxBtns.BtnBuscar()){
						htmlBtns += '<p><span class="bxSearchBtn" onclick="SearchDisplay(\'' + BxBtns.ServSel() + '\');">Buscar</span></p>';
					}


					if (BxBtns.BtnAgregar() && BxBtns.Service() != 'MIRECIBO'){
						htmlBtns += '<p><span class="bxSearchBtn" onclick="AddDisplay();">Agregar</span></p>';
					}

					htmlBtns += '</div>';
				}

				var htmlGrid = BuildSearchGrid(this.ResultType, this.Results);
				$( "#searchForm" ).html('<div>' + htmlBtns + htmlFields +  '</div>' + htmlGrid );
				$(".bxSearchBtn").button()

				$('table.bxGridCombo tr.bxGridComboLine').click(function(){
						curForm.Empty();
						var col = 0;
						searchDataIndex = parseInt(this.getElementsByTagName('td')[col].innerText,10) - 1;
						
						col++;
						
						for(k=0;k<curForm.Controls.length;k++){
							
							if (curForm.Controls[k].IsField() && curForm.Controls[k].Key()){							
								curForm.Controls[k].Value(this.getElementsByTagName('td')[col].innerText,true);
								col++;
							}
						}
						$( "#searchForm" ).css("display","none");
						curForm.Show();
						//InitForm();
						SelectKey();
				});

				$( "#searchForm" ).css("display","block");
			});
	}else{
		$( "#searchForm" ).css("display","block");
	}
}

function BuildSearchGrid(types, data){
	searchArray = [];
	//searchType = [];
	if (data.length == 0){
		return '';
	}
	// var a = '<div style="max-height:' + $(window).height() * 0.80 + 'px;" id="idSearchGrid">';
	// var a = '<div id="idSearchGrid" class="bxGridSearch">';
	var a = ''
	let nombreServ_Vacaciones = "MIFORMVAC2";
	if(BxBtns.Service()==nombreServ_Vacaciones){
		a = a + '<div id="idSearchGrid">';
	} else {
		a = a + '<div id="idSearchGrid" class="bxGridSearch">';
	}
	a = a + '<table class="bxGridCombo">';
	a = a + '<tr class="bxGridComboHeader" align ="Center">';
	a = a + '<td class="bxGridComboColId"></td>'

	var nombreColHeader="";

	for(col=0;col<types.length;col++){
		//a = a + '<td>' + types[col].name + '</td>';
		//alert(types[col].name)
		nombreColHeader = BxBtns.SearchCols(types[col].name);
		nombreColHeader = nombreColHeader.replace("ANIO", "AÑO").replace("DESCRIPCION", "DESCRIPCIÓN").replace("DEVOLUCION", "DEVOLUCIÓN");
		 //alert(nombreColHeader);
		if (types[col].name == 'LIQUIDACION'){ 
			var MIRECIBO = true
				a = a + '<td style="display:none;">' + nombreColHeader + '</td>';
		}else{
				a = a + '<td>' + nombreColHeader + '</td>';
		}
		
		if (types[col].name == 'MAX_FRAG'){ 
			var VACACIONES = true
				//a = a + '<td style="display:none;">' + nombreColHeader + '</td>';
		}else{
				//a = a + '<td>' + nombreColHeader + '</td>';
		}		
			
		// .push(types[col].name);
	}
	a = a + '</tr>';
	// var nombreColumnaGrilla = "";
	for(row=0;row<data.length;row++){
		if (VACACIONES){
			a = a + '<tr class="bxGridComboLine" align="Center">';
		}else{
			a = a + '<tr class="bxGridComboLine" >';
		}
		a = a + '<td class="bxGridComboColId">' + String(row + 1) + '</td>'

		for(col=0;col<types.length;col++){
			//nombreColumnaGrilla = data[row][types[col].name];
			//nombreColumnaGrilla = nombreColumnaGrilla.replace("ANIO", "AÑO").replace("DESCRIPCION", "DESCRIPCIÓN")
			if (MIRECIBO && col == 0) {
				a = a + '<td style="display:none;">' + data[row][types[col].name] + '</td>';
			}else{
				a = a + '<td>' + data[row][types[col].name] + '</td>';
			}
		}
		a = a + '</tr>';

		col = 0;
		var keys = {};
		for(k=0;k<curForm.Controls.length;k++){
			if (curForm.Controls[k].IsField() && curForm.Controls[k].Key()){
				keys[curForm.Controls[k].Field()] = data[row][types[col].name];

				col++;
			}
		}
		searchArray.push(keys);

	}
	a = a + '</table>';
	a = a + '</div>';

	return a;
}

var seMuestraGrillaReciboPorPrimeraVez = true;
function BuildSearchFields(types){
	var MIRECIBO = false
	var fieldName = null;
	var in_wid = '100px';
	//var a = '<table>';
	var a = '<table onkeyup="if(event.keyCode == 13){SearchDisplay(\'' + BxBtns.ServSel() + '\');};">';
	for(col=0;col<types.length;col++){
		fieldName = BxBtns.SearchField(types[col].name);
		if (fieldName != null){
			a += '<tr>';
			if (types[col].precision > 50){
				in_wid = '300px';
			}else{
				if (types[col].precision > 25){
					in_wid = '200px';
				}
			}
			//alert(fieldName);

			fieldName = fieldName.replace("ANIO", "AÑO").replace("DESCRIPCION", "DESCRIPCIÓN");
			//alert(fieldName);

			if (types[col].name == 'LIQUIDACION' || (MIRECIBO = true && types[col].name == 'DEVOLUCION') ){
				
				MIRECIBO = true
				a += '<td style="display:none;>' + fieldName + ':</td><td style="display:none;><input type="text" class="bxSearchField" id="search_' + types[col].name + '" name="' + types[col].name + '" style="width:' + in_wid +20 + ';"/></td>';
			}else{
			//a += '<td>' + types[col].name + ':</td><td><input type="text" class="bxSearchField" id="search_' + types[col].name + '" name="' + types[col].name + '" style="width:' + in_wid + ';"/></td>';
				a += '<td>' + fieldName + ':</td><td><input type="text" class="bxSearchField" id="search_' + types[col].name + '" name="' + types[col].name + '" style="width:' + in_wid + ';"/></td>';
				}
			a += '</tr>';
		}
	}
	a += '</table>';

	
	if(seMuestraGrillaReciboPorPrimeraVez==true && BxBtns.Service()=='MIRECIBO' && MIRECIBO==true){
		//SearchDisplay('CITI.MIRECIBO.SEL');
		//alert('holaasd');
		SearchDisplay('CITI.MIRECIBO.SEL');
		seMuestraGrillaReciboPorPrimeraVez = false;
	}
	return a;
}



function BuildSubKeyGrid(){
	if (subKeyArray.length == 0){
		return '';
	}
	a = '<div style="max-height:' + $(window).height() * 0.50 + 'px;">';
	a = a + '<table class="bxGridCombo">';
	a = a + '<tr class="bxGridComboHeader">';
	a = a + '<td></td>';
	for(col=0;col<bxF().Controls.length;col++){
		if(bxF().Controls[col].IsField() && bxF().Controls[col].SubKey()){
			a = a + '<td>' + bxF().Controls[col].Field() + '</td>';

		}
	}
	a = a + '</tr>';
	for(row=0;row<subKeyArray.length;row++){
		a = a + '<tr class="bxGridComboLine">';
		a = a + '<td>' + String(row + 1) + '</td>';
		for(col=0;col<bxF().Controls.length;col++){
			if(bxF().Controls[col].IsField() && bxF().Controls[col].SubKey()){
				a = a + '<td>' + subKeyArray[row][bxF().Controls[col].Field()] + '</td>';

			}
		}
		a = a + '</tr>';
	}
	a = a + '</table>';
	a = a + '</div>';
	return a;
}




function SubKeySearch(){

	var htmlGrid = BuildSubKeyGrid();
	$( "#comboDialog" ).html(htmlGrid);

	$('table.bxGridCombo tr').click(function(){
			var move = parseInt(this.getElementsByTagName('td')[0].innerText,10) - 1;
			if(bxF().HasChanged){
				Question('El formulario se ha modificado, si continúa perderá los cambios. ¿Desea continuar?', function(){
					$( "#comboDialog" ).dialog( "close" );
					SubKeyMove(this);},undefined,move);
			}else{
				$( "#comboDialog" ).dialog( "close" );
				SubKeyMove(move);
			}
	});


	$( "#comboDialog" ).dialog( "open" );


}

