<%@LANGUAGE=JSCRIPT%>
<%
	try {
		var bxdataservice = Server.CreateObject("BXIrep.Datos")
		Response.Write('<H1>CreateObject BXIrep.Datos Test OK\n</H1>')
		try {
			Response.Write('<H1>          BXIRep.Datos versi�n:'+bxdataservice.getVersion()+ '\n</H1>')

		} catch(e) {
		Response.Write('<H1>Error buscando versi�n de BXIrep.Datos (posiblemente versi�n desactualizada):'+e.description+'\n</H1>')
		}
	} catch(e) {
		Response.Write('<H1>Error BXIrep.Datos:'+e.description+'\n</H1>')
	}
	try {
		var bxObj = Server.CreateObject("BXIGenRep.reporte")
		Response.Write('<H1>CreateObject BXIGenRep.reporte Test OK\n</H1>')
	} catch(e) {
		Response.Write('<H1>Error BXIGenRep.reporte:'+e.description+'\n</H1>')
	}
	try {
		var bxObj = Server.CreateObject("BXIGenRep2.reporte")
		Response.Write('<H1>CreateObject BXIGenRep2.reporte Test OK\n</H1>')
		try {
			Response.Write('<H1>          BXIGenRep2 versi�n:'+bxObj.getVersion()+ '\n</H1>')

		} catch(e) {
		Response.Write('<H1>Error buscando versi�n de BXIGenRep2 (posiblemente versi�n desactualizada):'+e.description+'\n</H1>')
		}
	} catch(e) {
		Response.Write('<H1>Error BXIGenRep2.reporte'+e.description+'\n</H1>')
	}
	try {
		var bxObj = Server.CreateObject("BXIGenRep3.reporte")
		Response.Write('<H1>CreateObject BXIGenRep3.reporte Test OK\n</H1>')
		try {
			Response.Write('<H1>          BXIGenRep3 versi�n:'+bxObj.getVersion()+ '\n</H1>')

		} catch(e) {
		Response.Write('<H1>Error buscando versi�n de BXIGenRep3 (posiblemente versi�n desactualizada):'+e.description+'\n</H1>')
		}
	} catch(e) {
		Response.Write('<H1>Error BXIGenRep3.reporte'+e.description+'\n</H1>')
	}
	try {
		var bxObj = Server.CreateObject("BXIAccRep.Acceso")
		Response.Write('<H1>CreateObject BXIAccRep.Acceso Test OK</H1>')
		try {
			Response.Write('<H1>          BXIAccRep versi�n:'+bxObj.getVersion()+ '\n</H1>')

		} catch(e) {
		Response.Write('<H1>Error buscando versi�n de BXIAccRep (posiblemente versi�n desactualizada):'+e.description+'\n</H1>')
		}
	} catch(e) {
		Response.Write('<H1>Error BXIAccRep.Acceso:'+e.description+'</H1>')
	}
	try {
		var bxObj = Server.CreateObject("EvalSueldos.CEval")
		Response.Write('<H1>CreateObject EvalSueldos.CEval Test OK</H1>')
	} catch(e) {
		Response.Write('<H1>Error EvalSueldos.CEval:'+e.description+'</H1>')
	}


%>