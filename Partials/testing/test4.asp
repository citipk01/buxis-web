<%@LANGUAGE=JSCRIPT%>
<%
	try {
	var xmldoc				= Server.CreateObject("Msxml2.DOMDocument.6.0")
	xmldoc.loadXML("<SERVICE ID='MODELER' TYPE='FORM'><PARAMETERS/></SERVICE>")
	var xmlinput			= xmldoc.xml
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	//Response.Write('<H1>'+Server.MapPath("../appconfig/datosConexion.xml")+'</H1>')
	bxdataservice.setCfgFile(Server.MapPath("../appconfig/datosConexion.xml"))
	//Response.Write(xmldoc.xml)
	var xmloutput			= bxdataservice.execute(xmlinput)
	Response.Write('<textarea style="width:100%;height:100%">'+xmloutput+'</textarea>')
		} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
%>