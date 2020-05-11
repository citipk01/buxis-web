<%@LANGUAGE=JSCRIPT%>
<%
	try {
		var xmldoc = Server.CreateObject("Msxml2.DOMDocument.3.0")
		Response.Write('<H1>CreateObject Msxml2.DOMDocument.3.0 Test OK</H1>')
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
%>
