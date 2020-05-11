function soloNros(e) {
	key = e.keyCode || e.which;
	teclado = String.fromCharCode(key);
	numeros = "0123456789";
	teclasEspeciales = "8-37-38-46";

	tecla_especial = false;

	for ( var i in teclasEspeciales) {
		if (key == teclasEspeciales[i]) {
			tecla_especial = true;
		}
	}
	if (numeros.indexOf(teclado) == -1 && !tecla_especial) {
		return false;
	}
}

function soloLetras(e) {
	key = e.keyCode || e.which;
	teclado = String.fromCharCode(key).toLowerCase();
	letras = "áéíóú abcdefghijklmnñopqrstuvwxyz";
	teclasEspeciales = "8-37-38-46-164";

	tecla_especial = false;

	for ( var i in teclasEspeciales) {
		if (key == teclasEspeciales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(teclado) == -1 && !tecla_especial) {
		return false;
	}
}

function checkSubmit(e) {
	// e.preventDefault();
	if (e && e.keyCode == 13) {
		document.forms[0].submit();
		// this.click();
	}
};

function validarFecha(fecha) {
	dia = fecha.split('/')[0];
	mes = fecha.split('/')[1];
	anio = fecha.split('/')[2];
	if (anio < 1900
			|| anio > 2050
			|| mes < 1
			|| mes > 12
			|| dia < 1
			|| dia > 31
			|| ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31)
			|| (mes == 2 && dia > 29)
			|| (mes == 2 && (anio % 4 != 0 && anio % 100 == 0)
					&& anio % 400 != 0 && dia == 29))
		return "Mal";
	// return false;
	else
		return "Bien";
	// return true;
}

// -------------------------------------------------
	function msgBoxAvisoBuxis(mensaje, titulo){
		var htmlDiag = ''+
		'<div id="msgBoxAvisoBuxis" title="Aviso" class="bxDialog">'+
		'	<p class="bxMsg">Mensaje de Error no encontrado.</p>'+
		'	<p class="bxExplain">Detalles</p>'+
		'</div>';
		
		$( "#msgBoxAvisoBuxis" ).dialog({
			autoOpen: false,
			modal: true,
			width: 400,
			close : function (event,ui){
				$('#msgBoxAvisoBuxis p').text('Mensaje de Aviso no encontrado.');
			}
		});

		// *****************
		let idNombreElemento = "questionDialog";
		let idNombreElemento_Hashtag = "#questionDialog";

		
		if (titulo != null && titulo != undefined && titulo != ''){
			titulo = titulo;
		}else
			titulo = "Aviso"

		$(idNombreElemento_Hashtag).dialog('option','title',titulo);
		$(idNombreElemento_Hashtag).dialog("option", "buttons",[
			{
				text: "Ok",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
			]
		);
		
		$(idNombreElemento_Hashtag).dialog( "open" );


		var questionDialog = document.getElementById(idNombreElemento);
		//questionDialog.textContent = mensaje;
		questionDialog.innerHTML = mensaje;
	}

	/* view password function*/
	/*
		let mostrar = document.getElementById('mostrar');

		mostrar.addEventListener("click", (e) =>{
			e.preventDefault();
			let clave = document.getElementById('password');

			if(clave.type === 'password') {
				clave.setAttribute("type", "text");
				mostrar.innerHTML = '<input id="opcion" name="mostrar" type="checkbox" checked value="">Ocultar la contraseña';
				document.getElementById('password').focus();

			} else {
				clave.setAttribute("type", "password");
				mostrar.innerHTML = '<input id="opcion" name="mostrar" type="checkbox" value="">Mostrar la contraseña';
				document.getElementById('mostrar').focus();
			}
		});

		function load_districts(province) {
			district_select.empty().append('<option value="" selected></option>');
			// Make the ajax call to the server
			url = "/api/districts_from_indec/?province=" + province;
			$.get(url).done(function (data) {
				var aux, district, _i, _len;
				data = data['results'];
				for (_i = 0, _len = data.length; _i < _len; _i++) {
					district = data[_i];
					district_select.append('<option value="' + district['value'] + '">' + district['name'] + '</option>');
				}
			});
		}
		*/
// Clase-Begin: Utilitario **************************************//
// Constructor
/*
	class Utilitario(){
		this.name = "";
		this.value = "";
		this.type = "";
	}
	Utilitario.prototype.name = "";
	Utilitario.prototype.value ="";
	Utilitario.prototype.type = "";

	Utilitario.prototype.toString = function(){
		let s = "";
		return s;
	}


	Utilitario.prototype.getCurrentDateAsString = function(){		
		var currentdate = new Date(); 
		var datetime = currentdate.getFullYear() + "-"
				+ (currentdate.getMonth()+1)  + "-" 
				+ currentdate.getDate() + " _ "  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes() + ":" 
				+ currentdate.getSeconds();
		return datetime;
	}
*/
// Clase-End: Utilitario **************************************//