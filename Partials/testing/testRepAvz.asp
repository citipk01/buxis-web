<%@LANGUAGE=JSCRIPT%>
<%
	try {
		var bxObj = Server.CreateObject("BXIRepRender.Render")
		Response.Write('<H1>CreateObject BXIRepRender.Render Test OK\n</H1>')
	} catch(e) {
		Response.Write('<H1>Error BXIRepRender.Render:'+e.description+'\n</H1>')
	}
	try {
		var bxObj = Server.CreateObject("BXR2RepEng.R2Engine")
		Response.Write('<H1>CreateObject BXR2RepEng.R2Engine Test OK</H1>')
	} catch(e) {
		Response.Write('<H1>Error BXR2RepEng.R2Engine:'+e.description+'</H1>')
	}

	try {
		var bxObj = Server.CreateObject("BXIAccRep3.Acceso")
		Response.Write('<H1>CreateObject BXIAccRep3.Acceso Test OK</H1>')
	} catch(e) {
		Response.Write('<H1>Error BXIAccRep3.Acceso:'+e.description+'</H1>')
	}

%>