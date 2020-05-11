<%@LANGUAGE=JSCRIPT%>
<%
	var xmldoc				= Server.CreateObject("Msxml2.DOMDocument.3.0")
	xmldoc.loadXML("<SERVICE ID='EstadoCivil' TYPE='DATA'><PARAMETERS/></SERVICE>")
	//<SERVICE ID='BXTPERFAM_SEL' TYPE='DATA'><PARAMETERS><PARAMETER ID='PER_ID'>152</PARAMETER></PARAMETERS><KEYS/></SERVICE>
	//<SERVICE ID='EstadoCivil' TYPE='DATA'><PARAMETERS/></SERVICE>
	var xmlinput = xmldoc.xml

	var bxdataservice = Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("../appconfig/datosConexion.xml"))

	var xmloutput = bxdataservice.execute(xmlinput)

	Response.Write('<textarea style="width:100%;height:100%">'+xmloutput+'</textarea>')
%>






