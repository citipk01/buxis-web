<%@LANGUAGE=JSCRIPT%>
<%
	try {
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.Test3("xmlinput")
	Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
try {
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.Test1("xmlinput")
	Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
try {
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.Test2("xmlinput")
	Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
try {
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.Test4("xmlinput")
	Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
try {
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.Test5("xmlinput")
	Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
%>