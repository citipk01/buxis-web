//Compruebo que el usuario este validado con la Token
function CHK_UsuarioLogueado(){

/*	var tkn = getCookie("TOKEN");

	BXScript("TKN.CHK", [new BXParameter('TOKEN', tkn), new BXParameter('SERVICE', "TKN.CHK")],
					function(){
		if(this.Results[0].ID != 3)
			{
				window.location.href = "login.html";

			}else{
				window.location.href = "index.html";
			}
	});
*/

}
//CREO COOKIE
function createCookie(name, value) {
	  document.cookie = name + '=' + value;
	}
//Obtengo Cookie
function getCookie(cname) {
	  var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	      var c = ca[i];
	      while (c.charAt(0) == ' ') c = c.substring(1);
	      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	  }
	  return "";
	}
