<%@LANGUAGE=JSCRIPT%>
<%
	try {
	var xmldoc				= Server.CreateObject("Msxml2.DOMDocument.3.0")
	xmldoc.loadXML("<SERVICE ID='PORTAL' TYPE='FORM'><PARAMETERS/></SERVICE>")
	var xmlinput			= xmldoc.xml
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
		var xmloutput			= bxdataservice.Execute(xmlinput)
Response.Write(xmlinput.text)
	//5:00 PM 6/14/2019
Response.Write('OK')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
%>