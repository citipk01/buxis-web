<%@LANGUAGE=JSCRIPT%>
<%
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("../appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.execute("<SERVICE ID='PORTAL' TYPE='FORM'><PARAMETERS/></SERVICE>")
	Response.Write('<textarea style="width:100%;height:100%">'+xmloutput+'</textarea>')
%>