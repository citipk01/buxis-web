var curForm = Object;
var iniDataJson = "";
var srvDataJson = "";
var pkDateSeparator = "/";
var pkDateFormat = "dd" + pkDateSeparator + "mm" + pkDateSeparator + "yy";
var bxServDateSep = "-";
var bxServDateFormat = "yyyy" + bxServDateSep + "mm" + bxServDateSep + "dd";
var idCounter = 0;
var searchSel = "";
var searchType = "";
var searchArray = [];
var searchDataIndex = 0;
var subKeyArray = [];
var subKeyDataIndex = 0;

$.datepicker.setDefaults({
  //showOn: "both",
  //buttonImageOnly: true,
  //buttonImage: "/buxis/Partials/img/calendar.gif",
  //buttonText: "Calendar",
  dateFormat: pkDateFormat,
  autosize: true
});


function strPadLeft(str, chr, largo){
	var i = 0;
	while (str.length < largo){
		str = chr + str;
	}
	return str;
}

function strPadRigth(str, chr, largo){
	var i = 0;
	while (str.length < largo){
		str = str + chr;
	}
	return str;
}

function AddDaysToDate(inDate, numDays){
	var d = new Date();
	d.setTime( inDate.getTime() + (numDays * 86400000) );
	return d;
}


function AddDaysToDateStr(inDateStr, numDays){
	return FormatDateToStr(AddDaysToDate(GetDateFromStr(inDateStr), numDays));
}

function DiffDates(date1, date2){
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays;
}

function DiffDatesStr(date1, date2){
	return DiffDates(GetDateFromStr(date1), GetDateFromStr(date2));
}

function GetDateFromStr(inDate){

	var dateFull = String(inDate).replace(pkDateSeparator,'');
	dateFull = dateFull.replace(pkDateSeparator,'');

	var d = new Date();
	d.setFullYear(parseInt(dateFull.substr(4,4),10), parseInt(dateFull.substr(2,2),10) - 1, parseInt(dateFull.substr(0,2),10));
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	return d;
}

function FormatDateToStr(inDate){
	var day = inDate.getDate();
	var mon = inDate.getMonth() + 1;
	var year = inDate.getFullYear();
	return strPadLeft(String(day),'0',2) + pkDateSeparator + strPadLeft(String(mon),'0',2) + pkDateSeparator + String(year)
}


function StandardValidation(data, dataType, precision, scale){
	switch (dataType){
		case "text":

			if (parseInt(precision,10) > 0 && data.length > parseInt(precision,10)){

				throw "El largo del campo no puede superar los " + precision + " caracteres.";
			}
			break;
		case "number":
			if (!isFinite(data)){
				throw 'El campo debe ser numérico';
			}
			intLength = String(data).length;
			decLength = 0;
			if (String(data).indexOf('.') >= 0){
				intLength = String(data).indexOf('.');
				decLength = String(data).substr(String(data).indexOf('.') + 1,String(data).length - (String(data).indexOf('.') + 1));
			}
			if (String(data).substr(0,1) == "-"){
				intLength = intLength - 1;
			}
			if (decLength == 0){
				DecimalScale = 0
			}else{
				DecimalScale = String(decLength).length
			}
			if (intLength > precision || DecimalScale > scale){
				throw 'El nÃºmero ingresado no responde al formato '+ precision + '.' + scale;
			}
			break;
		case "date":
			if (data != ""){
				var day,mon,year;
				var oldDay,oldMon,olYear;
				try{
					var dateFull = String(data).replace(pkDateSeparator,'');
					dateFull = dateFull.replace(pkDateSeparator,'');

					oldDay = parseInt(dateFull.substr(0,2),10);
					oldMon = parseInt(dateFull.substr(2,2),10);
					oldYear = parseInt(dateFull.substr(4,4),10);
					if (oldYear < 100){
						oldYear = oldYear + 2000;
					}
					if (oldYear < 1900){
						Error('Fecha incorrecta');
					}
					var d = new Date();
					//d.setFullYear(parseInt(dateFull.substr(4,4),10), parseInt(dateFull.substr(2,2),10) - 1, parseInt(dateFull.substr(0,2),10));
					d.setFullYear(oldYear, oldMon -1, oldDay);
					day = d.getDate();
					mon = d.getMonth() + 1;
					year = d.getFullYear();
				}catch(e){
					Error(e.message);
				}
				//if (year != parseInt(dateFull.substr(4,4),10) || mon != parseInt(dateFull.substr(2,2),10) || day != parseInt(dateFull.substr(0,2),10)){
				if (year != oldYear || mon != oldMon || day != oldDay){
					Error('Fecha incorrecta');
				}else{
					data = strPadLeft(String(day),'0',2) + pkDateSeparator + strPadLeft(String(mon),'0',2) + pkDateSeparator + String(year);
				}
			}
			break;
	}
	return data;
}


function BxForm(idForm){
	this.Id = idForm;

	this.Controls = [];
	this.Grids = [];
	this.HasChanged = false;

	this.Name = function(){
		return $('#'+this.Id).data("name");
	}


	this.ControlById = function(id){
		for (i = 0; i < this.Controls.length; i++) {
			if (this.Controls[i].Id == id){
				return this.Controls[i];
			}
		}
	}
	this.ControlByName = function(n){
			for (i = 0; i < this.Controls.length; i++) {
				if (this.Controls[i].Name() == n){
					return this.Controls[i];
				}
			}
	}

	this.GridById = function(id){
		for (i = 0; i < this.Grids.length; i++) {
			if (this.Grids[i].Id == id){
				return this.Grids[i];
			}
		}
	}

	this.GridByName = function(n){
		for (i = 0; i < this.Grids.length; i++) {
			if (this.Grids[i].Name() == n){
				return this.Grids[i];
			}
		}
	}

	this.Empty = function(incKeys){
		if (incKeys == undefined || incKeys == null){
			incKeys = 0;
		}else{
			if(incKeys != 1 && incKeys != 2){
				incKeys = 0;
			}
		}
		for (iemp = 0; iemp < this.Controls.length; iemp++) {
			switch(incKeys){
				case 2:
					if(!this.Controls[iemp].Key() && !this.Controls[iemp].SubKey()){
						this.Controls[iemp].Empty();
					}
					break;
				case 1:
					if(!this.Controls[iemp].Key()){
						this.Controls[iemp].Empty();
					}
					break;
				default:
					this.Controls[iemp].Empty();
					break;
			}
		}
		for (iemp2 = 0; iemp2 < this.Grids.length; iemp2++){
			this.Grids[iemp2].Empty();
		}
		this.HasChanged = false;
		this.SubKeyChanged = false;
	}

	this.Tag = function(){
		return $('#' + this.Id);
	}

	this.Show = function(){
		this.Tag().css("display","block");
		for(gr=0;gr<this.Grids.length;gr++){
			this.Grids[gr].AdjustHeader();
		}
	}

	this.Hide = function(){
		this.Tag().css("display","none");
	}

	this.HasSubKey = function(){
		for(subk=0;subk<this.Controls.length;subk++){
			if(this.Controls[subk].SubKey()){
				return true;
			}
		}
		return false;
	}

	this.SubKeyChanged = false;

	var htmlDiag = '<div id="errorDialog" title="Error" class="bxDialog"><p class="bxMsg">Mensaje de Error no encontrado.</p><p class="bxExplain">Detalles</p></div>';
	this.Tag().append(htmlDiag);

	$( "#errorDialog" ).dialog({
		autoOpen: false,
		modal: true,
		width: 400,
		close : function (event,ui){
					$('#errorDialog p').text('Mensaje de Error no encontrado.');
				}
	});

	htmlDiag = '<div id="comboDialog" title="Busqueda" class="searchDialog"></div>';
	this.Tag().append(htmlDiag);

	$("#comboDialog").dialog({
		autoOpen: false,
		modal: true,
		close : function (event,ui){
					$('#comboDialog').html('');
				}
	});

	//htmlDiag = '<div id="questionDialog" title="Pregunta"><p>Pregunta</p></div>';
	htmlDiag = '<div id="questionDialog" title=""><p></p></div>';
	this.Tag().append(htmlDiag);

	$( "#questionDialog" ).dialog({
		autoOpen: false,
		modal: true,
		width: 400,
		close : function (event,ui){
					$( this ).dialog( "option", "title", "" );
					$('#questionDialog p').text('');
				}
	});

	htmlDiag = '<img id="formLoaderGif" src="/buxis/Partials/img/loader45.gif" alt="Cargando..." style="position:fixed;right:50px;top:80px;z-index:10;display:none;"/>';
	this.Tag().append(htmlDiag);

	this.Enabled = true;

	this.Disable = function(){
		$('#formLoaderGif').css("display","block");
		this.Enabled = false;
	}

	this.Enable = function(){
		$('#formLoaderGif').css("display","none");
		this.Enabled = true;
	}

}

function BxGrid(idTag, form){
	this.Id = idTag;
	this.Name = function(){
		return $('#'+this.Id).attr("name");
	}

	this.Form = form;

	this.Rows = [];

	this.FillSrv = function(){
		if ($('#'+this.Id).attr("bx-servName") == undefined || $('#'+this.Id).attr("bx-servName") == null || $('#'+this.Id).attr("bx-servName") == ""){
			return "";
		}
		return 'CITI.' + $('#'+this.Id).attr("bx-servName") + '.GRID.FILL';
	}

	this.LastSrv = function(){
		if ($('#'+this.Id).attr("bx-servName") == undefined || $('#'+this.Id).attr("bx-servName") == null || $('#'+this.Id).attr("bx-servName") == ""){
			return "";
		}
		return 'CITI.' + $('#'+this.Id).attr("bx-servName") + '.GRID.LAST';
	}

	this.IniSrv = function(){
		if ($('#'+this.Id).attr("bx-servName") == undefined || $('#'+this.Id).attr("bx-servName") == null || $('#'+this.Id).attr("bx-servName") == ""){
			return "";
		}
		return 'CITI.' + $('#'+this.Id).attr("bx-servName") + '.GRID.INI';
	}

	this.ServName = function(){
			return $('#'+this.Id).attr("bx-servName");
	}

	this.RowById = function(idRow){
		for(irId=0;irId<this.Rows.length;irId++){
			if(this.Rows[irId].Id == idRow){
				return this.Rows[irId];
			}
		}
	}

	this.OnDetails = new Function();

	this.HasDetails = false;

	if ($('#'+this.Id).attr('bx-gridOnDetails') != undefined && $('#'+this.Id).attr('bx-gridOnDetails') != null && $('#'+this.Id).attr('bx-gridOnDetails') != ""){
		this.OnDetails = new Function('curRow',$('#'+this.Id).attr('bx-gridOnDetails'));
		this.HasDetails = true;
	}

	this.RowScript = '';

	//$('#' + this.Id).find('tr.bxGridHeader').append('<td style="width:16px;"><a href="#" onclick="bxG(\''+ this.Name() + '\').AddRow();">Add</a></td>');
	$('#' + this.Id).find('tr.bxGridHeader').append('<td style="width:46px;">Acción</td>');

	var htmlBtns = '<td style="width:46px;">'
	htmlBtns += '<a href="#" class="bxGridAddLnk" style="display:inline-block;" onclick="bxG(\''+ this.Name() + '\').AddRow($(this).closest(\'tr\').attr(\'id\'));" onkeyup="if(event.keyCode == 32){bxG(\''+ this.Name() + '\').AddRow($(this).closest(\'tr\').attr(\'id\'));};"><span class="ui-icon ui-icon-plus" style="display:inline-block;"></span></a><a href="#" class="bxGridDelLnk" style="display:inline-block;" onclick="bxG(\''+ this.Name() + '\').DelRow($(this).closest(\'tr\').attr(\'id\'));" ><span class="ui-icon ui-icon-trash" style="display:inline-block;"></span></a>'
	if (this.HasDetails){
		htmlBtns += '<a href="#" class="bxGridDetailsLnk" style="display:inline-block;" onclick="bxG(\''+ this.Name() + '\').OnDetails.call(null,bxG(\''+ this.Name() + '\').RowById($(this).closest(\'tr\').attr(\'id\')));" onkeyup="if(event.keyCode == 32){bxG(\''+ this.Name() + '\').OnDetails.call(null,bxG(\''+ this.Name() + '\').RowById($(this).closest(\'tr\').attr(\'id\')));};"><span class="ui-icon ui-icon-zoomin" style="display:inline-block;"></span></a>'
	}
	htmlBtns += '</td>';

	//$('#' + this.Id).find('tr.bxGridLine').append('<td><a href="#" class="bxGridAddLnk" style="display:inline-block;" onclick="bxG(\''+ this.Name() + '\').AddRow($(this).closest(\'tr\').attr(\'id\'));" onkeyup="if(event.keyCode == 32){bxG(\''+ this.Name() + '\').AddRow($(this).closest(\'tr\').attr(\'id\'));};"><span class="ui-icon ui-icon-plus" style="display:inline-block;"></span></a><a href="#" class="bxGridDelLnk" style="display:inline-block;" onclick="bxG(\''+ this.Name() + '\').DelRow($(this).closest(\'tr\').attr(\'id\'));" ><span class="ui-icon ui-icon-trash" style="display:inline-block;"></span></a></td>');

	$('#' + this.Id).find('tr.bxGridLine').append(htmlBtns);

	this.AdjustHeader = function(){
		if (this.Form.Tag().css("display") != "none"){
			for(ch=0;ch<$('#' + this.Id).find('tr.bxGridHeader').children().length;ch++){
				if(!($('#' + this.Id).find('tr.bxGridHeader').children()[ch].style.display != undefined && $('#' + this.Id).find('tr.bxGridHeader').children()[ch].style.display != "null" && $('#' + this.Id).find('tr.bxGridHeader').children()[ch].style.display == "none")){
					if($('#' + this.Id).find('tr.bxGridHeader').children()[ch].offsetWidth < $('#' + this.Id).find('tr.bxGridLine').children()[ch].offsetWidth){
						//$('#' + this.Id).find('tr.bxGridHeader').children()[ch].style.width = String($('#' + this.Id).find('tr.bxGridLine').children()[ch].offsetWidth - 2) + 'px';
						$('#' + this.Id).find('tr.bxGridHeader').children()[ch].style.width = String($('#' + this.Id).find('tr.bxGridLine').children()[ch].offsetWidth) + 'px';
					}else{
						//$('#' + this.Id).find('tr.bxGridLine').children()[ch].style.width = String($('#' + this.Id).find('tr.bxGridHeader').children()[ch].offsetWidth - 2) + 'px';
						$('#' + this.Id).find('tr.bxGridLine').children()[ch].style.width = String($('#' + this.Id).find('tr.bxGridHeader').children()[ch].offsetWidth) + 'px';
					}
				}
			}
		}
	}

	this.AdjustHeader();

	this.RowScript = $('#' + this.Id).find('tr.bxGridLine')[0].outerHTML;

	this.RowScript = this.RowScript.replace(/hasDatepicker/g,'');

	this.OnAdd = new Function();

	if ($('#'+this.Id).attr('bx-gridOnAdd') != undefined && $('#'+this.Id).attr('bx-gridOnAdd') != null && $('#'+this.Id).attr('bx-gridOnAdd') != ""){
		this.OnAdd = new Function('curRow',$('#'+this.Id).attr('bx-gridOnAdd'));
	}

	this.OnDel = new Function();

	if ($('#'+this.Id).attr('bx-gridOnDel') != undefined && $('#'+this.Id).attr('bx-gridOnDel') != null && $('#'+this.Id).attr('bx-gridOnDel') != ""){
			this.OnDel = new Function('curRow',$('#'+this.Id).attr('bx-gridOnDel'));
	}



	this.AddRow = function(idRow, bypass){
		var objLastRow = [];
		if (idRow != undefined && idRow != null){
			$('#' + idRow).after(this.RowScript);
			objLastRow = $('#' + idRow).next();
		}else{
			$('#' + this.Id).find('tr.bxGridLine').closest('table').append(this.RowScript);
			objLastRow = $('#' + this.Id).find('tr.bxGridLine').last();
		}
		idCounter++;
		objLastRow.attr('id',String(idCounter));
		objLastRow.find('.bxComboLink').remove()
		var objGridRow = new BxGridRow(objLastRow.attr('id'), this);

		for (j = 0; j < objGridRow.Tag().find('.bxCtrl').length; j++){
			idCounter++;
			objGridRow.Tag().find('.bxCtrl')[j].id = String(idCounter);
		
			idField = objGridRow.Tag().find('.bxCtrl')[j].id;
			
			objGridRow.Controls.push(new BxCtrl(idField, objGridRow.Grid.Form, null, null, objGridRow));
			//if (pkFormu.CamposPorId(idCampo).Tipo() == "numeroNeg" || pkFormu.CamposPorId(idCampo).Tipo() == "numero"){
		}
		objGridRow.SetDescrs();
		objGridRow.ApplyType();

		this.Rows.push(objGridRow);

		if (!bypass){
			this.OnAdd.call(null,objGridRow);
		}
	}

	this.DelRow = function(idRow){
		var oRowDel = this.RowById(idRow);

		this.OnDel.call(null,oRowDel);

		if (oRowDel.Status == 'N'){
			oRowDel.Status = 'E';
		}else{
			this.Form.HasChanged = true;
			oRowDel.Status = 'D';
		}
		oRowDel.Tag().css('display','none');
		var lastRow = true;
		for(iR=0;iR<this.Rows.length;iR++){
			if(this.Rows[iR].Status != 'E' && this.Rows[iR].Status != 'D'){
				lastRow = false;
				break;
			}
		}
		if(lastRow){
			this.AddRow();
		}
	}

	this.RowTypes = [];

	this.Fill = function(){
		$('#'+this.Id).addClass('bxGrey');
		var srvParams = [];
		var ig = 0;
		for(ig=0;ig<this.Form.Controls.length;ig++){
			if (this.Form.Controls[ig].IsField() && (this.Form.Controls[ig].Key() || this.Form.Controls[ig].SubKey())){
				srvParams.push(new BXParameter(this.Form.Controls[ig].Field(), this.Form.Controls[ig].ToService()));
			}
		}
		this.Empty();

		BXData(this.FillSrv(),srvParams,function(grid){
			grid.RowTypes = this.ResultType;
			grid.Rows[0].ApplyType();

			for(isr=0;isr<this.Results.length;isr++){
				if(isr>0){
					grid.AddRow(null,true);
				}
				var rowI = grid.Rows.length - 1;
				grid.Rows[rowI].Status = 'S';
				for(jsr=0;jsr<grid.Rows[rowI].Controls.length;jsr++){
					if(grid.Rows[rowI].Controls[jsr].IsField()){
					
						grid.Rows[rowI].Controls[jsr].Value(this.Results[isr][grid.Rows[rowI].Controls[jsr].Field()],true);
						grid.Rows[rowI].Controls[jsr].SelectedValue = grid.Rows[rowI].Controls[jsr].Value();
					}
				}
				grid.OnAdd.call(null,grid.Rows[rowI]);
			}
			$('#'+grid.Id).removeClass('bxGrey');
		},this);
	}

	this.FillWithResults = function(res){
		this.Tag().addClass('bxGrey');
		this.Empty();
		this.RowTypes = res.ResultType;
		this.Rows[0].ApplyType();

		for(isr=0;isr<res.Results.length;isr++){
			if(isr>0){
				this.AddRow(null,true);
			}
			var rowI = this.Rows.length - 1;
			this.Rows[rowI].Status = 'S';
			for(jsr=0;jsr<this.Rows[rowI].Controls.length;jsr++){
				if(this.Rows[rowI].Controls[jsr].IsField()){
					this.Rows[rowI].Controls[jsr].Value(res.Results[isr][this.Rows[rowI].Controls[jsr].Field()],true);
					this.Rows[rowI].Controls[jsr].SelectedValue = this.Rows[rowI].Controls[jsr].Value();
				}
			}
			this.OnAdd.call(null,this.Rows[rowI]);
		}
		this.Tag().removeClass('bxGrey');
	}

	this.Init = function(){
		$('#'+this.Id).addClass('bxGrey');
		var srvParams = [];

		this.Empty();

		BXData(this.IniSrv(),srvParams,function(grid){
			grid.RowTypes = this.ResultType;
			grid.Rows[0].ApplyType();
			$('#'+grid.Id).removeClass('bxGrey');
		},this);
	}

	this.Empty = function(){
		for(ieg=0;ieg<this.Rows.length-1;ieg++){
			$('#' + this.Rows[ieg].Id).remove();
		}
		this.Rows.splice(0,this.Rows.length-1);
		this.Rows[0].Empty();
		this.Rows[0].Tag().css('display','table-row');
		this.AdjustHeader();
		this.RowScript = $('#' + this.Id).find('tr.bxGridLine')[0].outerHTML;
		this.RowScript = this.RowScript.replace(/hasDatepicker/g,'');
	}

	this.Tag = function(){
		return $('#' + this.Id);
	}

	this.ToService = function(){
		var s = '[';
		for(r=0;r<this.Rows.length;r++){
			if(r==0){
				s += '{'
			}else{
				s += ',{'
			}
			s += '"bxRowStatus":"' + this.Rows[r].Status + '"';
			for(c=0;c<this.Rows[r].Controls.length;c++){
				var ctrl = this.Rows[r].Controls[c];
				if (ctrl.IsField()){
					s += ',"' + ctrl.Field() + '":';
					s += '"' + ctrl.ToService() + '"';
				}
				if (ctrl.Key()){
					s += ',"bxSelVal_' + ctrl.Field() + '":';
					s += '"' + ValueToService(ctrl.SelectedValue,ctrl.DataType) + '"';
				}
			}
			s += '}'
		}
		s += ']';
		return s;
	}

	this.EnableAdd = function(en){
		for(iad=0;iad<this.Rows.length;iad++){
			if(en){
				this.Rows[iad].Tag().find('a.bxGridAddLnk').css('display','inline-block');
			}else{
				this.Rows[iad].Tag().find('a.bxGridAddLnk').css('display','none');
			}
		}
	}

	this.EnableDel = function(en){
		for(iad=0;iad<this.Rows.length;iad++){
			if(en){
				this.Rows[iad].Tag().find('a.bxGridDelLnk').css('display','inline-block');
			}else{
				this.Rows[iad].Tag().find('a.bxGridDelLnk').css('display','none');
			}
		}
	}

}


function BxGridRow(idTag, oGrid){
	this.Id = idTag;
	this.Grid = oGrid;
	this.Controls = [];

	this.ControlById = function(id){
		for (ici = 0; ici < this.Controls.length; ici++) {
			if (this.Controls[ici].Id == id){
			
				return this.Controls[ici];
			}
		}
	}

	this.ControlByName = function(n){
			for (icn = 0; icn < this.Controls.length; icn++) {
		
				if (this.Controls[icn].Name() == n){
					return this.Controls[icn];
				}
			}
	}

	this.Tag = function(){
		return $('#' + this.Id);
	}

	this.Empty = function(){
		this.Status = 'N';
		for(iec=0;iec<this.Controls.length;iec++){
			this.Controls[iec].Empty();
		}
	}

	this.ApplyType = function(){
		for(it=0; it < this.Controls.length; it++){
			var ctrl = this.Controls[it];
			for(jt=0; jt < this.Grid.RowTypes.length; jt++){
				var tipo = this.Grid.RowTypes[jt];
				/*
				if (this.Grid.RowTypes[jt].name == this.Controls[it].Field()){
					this.Controls[it].DataType = ConvertDataType(this.Grid.RowTypes[jt].type);
					this.Controls[it].Precision = parseInt(this.Grid.RowTypes[jt].precision,10);
					this.Controls[it].Scale = parseInt(this.Grid.RowTypes[jt].scale,10);
					this.Controls[it].Format();
					break;
				}
				*/
			
				if (tipo.name == ctrl.Field()){
					ctrl.DataType = ConvertDataType(tipo.type);
					ctrl.Precision = parseInt(tipo.precision,10);
					ctrl.Scale = parseInt(tipo.scale,10);
					ctrl.Format();
					break;
				}
			}
		}
	}

	this.SetDescrs = function(){
		for(cdesc=0;cdesc<this.Controls.length;cdesc++){
			myCtrl = this.Controls[cdesc];
			if (myCtrl.DescrServ() != undefined && myCtrl.DescrServ() != null && myCtrl.DescrServ() != "" && myCtrl.DescrCode() != undefined && myCtrl.DescrCode() != null && myCtrl.DescrCode() != ""){
				if (this.ControlByName(myCtrl.DescrCode()) != undefined && this.ControlByName(myCtrl.DescrCode()) != null){
					this.ControlByName(myCtrl.DescrCode()).DescrCtrls.push({name:myCtrl.Name(),service:myCtrl.DescrServ()});
				}
			}
		}
	}
//alert(this.Status)

	this.Status = 'N';
	// Status: N: Nuevo vacío no hace nada
	// Status: S: Seleccionado
	// Status: E: Eliminado de uno nuevo no hace nada
	// Status: D: Eliminado de uno seleccionado hace delete
	// Status: I: Inserta Nuevo
	// Status: U: Acutalizar existente

}


function BxCtrl(idTag, form, onChangeFunc, onValidFunc, oGridRow){
	this.Id = idTag;

	this.Form = form;

	this.GridRow = oGridRow;

	this.Name = function(){

		return $('#'+this.Id).attr("name");
	}

	this.Field = function(){
		return $('#'+this.Id).attr("bx-ctrlField");
	}

	this.IsField = function(){
		if (this.Field() != undefined && this.Field() != null && this.Field() != ""){
			return true;
		}
		return false;
	}

	this.Key = function(){
		if ($('#'+this.Id).attr("bx-ctrlKey") == 1 || $('#'+this.Id).attr("bx-ctrlKey") == "1"){
			return true;
		}
		return false;
	}

	this.SubKey = function(){
		if ($('#'+this.Id).attr("bx-ctrlKey") == 2 || $('#'+this.Id).attr("bx-ctrlKey") == "2"){
			return true;
		}
		return false;
	}

	this.DescrServ = function(){
		return $('#'+this.Id).attr("bx-dscSrv");
	}

	this.DescrCode = function(){
		return $('#'+this.Id).attr("bx-brwCodeDsc");
	}

	this.ComboServ = function(){
		return $('#'+this.Id).attr("bx-srvCombo");
	}

	this.CheckTrue = function(){
		if ($('#'+this.Id).attr("type") == "checkbox"){
			return $('#'+this.Id).attr("bx-checkTrue");
		}else{
			return "";
		}
	}

	this.CheckFalse = function(){
		if ($('#'+this.Id).attr("type") == "checkbox"){
			return $('#'+this.Id).attr("bx-checkFalse");
		}else{
			return "";
		}
	}

	this.AutoFix = function(){
		return $('#'+this.Id).attr("bx-srvAutoFix");
	}

	this.AutoFunc = function(){
			return $('#'+this.Id).attr("bx-srvAutoFunc");
	}

	this.Req = function(){
		if ($('#'+this.Id).attr("bx-req") == "1"){
			return true;
		}
		if ($('#'+this.Id).attr("bx-req") == "0"){
			return false;
		}
		if (this.Key() || this.SubKey()){
			return true;
		}
		return false;
	}


	if (this.ComboServ() != undefined && this.ComboServ() != null && this.ComboServ() != ""){
		if ($('#'+this.Id).prop('tagName') == "SELECT"){
			//$('#'+this.Id).val(oldVal);
					/*var oldVal;
					oldVal = selTag.val();
					$('#'+this.Id).html("");
					selTag.val(oldVal);*/
			if((this.GridRow != undefined && this.GridRow != null && this.GridRow.Grid.Rows.length == 1) || this.GridRow == undefined || this.GridRow == null ){
				BXData(this.ComboServ(),[],function(selTag){
						selTag.append('<option value="">--- Sin asignar ---</option>');
						for(rowCbo=0;rowCbo<this.Results.length;rowCbo++){
							selTag.append('<option value="' + this.Results[rowCbo][this.ResultType[0].name] + '">' + this.Results[rowCbo][this.ResultType[1].name] + '</option>');
						}
					},$('#'+this.Id));
			}
		}else{
			//var htmlCombo = '<span class="bxBtn" style="margin-left:0.3em;" onclick="ComboDisplay(bxF(\'' + this.Name() + '\'))">...</span>'
			//var htmlCombo = '<a href="#"><span class="bxBtn ui-icon ui-icon-search" style="margin-left:0.3em;" onclick="ComboDisplay(bxF(\'' + this.Name() + '\'))"></span></a>'
			//var htmlCombo = '<a href="#" style="text-decoration: none"><span class="bxBtn ui-icon ui-icon-search" style="display:inline;" onclick="ComboDisplay(bxF(\'' + this.Name() + '\'))">&nbsp;&nbsp;&nbsp;&nbsp;</span></a>'
			var htmlCombo = ''
			if(this.GridRow != undefined && this.GridRow != null){
				htmlCombo = '<a href="#" class="bxComboLink" style="text-decoration: none" onclick="ComboDisplay(bxG(\''  + this.GridRow.Grid.Name() + '\').RowById(\'' + this.GridRow.Id + '\').ControlById(\'' + this.Id + '\'))" onkeyup="if(event.keyCode == 32){ComboDisplay(bxG(\''  + this.GridRow.Grid.Name() + '\').RowById(\'' + this.GridRow.Id + '\').ControlById(\'' + this.Id + '\'));};"><span class="ui-icon ui-icon-search" style="display:inline;">&nbsp;&nbsp;&nbsp;&nbsp;</span></a>';
			}else{
				htmlCombo = '<a href="#" class="bxComboLink" style="text-decoration: none" onclick="ComboDisplay(bxF(\'' + this.Name() + '\'))" onkeyup="if(event.keyCode == 32){ComboDisplay(bxF(\'' + this.Name() + '\'));};"><span class="ui-icon ui-icon-search" style="display:inline;">&nbsp;&nbsp;&nbsp;&nbsp;</span></a>';
			}

			$('#'+this.Id).after(htmlCombo);
			//$(".bxBtn").button();
		}
	}

	/*if (this.AutoFix() != undefined && this.AutoFix() != null && this.AutoFix() != ""){
		BXData(this.AutoFix(),[],function(nameCtrl){
			$('#'+this.Id).autocomplete({
				source: this.Results,
				change: bxF(nameCtrl).Value(ui.value)
			});
		},this.Name());
	}else{
		if (this.AutoFunc() != undefined && this.AutoFunc() != null && this.AutoFunc() != ""){
			$('#'+this.Id).autocomplete({
				source: function(request, response){
					//request.term

					BXData(this.AutoFunc(),[new BXParameter('value', request.term)],function(resp){
						resp = this.Results;
					},response);
				}
			}
		}
	}*/

	this.DataType = "text";
	this.Precision = 50;
	this.Scale = 0;

	this.DescrCtrls = [];	//{name="control name",service="service name"}

	this.LoadDescr = function(){
		for(i=0;i<this.DescrCtrls.length;i++){
			if(this.DescrCtrls[i]["name"] != undefined && this.DescrCtrls[i]["name"] != null && this.DescrCtrls[i]["name"] != "" && this.DescrCtrls[i]["service"] != undefined && this.DescrCtrls[i]["service"] != null && this.DescrCtrls[i]["service"] != ""){
				BXData(this.DescrCtrls[i]["service"],[new BXParameter("codigo", this.Value())],function(control){
					if(this.Results != undefined && this.Results != null & this.Results.length > 0){
						control.Value(this.Results[0][this.ResultType[0].name],true);
					}else{
						control.Value("",true);
					}
				},this.GetDescrControlByName(this.DescrCtrls[i]["name"]));
			}
		}
	}

	this.GetDescrControlByName = function(name){
		if(this.GridRow != undefined && this.GridRow != null){
			return this.GridRow.ControlByName(name);
		}
		return this.Form.ControlByName(name);
	}

	this.Format = function(){
		switch(this.DataType){
			case "text":
				if(this.Precision > 0){
					$('#'+this.Id).attr("maxlength",this.Precision);
				}
				break;
			case "number":
				if (this.Scale > 0){
					$('#'+this.Id).attr("maxlength",this.Precision + 2);
				}else{
					$('#'+this.Id).attr("maxlength",this.Precision + 1);
				}
				break;
			case "date":
				$('#'+this.Id).attr("maxlength",10);
				//$( '#'+this.Id ).datepicker("destroy");
				$( '#'+this.Id ).datepicker();
				break;
		}
	}

	this.Format();

	//this.OnChangeFunc = onChangeFunc;
	this.OnChangeFunc = new Function();

	if ($('#'+this.Id).attr('bx-onChange') != undefined && $('#'+this.Id).attr('bx-onChange') != null && $('#'+this.Id).attr('bx-onChange') != ""){
		this.OnChangeFunc = new Function('curCtrl',$('#'+this.Id).attr('bx-onChange'));
	}

	this.ValidationFunc = onValidFunc;

	// Set onchange atribute to change value of control when changing on html

/*	if(this.GridRow != undefined && this.GridRow != null){
		if ($('#'+this.Id).attr("type") == "checkbox"){
			$('#'+this.Id).attr("onchange","if(this.checked==true){bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value('" + this.CheckTrue() + "');}else{bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value('" + this.CheckFalse() + "');};");
		}else{
			$('#'+this.Id).attr("onchange","bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value(this.value);");
		}
	}else{
		if ($('#'+this.Id).attr("type") == "checkbox"){
			$('#'+this.Id).attr("onchange","if(this.checked==true){bxF('" + this.Name() + "').Value('" + this.CheckTrue() + "');}else{bxF('" + this.Name() + "').Value('" + this.CheckFalse() + "');};");
		}else{
			$('#'+this.Id).attr("onchange","bxF('" + this.Name() + "').Value(this.value);");
		}
	}
*/

	if(this.GridRow != undefined && this.GridRow != null){
		if ($('#'+this.Id).attr("type") == "checkbox"){
			$('#'+this.Id).change(new Function("if(this.checked==true){bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value('" + this.CheckTrue() + "');}else{bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value('" + this.CheckFalse() + "');};"));
		}else{
			
			$('#'+this.Id).change(new Function("bxG('" + this.GridRow.Grid.Name() + "').RowById('" + this.GridRow.Id + "').ControlById('" + this.Id + "').Value(this.value);"));
		}
	}else{
		if ($('#'+this.Id).attr("type") == "checkbox"){
			$('#'+this.Id).change(new Function("if(this.checked==true){bxF('" + this.Name() + "').Value('" + this.CheckTrue() + "');}else{bxF('" + this.Name() + "').Value('" + this.CheckFalse() + "');};"));
		}else{

			$('#'+this.Id).change(new Function("bxF('" + this.Name() + "').Value(this.value);"));
		}
	}


	this.DefaultValue = function(){
		/*switch(this.DataType){
			case "text":
				return "";
			case "number":
				return 0;
			case "date":
				return "";
		}*/
		return "";
	}

	this.OldValue = this.DefaultValue();

	this.SelectedValue = this.DefaultValue();

	this.Value = function(val,bypass){
		if (val != null && val != undefined){
			if(bypass == null || bypass == undefined){
				bypass = false;
			}

			try{
				val = StandardValidation(val, this.DataType, this.Precision, this.Scale);
			}
			catch(e){
				$('#'+this.Id).val(this.OldValue);
				Error(e);
			}
			//this.OldValue = BufferValue(this);
			//BufferValue(this, 0, val);
			if(!bypass){
				if (this.GridRow != undefined && this.GridRow != null){
					if (this.GridRow.Status == 'D'){
						Error('No se puede modificar una linea eliminada.');
					}
					if (this.GridRow.Status == 'N' || this.GridRow.Status == 'I'){
						this.GridRow.Status = 'I';
					}else{
						this.GridRow.Status ='U';
					}
				}
			}
			if ($('#'+this.Id).prop('tagName') == 'DIV' || $('#'+this.Id).prop('tagName') == 'SPAN'){
				$('#'+this.Id).text(val);
			}else{
				if ($('#'+this.Id).attr("type") == "checkbox"){
					if(val == this.CheckTrue()){
						$('#'+this.Id).prop("checked",true);
					}else{
						$('#'+this.Id).prop("checked",false);
					}
				}else{
					$('#'+this.Id).val(val);
				}
			}
			this.Highligth(false);
			if(!bypass){
				if (this.IsField()){
					this.Form.HasChanged = true;
				}

				if(this.SubKey()){
					this.Form.SubKeyChanged = true;
				}
				if (this.ValidationFunc != null && this.ValidationFunc != undefined) {
					this.ValidationFunc.call();
				}
				if (this.OnChangeFunc != null && this.OnChangeFunc != undefined) {
					this.OnChangeFunc.call(null,this);
				}
			}
			this.OldValue = val;
			this.LoadDescr();
		}else{
			if ($('#'+this.Id).prop('tagName') == 'DIV' || $('#'+this.Id).prop('tagName') == 'SPAN'){
				return $('#'+this.Id).text();
			}
			if ($('#'+this.Id).prop('tagName') == 'SELECT' && $('#'+this.Id).val() == null){
				return '';
			}
			if ($('#'+this.Id).attr("type") == "checkbox"){
				if($('#'+this.Id).prop("checked")){
					return this.CheckTrue();
				}else{
					return this.CheckFalse();
				}
			}
			return $('#'+this.Id).val();
		}
	}

	this.ToService = function(){
		return ValueToService(this.Value(),this.DataType);
	}

	/*this.FromService = function(val){
		if (this.DataType == "date"){
			this.Value(ConvertDateFromSrv(val),true);
		}else{
			this.Value(val,true);
		}
	}*/

	this.Empty = function(){
		this.Value(this.DefaultValue(),true);
		this.OldValue = this.DefaultValue();
		this.SelectedValue = this.DefaultValue();
	}

	this.Tag = function(){
		return $('#' + this.Id);
	}

	this.Enable = function(b){
		if (b){
			//$('#' + this.Id).removeClass( "ui-state-disabled" );
			$('#' + this.Id).attr('disabled',false);
		}else{
			//$('#' + this.Id).addClass( "ui-state-disabled" );
			$('#' + this.Id).attr('disabled',true);
		}
	}

	this.Highligth = function(h){
		if (h){
			if ($('#'+this.Id).attr('type') == 'checkbox'){
				$('#'+this.Id).parent().css('background','red');
			}else{
				$('#'+this.Id).css('background','red');
			}

		}else{
			if ($('#'+this.Id).attr('type') == 'checkbox'){
				$('#'+this.Id).parent().css('background','none');
			}else{
				$('#'+this.Id).css('background','none');
			}
		}
	}
}


function LoadForm(idTagForm){
	var i = 0, j = 0;
	var idField = "";
	var idGrid = "";
	var objGrid = Object;

	//formulario root
	//ValidarAtribPkForm(idTagForm, -1);
	curForm = new BxForm(idTagForm);
	iniDataJson = '[{';

	$('#'+idTagForm).find('.bxCtrl').removeClass('bxIE');
	$('#'+idTagForm).find('.bxCtrl').removeClass('bxNotIE');

	if (navigator.appName == 'Netscape'){
		$('#'+idTagForm).find('.bxCtrl').addClass('bxNotIE');
	}else{
		$('#'+idTagForm).find('.bxCtrl').addClass('bxIE');
	}

	for (i = 0; i < $('#'+idTagForm).find('.bxCtrl').length; i++){
		idField = "";
		if ($('#'+idTagForm).find('.bxCtrl')[i].id == ""){
			idCounter++;
			$('#'+idTagForm).find('.bxCtrl')[i].id = String(idCounter);
		}
		idField = $('#'+idTagForm).find('.bxCtrl')[i].id;
		if ($('#'+idField).parentsUntil($('#'+idTagForm),'.bxGrid').length == 0){
			curForm.Controls.push(new BxCtrl(idField, curForm));
			if (i > 0){
				iniDataJson = iniDataJson + ','
			}
			//if (pkFormu.CamposPorId(idCampo).Tipo() == "numeroNeg" || pkFormu.CamposPorId(idCampo).Tipo() == "numero"){
			if (curForm.ControlById(idField).DataType == "number"){
				iniDataJson = iniDataJson + '"' + curForm.ControlById(idField).Name() + '":' + curForm.ControlById(idField).DefaultValue();
			}else{
				iniDataJson = iniDataJson + '"' + curForm.ControlById(idField).Name() + '":"' + curForm.ControlById(idField).DefaultValue() + '"';
			}
		}
	}
	/*******************************************/
	/******* Hacer la carga de Grillas *********/
	/*******************************************/
	for(i = 0; i < $('#'+idTagForm).find('.bxGrid').length; i++){
		idGrid = "";
		if ($('#'+idTagForm).find('.bxGrid')[i].id == ""){
			idCounter++;
			$('#'+idTagForm).find('.bxGrid')[i].id = String(idCounter);
		}
		idGrid = $('#'+idTagForm).find('.bxGrid')[i].id;
		objGrid = new BxGrid(idGrid, curForm);
		curForm.Grids.push(objGrid);

		if (iniDataJson != '[{'){
			iniDataJson = iniDataJson + ',';
		}
		iniDataJson = iniDataJson + '"' + objGrid.Name() + '":[{';

		idGridRow = "";
		if ($('#'+idGrid).find('.bxGridLine')[0].id == ""){
			idCounter++;
			$('#'+idGrid).find('.bxGridLine')[0].id = String(idCounter);
		}
		idGridRow = $('#'+idGrid).find('.bxGridLine')[0].id;
		objGridRow = new BxGridRow(idGridRow, objGrid);
		objGrid.Rows.push(objGridRow);

		for (j = 0; j < $('#'+idGridRow).find('.bxCtrl').length; j++){

			idField = "";
			if ($('#'+idGridRow).find('.bxCtrl')[j].id == ""){
				idCounter++;
				$('#'+idGridRow).find('.bxCtrl')[j].id = String(idCounter);
			}
			idField = $('#'+idGridRow).find('.bxCtrl')[j].id;
			objGridRow.Controls.push(new BxCtrl(idField, curForm, null, null, objGridRow));
			if (j > 0){
				iniDataJson = iniDataJson + ','
			}
			//if (pkFormu.CamposPorId(idCampo).Tipo() == "numeroNeg" || pkFormu.CamposPorId(idCampo).Tipo() == "numero"){
			if (objGridRow.ControlById(idField).DataType == "number"){
				iniDataJson = iniDataJson + '"' + objGridRow.ControlById(idField).Name() + '":' + objGridRow.ControlById(idField).DefaultValue();
			}else{
				iniDataJson = iniDataJson + '"' + objGridRow.ControlById(idField).Name() + '":"' + objGridRow.ControlById(idField).DefaultValue() + '"';
			}
		}

		iniDataJson = iniDataJson + ',"bxGridRowStatus":"N"}]';
	}

	iniDataJson = iniDataJson + '}]';

}



function ConfigDataTypes(types){
	var i = 0;
	var j = 0;
	for(i=0; i < curForm.Controls.length; i++){
		for(j=0; j < types.length; j++){
			if (types[j].name == curForm.Controls[i].Field()){
				curForm.Controls[i].DataType = ConvertDataType(types[j].type);
				curForm.Controls[i].Precision = parseInt(types[j].precision,10);
				curForm.Controls[i].Scale = parseInt(types[j].scale,10);
				curForm.Controls[i].Format();
				break;
			}
		}
	}
}


function InitForm(){

	curForm = Object;
	iniDataJson = '';
	idCounter = 0;
	var i = 0;

	//if ($('div.BxForm').length > 0){
	//	if ($('div.BxForm').length > 1){
	if ($('form.bxForm').length > 0){
		if ($('form.bxForm').length > 1){
			Error('No puede haber más de 1 form');
		}
		if ($('form.bxForm')[0].id == ""){
			idCounter++;
			$('form.bxForm')[0].id = String(idCounter);
		}

		LoadForm($('form.bxForm')[0].id);

		$( "#tabs" ).tabs();

	}

	for(i=0;i<curForm.Controls.length;i++){
		if (curForm.Controls[i].DescrServ() != undefined && curForm.Controls[i].DescrServ() != null && curForm.Controls[i].DescrServ() != "" && curForm.Controls[i].DescrCode() != undefined && curForm.Controls[i].DescrCode() != null && curForm.Controls[i].DescrCode() != ""){
			if (curForm.ControlByName(curForm.Controls[i].DescrCode()) != undefined && curForm.ControlByName(curForm.Controls[i].DescrCode()) != null){
				curForm.ControlByName(curForm.Controls[i].DescrCode()).DescrCtrls.push({name:curForm.Controls[i].Name(),service:curForm.Controls[i].DescrServ()});
			}
		}
	}

	for(g=0;g<curForm.Grids.length;g++){
		for(r=0;r<curForm.Grids[g].Rows.length;r++){
			myRow = curForm.Grids[g].Rows[r];
			myRow.SetDescrs();
		}
	}

}


function bxF(fieldName){
	if (fieldName != null && fieldName != undefined){
		return curForm.ControlByName(fieldName);
	}
	return curForm;
}

function bxG(gridName, gridRow, gridField){
	if(gridField != null && gridField != undefined){
		return curForm.GridByName(gridName).Rows[gridRow].ControlByName(gridField);
	}
	if(gridRow != null && gridRow != undefined){
		return curForm.GridByName(gridName).Rows[gridRow];
	}
	return curForm.GridByName(gridName);
}

function FillForm(servResults,mode,fillGrids){

	if (fillGrids == undefined || fillGrids == null){
		fillGrids = true;
	}

	var fillMode = 0;
	if (mode == 1 || mode == 2){
		fillMode = mode;
	}
	curForm.Empty(fillMode);
	if (fillMode == 1 || fillMode == 2){
		for(desc=0;desc<curForm.Controls.length;desc++){
			if(curForm.Controls[desc].Key()){
				curForm.Controls[desc].LoadDescr();
			}else{
				if(curForm.Controls[desc].SubKey() && fillMode == 2){
					curForm.Controls[desc].LoadDescr();
				}
			}
		}
	}

	if (servResults.length != 1){
		for(g=0;g<curForm.Grids.length;g++){
			curForm.Grids[g].Init();
		}
		return;
	}
	for(j=0;j<curForm.Controls.length;j++){
		if(curForm.Controls[j].IsField()){


			curForm.Controls[j].Value(servResults[0][curForm.Controls[j].Field()],true);
			curForm.Controls[j].SelectedValue = curForm.Controls[j].Value();
			if(j==4 && BxBtns.Service()=='MIRECIBO'){ //
				
				if(servResults[0][curForm.Controls[j].Field()] == 'OK' ){				
					//document.getElementById(6).style.backgroundColor = "lightgreen";
					document.getElementById(6).style.color = "green";
				}
				if(servResults[0][curForm.Controls[j].Field()].indexOf('Pendiente') >= 0){
					//document.getElementById(6).style.backgroundColor = "lightyellow";
					document.getElementById(6).style.color = "red";
				}
			}
		}
	}
	if (fillGrids){
		for(g=0;g<curForm.Grids.length;g++){
			curForm.Grids[g].Fill();
		}
	}
	curForm.HasChanged = false;
	curForm.SubKeyChanged = false;
}

function StandardSaveValidation()
{
	var reqs = false;
	for(icv=0;icv<curForm.Controls.length;icv++){
		control = curForm.Controls[icv];
		if (control.Req()){
			if(control.Value() == ''){
				control.Highligth(true);
				reqs = true;
			}
		}
	}

	for(icg=0;icg<curForm.Grids.length;icg++){
		grilla = curForm.Grids[icg];
		for(icgr=0;icgr<grilla.Rows.length;icgr++){
			fila = grilla.Rows[icgr];
			for(icgrc=0;icgrc<fila.Controls.length;icgrc++){
				control = fila.Controls[icgrc];
				if (fila.Status == 'D' || fila.Status == 'I' || fila.Status == 'U'){
					if (control.Req()){
						if(control.Value() == ''){
							control.Highligth(true);
							reqs = true;
						}
					}
				}
			}
		}
	}

	if(reqs){
		Error('Complete los campos requeridos');
	}
}



function BuildComboGrid(types, data){
	if (data.length == 0){
		return '';
	}
	//a = '<div style="max-height:' + $(window).height() * 0.50 + 'px;" id="bxGridComboDiv">';
	var a = '<table class="bxGridCombo">';
	a = a + '<tr class="bxGridComboHeader">';
	for(col=0;col<types.length;col++){

		a = a + '<td>' + types[col].name + '</td>';
	}
	a = a + '</tr>';
	for(row=0;row<data.length;row++){
		a = a + '<tr class="bxGridComboLine">';
		for(col=0;col<types.length;col++){
			a = a + '<td>' + data[row][types[col].name] + '</td>';
		}
		a = a + '</tr>';
	}
	a = a + '</table>';
	//a = a + '</div>';
	return a;
}


function BuildComboFields(types,parent){

	var in_wid = '100px';
	var a = '<table>';
	for(col=0;col<types.length;col++){
		a += '<tr>';
		if (types[col].precision > 50){
			in_wid = '300px';
		}else{
			if (types[col].precision > 25){
				in_wid = '200px';
			}
		}
		a += '<td>' + types[col].name + ':</td><td><input type="text" class="bxComboField" id="search_' + types[col].name + '" name="' + types[col].name + '" style="width:' + in_wid + ';"  bx-parentId="' + parent.Id + '"/></td>';
		a += '<td>'
		if(col==0){
			if (parent.GridRow != undefined && parent.GridRow != null){
				a += '<span class="bxSearchBtn" onclick="ComboDisplay(bxG(\''  + parent.GridRow.Grid.Name() + '\').RowById(\'' + parent.GridRow.Id + '\').ControlById(\'' + parent.Id + '\'),true);">Buscar</span>';
			}else{
				a += '<span class="bxSearchBtn" onclick="ComboDisplay(bxF(\'' + parent.Name() + '\'),true);">Buscar</span>';
			}
		}
		a += '</td>'
		a += '</tr>';
	}
	a += '</table>';
	return a;
}


function ComboDisplay(parentCtrl,rebuild){

	// Llamar al servicio y en el callback hacer lo siguiente:

	var params = [];

	if(rebuild){
		for(cmbs=0;cmbs<$('.bxComboField').length;cmbs++){
			if ($('.bxComboField')[cmbs].getAttribute('bx-parentId') == parentCtrl.Id){
				params.push(new BXParameter($('.bxComboField')[cmbs].name, $('.bxComboField')[cmbs].value));
			}
		}
	}

	BXData(parentCtrl.ComboServ(),params,function(){

		//var htmlFields = BuildComboFields

		var htmlFields = ''
		var htmlGrid = ''

		if(!rebuild){
			if (parentCtrl.GridRow != undefined && parentCtrl.GridRow != null){
				htmlFields = '<div onkeyup="if(event.keyCode == 13){ComboDisplay(bxG(\''  + parentCtrl.GridRow.Grid.Name() + '\').RowById(\'' + parentCtrl.GridRow.Id + '\').ControlById(\'' + parentCtrl.Id + '\'),true);};">'
			}else{
				htmlFields = '<div onkeyup="if(event.keyCode == 13){ComboDisplay(bxF(\'' + parentCtrl.Name() + '\'),true);};">'
			}
			htmlFields += BuildComboFields(this.ResultType, parentCtrl);
			htmlFields += '</div>'
		}

		var htmlGrid = BuildComboGrid(this.ResultType, this.Results);

		//$( "#comboDialog" ).html(htmlGrid);
		if(!rebuild){
			$( "#comboDialog" ).html('<div>' + htmlFields +  '</div>' + '<div style="max-height:' + $(window).height() * 0.50 + 'px;overflow-y:scroll;overflow-x:auto;" id="bxGridComboDiv">' + htmlGrid + '</div>');
		}else{
			$( "#bxGridComboDiv" ).html(htmlGrid);
		}

		$(".bxSearchBtn").button()

		if(parentCtrl.Tag().attr('disabled') == undefined){
			$('table.bxGridCombo tr').click(parentCtrl, function(e){
		
					e.data.Value(this.getElementsByTagName('td')[0].innerText);
					$( "#comboDialog" ).dialog( "close" );
			});
		}


		if(!rebuild){
			$( "#comboDialog" ).dialog( "option", "width", 500 );
			$( "#comboDialog" ).dialog( "open" );
		}
	},undefined);

}



function ValueToService(val,val_type){
	if (val_type == "date"){
		return ConvertDateToSrv(val);
	}
	return val;
}


function Error(msg, explain){
    $("#errorDialog p.bxMsg").text(msg);
    $("#errorDialog p.bxExplain").text('');
    $("#errorDialog p.bxExplain").css('display','none');
    if (explain != null && explain != undefined && explain != ''){
		$( "#errorDialog p.bxExplain" ).text(explain);
		$("#errorDialog").dialog("option", "buttons",[
					{
						text: "Detalles",
						click: function() {
							if ($("#errorDialog p.bxExplain").css('display') == 'none'){
								$("#errorDialog p.bxExplain").css('display','block');
							}else{
								$("#errorDialog p.bxExplain").css('display','none');
							}
						}
					},
					{
						text: "Ok",
						click: function() {
							$( this ).dialog( "close" );
						}
					}
				]);
	}else{
		$("#errorDialog").dialog("option", "buttons",[
					{
						text: "Ok",
						click: function() {
							$( this ).dialog( "close" );
						}
					}
				]);
	}

    $( "#errorDialog" ).dialog( "open" );

	if (curForm != Object){
		if (!curForm.Enabled){
			EnableForm();
		}
	}

    throw msg;
}

function Question(msg, onYes, onNo, onYesParam, onNoParam){

	$("#questionDialog").dialog('option','title','Pregunta');
	$( "#questionDialog p" ).text(msg);
	$("#questionDialog").dialog("option", "buttons",[
		{
		  text: "Sí",
		  icons: {
			primary: "ui-icon-check"
		  },
		  click: function() {
			$( this ).dialog( "close" );
			if (onYes != null && onYes != undefined){
				onYes.call(onYesParam);
			}
		  }
		},
		{
		  text: "No",
		  icons: {
			primary: "ui-icon-close"
		  },
		  click: function() {
			$( this ).dialog( "close" );
		  	if (onNo != null && onNo != undefined){
				onNo.call(onNoParam);
			}
		  }
		}]
	);
	$( "#questionDialog" ).dialog( "open" );
}

function Msg(msg){

	$("#questionDialog").dialog('option','title','Mensaje');
	$( "#questionDialog p" ).text(msg);
	$("#questionDialog").dialog("option", "buttons",[
		{
		  text: "Ok",
		  click: function() {
			$( this ).dialog( "close" );
		  }
		}]
	);
	$( "#questionDialog" ).dialog( "open" );
}



function EliminarLista(){

	var fila;
	for(ir=bxG('grillaEmp').Rows.length-1;ir>=0;ir--){
		fila = bxG('grillaEmp').Rows[ir];
		if (fila.Status != 'D' && fila.Status != 'E'){
			bxG('grillaEmp').DelRow(fila.Id);
		}
	}

}
