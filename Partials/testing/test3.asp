<%@LANGUAGE=JSCRIPT%>
<%
	try {
		var bxdataservice = Server.CreateObject("BXDataSrv.Services")
		Response.Write('<H1>CreateObject BXDataSrv.Services Test OK</H1>')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
%>