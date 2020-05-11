$(document).ready(function(){
	$("div.bxBtns").load('/buxis/Partials/BxBtns.html',{ limit: 25 });
	cargarListadoSolicitudes();
	//verificarNavegadorQueSeEstaUtilizando();
	//verificarSiHRdebeGenerarVacaciones();
	//cambiarClaseHeaderBuxis();


	//$('span[name="btnImprimirSolicitud"]').attr("style", "font-size:20px");
});

const urlDescargarFileID = window.location.origin+"/Buxis/Partials/Asp/DownloadVac.asp?FileID="; 


/* ***************************************************************************************************************************************** */
/* ***************************************************************************************************************************************** */
/* CARGA DE GRILLA DE SOLICITUDES ***************************************************************************************************** */
	function selectMiFormVac_LOAD(){
		/* 0) Realiza precarga de datos*/
			let periodo = GetDateFromStr(bxF('periodo').Value());;
			let hoy = new Date();
			let anioPeriodo = parseInt(periodo.getFullYear());
			let licenciaAnual = anioPeriodo.toString() + ' / ' + (anioPeriodo + 1).toString();
			//let licenciaAnual =  (anioPeriodo + 1).toString();
			bxF('licenciaAnual').Value(licenciaAnual);
			bxF('fecha_hoy').Value(FormatDateToStr(hoy));
		/* 2) Obtener de la solicitudes del periodo seleccionado*/
			//cargarListadoSolicitudes();
			//alert("periodo: " + FormatDateToStr(periodo));
			//llenarGrilla(anioPeriodo);
		/* 3) mostrar  u ocultar elementos de la grilla de solicitudes*/ 
			mostrarElementos(false);
	}

	function mostrarElementos(mostrar){
		//document.getElementsByName("frmEnviarSolicitud")[0].style["display"] = "none";

		var frmTituloGrillaSolicitudes = document.getElementsByName("frmTituloGrillaSolicitudes")[0];
		var frmSubTituloGrillaSolicitudes = document.getElementsByName("frmSubTituloGrillaSolicitudes")[0];
		var frmVerIntructivoPoliticas = document.getElementsByName("frmVerIntructivoPoliticas")[0];
		var frmHistorialSolicitudes = document.getElementsByName("frmHistorialSolicitudes")[0];
		var frmEnviarSolicitud = document.getElementsByName("frmEnviarSolicitud")[0];

		frmTituloGrillaSolicitudes.style["display"] = "";
		frmSubTituloGrillaSolicitudes.style["display"] = "";
		frmVerIntructivoPoliticas.style["display"] = "";
		frmHistorialSolicitudes.style["display"] = "";
		frmEnviarSolicitud.style["display"] = "none";

		if(mostrar == false){
			frmTituloGrillaSolicitudes.style["display"] = "none";
			frmSubTituloGrillaSolicitudes.style["display"] = "none";
			frmVerIntructivoPoliticas.style["display"] = "none";
			frmHistorialSolicitudes.style["display"] = "none";
			frmEnviarSolicitud.style["display"] = "";
		}
	}

	function crearElemento_InputText(name){
		let inputBox = document.createElement("label");
		inputBox.setAttribute("type", "text");
		inputBox.setAttribute("readonly", "");
		inputBox.setAttribute("name", name);
		//inputBox.setAttribute("class", "ui-widget ui-widget-content");
		// inputBox.class = "bxCtrl ui-widget ui-widget-content";
		
		return inputBox;
	}

	/*ID, COD_MF, PERIODO, COD_EMP
			, FEC_INI, DIAS, FEC_FIN
			, FEC_PEDIDO, ESTADO, FEC_ULT_MODIF*/

	function cargarListadoSolicitudes(){
		var srvNombre = "CITI.MIFORMVAC2.HISTORIAL.SEL";
		var fila = 0;

		var frmTituloGrillaSolicitudes = document.getElementsByName("frmTituloGrillaSolicitudes")[0];
		var frmSubTituloGrillaSolicitudes = document.getElementsByName("frmSubTituloGrillaSolicitudes")[0];


		try {	
			var srvParams = [];
			BXData(srvNombre, srvParams, function(){
				var cantResultados = this.Results.length;
				
				if (cantResultados > 0){
					frmTituloGrillaSolicitudes.textContent = "Historial de solicitudes generadas";
					frmSubTituloGrillaSolicitudes.textContent = obtenerMensajeResultado(cantResultados);
					
					ConfigDataTypes(this.ResultType);
					for (i=0; i<cantResultados; i++){
						// genera un fila de por cada elemento de la lista de Solicitudes = this.Results[];
						fila = fila + 1;
						agregarFila(this.Results[i], fila);
					}
				} else {
					frmTituloGrillaSolicitudes.textContent = "Aún no tiene solicitudes generadas";
				}

			}, this);		
		} catch(e) {
			mensajeError = e.message 	  
			alert( mensajeError.substr(0,30) )	
		}
	}

	function agregarFila(objSolicitud, fila) { 
		fila = fila + 1
		let grdHistorialSolicitudes = document.getElementsByName("grdHistorialSolicitudes")[0];

		var arrHead = new Array(); 
		arrHead = [ "IDSOLICITUD", "FECHASOLICITUD", "ANIOPERIODO", "FECHAINICIO", "CANTDIAS", "FECHAFIN", "ESTADO", "ACCION" ];
		let grdTabla = grdHistorialSolicitudes
	 
		let rowCnt = grdTabla.rows.length; // GET TABLE ROW COUNT. 
		let tr = grdTabla.insertRow(rowCnt); // TABLE ROW. 
		tr = grdTabla.insertRow(rowCnt); 
		//diseño de grilla 
			if (fila % 2 == 1){	
				tr.style = "background-color: #F9FBFB;border-top: solid; border-bottom: solid; border-color: white; height: 35px";
			}else{
				tr.style = "background-color: #F2FEFE;border-top: solid; border-bottom: solid; border-color: white; height: 35px";
			}
			tr.onmouseover=function(){
				this.style = "background-color: #acdede;border-top: solid; border-bottom: solid; border-color: white; height: 35px"
				}; 
			tr.onmouseout=function(){
				if (fila % 2 == 1){	
					this.style = "background-color: #F9FBFB;border-top: solid; border-bottom: solid; border-color: white; height: 35px";
				}else{
					this.style = "background-color: #F2FEFE;border-top: solid; border-bottom: solid; border-color: white; height: 35px";
				}
			}; 		


		let cantTotalColumnas = arrHead.length; 
		for (let nroColumna = 0; nroColumna < cantTotalColumnas; nroColumna++) { 

			let td = document.createElement('td'); // TABLE DEFINITION. 
			td = tr.insertCell(nroColumna); 
			// 2) Si es la última columna agregar botón de cancelar e imprimir
			let idEstadoSolicitud = objSolicitud["IDESTADOSOLICITUD"];
			if(nroColumna == (cantTotalColumnas-1)){
				// 2.1) Obtener nro de solicitud por fila y estado
				var idSolicitud = objSolicitud["IDSOLICITUD"];
				var urlImprimir = urlDescargarFileID + idSolicitud;
				
				idEstadoSolicitud = idEstadoSolicitud.toUpperCase().trim();

				//alert("estadoSolicitud: " + estadoSolicitud);
					if (idEstadoSolicitud != "P"){ // PENDIENTE
						// td.appendChild(null);
						//alert("estadoSolicitud != PENDIENTE---- " + estadoSolicitud);
					} else {
						// 2.2) Cargar configuraciones del botón: Cancelar
							let btnCancelar = document.createElement("a"); // a=anchor
							btnCancelar.setAttribute("type", "button"); 
							btnCancelar.setAttribute("class", "btn btn-danger"); 
							btnCancelar.setAttribute("title", "Cancelar Solicitud"); 
							btnCancelar.setAttribute("onclick", "cancelarSolicitud("+idSolicitud+")"); 
							btnCancelar.setAttribute("value", idSolicitud);
							//btnCancelar.style.height = "16px";  
							let icon = document.createElement("span");
							icon.className = "glyphicon glyphicon-remove";
							//icon.style ="font-size:10px";
							btnCancelar.appendChild(icon);
							td.appendChild(btnCancelar);
						// 2.3) Cargar configuraciones del botón: Imprimir
							let btnImprimir = document.createElement('a'); 
							btnImprimir.setAttribute('type', 'button'); 
							btnImprimir.setAttribute('class', 'btn btn-primary'); 
							btnImprimir.setAttribute('title', 'Re-imprimir Solicitud'); 
							btnImprimir.setAttribute('href',urlImprimir); 
							//btnImprimir.style.height = "16px";  
							let iconImprimir = document.createElement("span");
							iconImprimir.className = "glyphicon glyphicon-print";
							//iconImprimir.style ="font-size:10px";
							btnImprimir.appendChild(iconImprimir);
							
							
							td.style.textAlign = "center";	
							td.appendChild(btnImprimir);
							
					}
				
			} else {
				// 3) Cargar con los datos informados por parámetro
					let nombreElemento = arrHead[nroColumna] + "_" + "1"//contadorIteracion;
					let nuevoElemento = crearElemento_InputText(nombreElemento);
					nuevoElemento.setAttribute("align","center"); 
					//nuevoElemento.value = objSolicitud[arrHead[nroColumna]];
					contenido = objSolicitud[arrHead[nroColumna]];
					nuevoElemento.innerHTML  = contenido;				
					if (idEstadoSolicitud == "C"){	
						nuevoElemento.style.color = "darkred";//"red";
					}
					if (idEstadoSolicitud == "R"){	
						nuevoElemento.style.color = "red";
					}
					if (idEstadoSolicitud == "A"){
						nuevoElemento.style.color = "green";
					}
					
					td.align = "center";
					td.appendChild(nuevoElemento); 
					
			}

		} 
	} 
/* VALIDACIONES DE FORMULARIO DE SOLICITUD ************************************************************************************************ */
	///function soloNros(event){
	///	return event.charCode >= 48 && event.charCode <= 57;
	///}

	function calcularRespuestaJS(){
		// 0) Obtener controles de la página
		let respuestaCalculoJSError	= document.getElementsByName("msgError")[0];
		let msgFechaFin 	= document.getElementsByName("msgFechaFin")[0];
		let solFechaInicio 	= document.getElementsByName("solFechaInicio")[0];
		let solFechaFin 	= document.getElementsByName("solFechaFin")[0];
		let solCantDias 	= document.getElementsByName("solCantDias")[0];

		var datepartD = solFechaInicio.value.split("/");
		var datepartF = solFechaFin.value.split("/");
		var fechaInicioD = new Date(+datepartD[2],datepartD[1]-1,+datepartD[0]);
		var fechaFinD = new Date(+datepartF[2],datepartF[1]-1,+datepartF[0]);
	
		//var fechaInicioD = new Date(formatDate(solFechaInicio.value))
		//var fechaFinD = new Date(formatDate(solFechaFin.value));

		let periodo = GetDateFromStr(bxF('periodo').Value());;
		let anioPeriodo = parseInt(periodo.getFullYear());
		

		msgFechaFin.style["display"] = "none";
		respuestaCalculoJSError.style["display"] = "none";
		// 1) Verificar si no están vacíos
		if (solFechaFin.value == null || solFechaFin.value == ""){			
			solCantDias.value = "";
			return false;
		}
		if (solFechaInicio.value == null || solFechaInicio.value  == ""){
			solCantDias.value = "";
			return false;
		}
		// if(isNaN(fechaInicioD) || isNaN(fechaFinD) || fechaInicioD.getFullYear() < 2019 || fechaFinD.getFullYear() < 2019)
		if(isNaN(fechaInicioD) || isNaN(fechaFinD)){
			solCantDias.value = "";
			return false;
		}
		if (datepartD[2] == fechaInicioD.getFullYear() && datepartD[1] - 1 == fechaInicioD.getMonth() 
			&& datepartD[0]  == fechaInicioD.getDate() ){

			//TODO OK
		}else{			
			mensaje = "Verifíque la Fecha de Inicio";
			respuestaCalculoJSError.style["display"] = "";
			respuestaCalculoJSError.innerText = mensaje;
			solCantDias.value = "";
			return false;
		}

		if (datepartF[2] == fechaFinD.getFullYear() && datepartF[1] - 1 == fechaFinD.getMonth()  
			&& datepartF[0]  == fechaFinD.getDate() ){

		}else{			
			mensaje = "Verifíque la Fecha de Fin";
			respuestaCalculoJSError.style["display"] = "";
			respuestaCalculoJSError.innerText = mensaje;
			solCantDias.value = "";
			return false;
		}		
		// 2) verificar si la fecha es válida
		if(fechaInicioD.getFullYear() < 2019 || fechaFinD.getFullYear() < 2019 || fechaInicioD.getFullYear() > 20230 || fechaFinD.getFullYear() > 20230){
			solCantDias.value = "";
			return false;
		}
		/*if(fechaInicioD.getFullYear() < anioPeriodo || fechaFinD.getFullYear() < anioPeriodo || 
			fechaInicioD.getFullYear() > anioPeriodo+1 || fechaFinD.getFullYear() > anioPeriodo+1){
			mensaje = "las fechas solicitadas están fuera del periodo vacacional que está por solicitar";
			respuestaCalculoJSError.style["display"] = "";
			respuestaCalculoJSError.innerText = mensaje;
			return false;
		}*/
		//if(!isValidDate(solFechaInicio.value)){
		if(!isValidDate(fechaInicioD)){
			mensaje = "la fecha de inicio no es válida";
			respuestaCalculoJSError.style["display"] = "";
			respuestaCalculoJSError.innerText = mensaje;
			solCantDias.value = "";
			return false;
		}
		//if(!isValidDate(solFechaFin.value)){
		if(!isValidDate(fechaFinD)){
			mensaje = "la fecha de fin no es válida";
			respuestaCalculoJSError.style["display"] = "";
			respuestaCalculoJSError.innerText = mensaje;
			solCantDias.value = "";
			return false;
		}
		// 3) validar con Buxis-Webtools
			var hayError = false;
				
			var srvParams = [];
				//srvParams.push(new BXParameter("FEC_INI",solFechaInicio.value));
				srvParams.push(new BXParameter("FEC_INI",formatDate(fechaInicioD)));
				srvParams.push(new BXParameter("FEC_FIN",formatDate(fechaFinD) ));
				srvParams.push(new BXParameter("PERIODO",bxF('periodo').Value() ));
				srvParams.push(new BXParameter("INS",0 ));


				BXScript("CITI.MIFORMVAC2.CHK",srvParams, function(resultado_ChkSolicitud){
					var resultado_ChkSolicitud = 0; 
					var validacion_ChkSolicitud = ''; 
					resultado_ChkSolicitud = this.Results[0]["RESULTADO"];
					validacion_ChkSolicitud = this.Results[0]["CHK"];

					if(validacion_ChkSolicitud != "OK"){

						respuestaCalculoJSError.style["display"] = "";
						respuestaCalculoJSError.innerText = validacion_ChkSolicitud;//MOSTRAR MENSAJE EN ROJO
						solCantDias.value = "";
					}else{
						if (typeof this.Results[0]["FEC_FIN"] !== 'undefined'){
							let mensaje = "     Fecha Hasta: " + this.Results[0]["FEC_FIN"];

							msgFechaFin.style["display"] = "";
							msgFechaFin.innerText = mensaje;				
						}
						
						respuestaCalculoJSError.style["display"] = "none";
						respuestaCalculoJSError.innerText = "";
						solCantDias.value = resultado_ChkSolicitud;	
					}
				});
	}

/* ***************************************************************************************************************************************** */
 
	//$('input[name="solFechaInicio"]').onfocusout(function (event){
	//	let solFechaInicio 	= document.getElementsByName("solFechaInicio")[0].value;
	//	solFechaInicio.value;
	//})

	$('span[name="btnImprimirSolicitud"]').keydown(function (event){
		if ((event.keyCode) && (event.keyCode == 13))
			this.click();
	})

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return [year, month, day].join('-');
	}

	function isValidDate(dateString) {
		dateString = getDate_DDMMYYY(dateString); 
		let patternString = "^\d{1,2}[-.\/]\d{1,2}[-.\/]\d{4}$";//"/^\d{4}-\d{2}-\d{2}$/;
		//let re = new RegExp(patternString); //'pattern' 'i' -> ignoreCase
		let re = /^\d{1,2}[-./]\d{1,2}[-./]\d{4}$/;
		if(!re.test(dateString)) return false;  // Invalid format
		//var d = new Date(dateString.toString());
		//var dNum = d.getTime();
		//if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
		//return d.toISOString().slice(0,10) === dateString;
		return true;
	}

	
	/*function getDate_DDMMYYY(d) {
		let month = String(d.getMonth() + 1);
		let day = String(d.getDate());
		const year = String(d.getFullYear());

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return `${day}/${month}/${year}`;
	}*/
	

	function getDate_DDMMYYY(inputFormat) {
	  function pad(s) { return (s < 10) ? '0' + s : s; }
	  var d = new Date(inputFormat)
	  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
	}
/* ***************************************************************************************************************************************** */
/* ***************************************************************************************************************************************** */
/* UTILITARIO DE FECHAS ******************************************************************************************************************* */
	function actualizarFechaHasta(){
		// 0) Obtener controles de la página
		let solFechaInicio 	= document.getElementsByName("solFechaInicio")[0];
		let solFechaFin 	= document.getElementsByName("solFechaFin")[0];
		let solCantDias 	= document.getElementsByName("solCantDias")[0];

		solFechaFin.style["display"] = "none";
		// 1) Verificar si no están vacíos
		if (solCantDias.value == null || solCantDias.value == "")
			return false;

		if (solFechaInicio.value == null || solFechaInicio.value  == "")
			return false;

		// 2) Verificar si son valores válidos
		let cantDias = 0;
			cantDias = parseInt(solCantDias.value);

		let fechaInicio = stringToDate(solFechaInicio.value,"yyyy-MM-dd","-");

		//if((!(cantDias>0)) || fechaInicio < fecha_hoy)
		//	return false;
		
		solFechaFin.style["display"] = "";
		solFechaFin.innerText = dateToString(AddDaysToDate(fechaInicio, cantDias), "-");
		// solFechaFin.innerText = "fechas//";

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


	function stringToDate(_date,_format,_delimiter) {
		var formatLowerCase=_format.toLowerCase();
		var formatItems=formatLowerCase.split(_delimiter);
		var dateItems=_date.split(_delimiter);
		var monthIndex=formatItems.indexOf("mm");
		var dayIndex=formatItems.indexOf("dd");
		var yearIndex=formatItems.indexOf("yyyy");
		var month=parseInt(dateItems[monthIndex]);
		month-=1;
		var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
		return formatedDate;
	}

	function dateToString(_date,_delimiter) {
		var day = _date.getDate();
		var mon = _date.getMonth() + 1;
		var year = _date.getFullYear();
		return strPadLeft(String(day),'0',2) + _delimiter + strPadLeft(String(mon),'0',2) + _delimiter + String(year)
	}

	function obtenerMensajeResultado(cantResultados) {
		let msgCantResultados = null;
		switch (cantResultados) {
			case 0:
				msgCantResultados = "Sin resultados";
				break;
			case 1:
				// msgCantResultados = String.format("%d resultado", cantResultados);
				msgCantResultados = cantResultados + " resultado";
				break;
			default:
				msgCantResultados = cantResultados + " resultados";
				break;
		}
		return msgCantResultados;
	}
/* ***************************************************************************************************************************************** */
/* ***************************************************************************************************************************************** */
/* FUNCIONALIDADES DE LOS BOTONES *************************************************************************************************** */
	function cancelarSolicitud(idSolicitud){
		var mensajeCancelarSolicitud = 	"" +
			"<h7>" +
			"	<h6>" +
			"	<b>¿Desea cancelar la solicitud número: <mark> "+idSolicitud+" </mark>?</b>" +
			"	</h6>" +
			//"	<br>"+
			"		El formulario de esta solicitud perderá su validez " +
			"	<br>"+
			"</h7>";

		Question(mensajeCancelarSolicitud, function(){
			//mostrarMensajeCarga("Cancelando la solicitud");
			cambiarEstadoSolicitud_Cancelado(idSolicitud);

		});
		document.getElementById("questionDialog").innerHTML = mensajeCancelarSolicitud;
	}

	function mostrarMensajeCarga(mensaje){
		var w = window.open('','','width=100,height=100');
		w.document.write(mensaje);
		w.focus();
		setTimeout(function() {w.close();}, 3000);
	}

	function cambiarEstadoSolicitud_Cancelado(idSolicitud){
		var srvNombre = "CITI.MIFORMVAC2.UPD.CANCELAR_SOLICITUD";
		try {	
			var srvParams = [];
		
			srvParams.push(new BXParameter("IDSOLICITUD", idSolicitud));
			BXScript(srvNombre, srvParams, function(){
				msgRespuesta = "msgRespuesta: " + this.Results[0]["msgRespuesta"];
				//alert(msgRespuesta);
			});

			mensaje = "Éxito: la solicitud número: "+idSolicitud+" fue cancelada"; 
			//alert(mensaje);	
			//setTimeout(location.reload(true),3000);
			volverAlListado();
		} catch(e) {
			mensajeError = e.message 	 
			hayError = true
			alert( mensajeError.substr(0,30) )	
		}
	}

	function recargarGrillaPrincipal(){
		FormSearch();
		frmTituloGrillaSolicitudes.style["display"] = "";	
		frmHistorialSolicitudes.style["display"] = "";
		frmEnviarSolicitud.style["display"] = "none";				
	}

	function confirmarEnvioDeSolicitud(){
		var mensajeConfirmarSolicitud = "" +
			"<h6>" +
			"	<b>¿Confirma la <ins>generación e impresión</ins> del formulario de vacaciones?</b>"  +
			"	<br>" +
			"</h6>";									

		Question(mensajeConfirmarSolicitud, function(){
			//DescargarDatos(bxF().Controls[0].OldValue);
			imprimirGenerarPDFSolicitud();
			
		});
		document.getElementById("questionDialog").innerHTML = mensajeConfirmarSolicitud;
	}

	function imprimirGenerarPDFSolicitud(){
		
		var solFechaInicio 	= document.getElementsByName("solFechaInicio")[0].value;
		var solFechaFin 	= document.getElementsByName("solFechaFin")[0].value;
		let solCantDias 	= document.getElementsByName("solCantDias")[0].value;
		let msgError		= document.getElementsByName("msgError")[0];

		var chkAdelantoSolicitado = document.getElementsByName("chkAdelantoSolicitado")[0].checked;
		var solicitaAdelanto = "N";	

		var datepartD = solFechaInicio.split("/");
		var datepartF = solFechaFin.split("/");
		var fechaInicioD = new Date(+datepartD[2],datepartD[1]-1,+datepartD[0]);
		//var fechaInicioD = new Date(formatDate(solFechaInicio.value))
		
		var fechaFinD = new Date(+datepartF[2],datepartF[1]-1,+datepartF[0]);
		if (solCantDias == 0 || solCantDias == '') {
			msgError.style["display"] = "";
			solCantDias = "";
			return false;
		};

		if (chkAdelantoSolicitado){
			solicitaAdelanto = "S";
		}else
			solicitaAdelanto = "N";

		var hayError = false;
		var srvParams = [];
			//srvParams.push(new BXParameter("FEC_INI",stringToDate(solFechaInicio.value,"yyyy-MM-dd","-") ));
			srvParams.push(new BXParameter("FEC_INI",formatDate(fechaInicioD)));
			srvParams.push(new BXParameter("FEC_FIN",formatDate(fechaFinD)));
			srvParams.push(new BXParameter("CNT_DIAS",solCantDias ));
			srvParams.push(new BXParameter("PERIODO",bxF('periodo').Value()));
			srvParams.push(new BXParameter("ADELANTO",solicitaAdelanto));
			srvParams.push(new BXParameter("INS",1));

			BXScript("CITI.MIFORMVAC2.CHK",srvParams, function(resultado_IdSolicitud){
				var resultado_IdSolicitud = 0;
				var resultado_ChkSolicitud = 0; 
				var validacion_ChkSolicitud = ''; 
				resultado_ChkSolicitud = this.Results[0]["RESULTADO"];
				validacion_ChkSolicitud = this.Results[0]["CHK"]; 

				if(validacion_ChkSolicitud != "OK"){
					msgError.style["display"] = "";
					msgError.innerText = validacion_ChkSolicitud;//MOSTRAR MENSAJE EN ROJO
					solCantDias = "";
				}else{
					resultado_IdSolicitud = this.Results[0]["RESULTADO"];
					if(resultado_IdSolicitud > 0){
						//url = window.location.origin+'/Buxis/Partials/Asp/DownloadVac.asp?FileID='+resultado_IdSolicitud;
						window.location.href=urlDescargarFileID+resultado_IdSolicitud;
						mensaje = "Se generó la solicitud con ID: " + resultado_IdSolicitud;
						msgBoxRecargarOK(mensaje);
					}
				}
			});	
	}

	function volverAlListado() {
		mostrarElementos(true);
		FormSearch();
		location.reload(true);
	}

	function openInNewTab(url) {
		var win = window.open(url, '_blank');
		//win.focus();
	}

	
	function verIntructivoPoliticas(url) {
		// Ejemplo de conexión a WebTools--> BXScript(srvNombre, [], null, null, function(){null;});
		// 0) Definir el nombre del servicio a llamar y su 'array' de parámetros
		var srvNombre = "CITI.MIFORMVAC2.urlPoliticasVacacion";
		var srvParams = [];
		// 1) Abrir un try-catch
			try {	
				// 2) Ejecutar la WebTools de tipo: Script o Data con prefijo "BX"
				BXScript(srvNombre, srvParams, function(){
					// 3) Si hay resultados, se los muestra con [fila][nombreColumna]
					var cantResultados = this.Results.length;
					if (cantResultados > 0){						
						ConfigDataTypes(this.ResultType);
						for (i=0; i<cantResultados; i++){
							var rs = this.Results[i]; // ResultSet
						}

						let urlPoliticas = rs["urlPoliticas"]; 
						openInNewTab(urlPoliticas);	
					} else {
						let urlPoliticas = "https://cedt-confluence.nam.nsroot.net/confluence/display/C145995A/Solicitud+de+Vacaciones";
						openInNewTab(urlPoliticas);		
					}
				}, this);
			} catch(e) {
				mensajeError = e.message 	  
				alert( mensajeError.substr(0,30) )	
			}

	}


	function verificarSiHRdebeGenerarVacaciones() {
		// Para los ingresos que aún no tiene las vacaciones generadas, le saldrá un aviso de que HR debe generarlas
		// 0) Definir el nombre del servicio a llamar y su 'array' de parámetros
		var srvNombre = "CITI.MIFORMVAC2.hrGeneroVacaciones";
		var srvParams = [];
		// 1) Abrir un try-catch
			try {	
				// 2) Ejecutar la WebTools de tipo: Script o Data con prefijo "BX"
				BXScript(srvNombre, srvParams, function(){
					// 3) Si hay resultados, se los muestra con [fila][nombreColumna]
					var cantResultados = this.Results.length;
					if (cantResultados > 0){						
						ConfigDataTypes(this.ResultType);
						for (i=0; i<cantResultados; i++){
							var rs = this.Results[i]; // ResultSet
						}

						let mensaje = rs["mensaje"];
						if(mensaje!="" && mensaje!="OK")
							msgBoxRecargarOKbtn(mensaje);
					} else {
						let mensaje = 	"" +
							"<h7>" +
							"	<strong>Aún no se realizó el cálculo de sus vacaciones. Contáctese con el área de RRHH</strong>" +
							"</h7>";	
						msgBoxRecargarOKbtn(mensaje);
					}
				}, this);
			} catch(e) {
				mensajeError = e.message 	  
				alert( mensajeError.substr(0,30) )	
			}

	}


	function msgBoxRecargarOKbtn(mensaje){
		
		msgBoxAvisoBuxis(mensaje, null);
		$("#questionDialog").dialog("option", "buttons",[
			{
				text: "OK",
				click: function() {
				location.reload(true);
			  }
			}]
		);
	}
	function verificarNavegadorQueSeEstaUtilizando(){
		// INTERNET EXPLORER
		// Internet Explorer 6-11
		//var isIE = /*@cc_on!@*/false || !!document.documentMode; || isIE

		if (navigator.userAgent.indexOf("MSIE") != -1 ) {
			let mensaje = "Esta funcionalidad no es compatible con InternetExplorer. Por favor pruebe en otro navegador";
			msgBoxAvisoBuxis(mensaje, null);
			alert(mensaje);
		}
		// CHROME
		if (navigator.userAgent.indexOf("Chrome") != -1 ) {
			console.log("Google Chrome");
		}
		// FIREFOX
		else if (navigator.userAgent.indexOf("Firefox") != -1 ) {
			console.log("Mozilla Firefox");
		}
	}
	function msgBoxRecargarOK(){
		var mensaje = 	"" +
			"<h7>" +
			"	<strong>Su solicitud de vacaciones fue generada exitosamente</strong>" +
			"	<br><br>" +
			//"	<small>" +
			"		Desde ya agradecemos su colaboración para hacernos llegar firmado el mismo a HRSS Payroll. " +
			"		<br><br>" +
			"		Le recordamos que los medios para entregarlo son los siguientes: " +
			"		<ul>" +
			"			<li><b>•</b>	Buzón de Citicenter ubicado en Planta Baja – Fase II</li>" +
			"			<li><b>•</b>	Por correo interno a Citicenter – Planta baja – Fase II – HRSS Payroll </li>" +
			"		</ul>" +
			//"		Una vez que haya entregado el formulario firmado, le sugerimos estar atento al estado de su solicitud en la pantalla principal de vacaciones" +
			//"	</small>" +
			"</h7>";
		msgBoxAvisoBuxis(mensaje, null);
		$("#questionDialog").dialog("option", "buttons",[
			{
				text: "OK",
				click: function() {
				//volverAlListado();
				location.reload(true);
			  }
			}]
		);
	}

