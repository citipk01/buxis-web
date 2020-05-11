<%@LANGUAGE=JSCRIPT%>
<%
	/*
	var xmldoc				= Server.CreateObject("Msxml2.DOMDocument.3.0")
	xmldoc.loadXML("<SERVICE ID='CITI.COD_MF.CMB' TYPE='DATA' FORMAT='json'><PARAMETERS/></SERVICE>")
	var xmlinput			= xmldoc.xml
	var bxdataservice		= Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("/buxis/Partials/appconfig/datosConexion.xml"))
	var xmloutput			= bxdataservice.execute(xmlinput)
	Response.Write('<textarea style="width:100%;height:100%">'+xmloutput+'</textarea>')
	*/


	try {
		var usr = 'as54421'
		var pwd = ''
		var sg = new ActiveXObject('BxSecurityGateway2018v2.ClassLibrary.SGLogin') ;	
		var serverSGSIT = "https://sgsit.nam.nsroot.net:7211/SGAdmin/LegacyController";
        var serverSGUAT = "https://sguat.nam.nsroot.net:7211/SGAdmin/LegacyController";
        var serverSGPRO = "https://sgway.nam.nsroot.net:7211/SGAdmin/LegacyController";	

		sg.SecurityGateWayServer = serverSGUAT;
		sg.ApplicationID = 20322020;
		//sg.setApplicationName("SGDemoNET");
		sg.setConfigXmlFilePath('C:\\Windows\\SysWOW64\\config.xml');	

		sg.Login(usr, pwd);
		
		Response.Write('<H1>asfsaf: '+sg.HasToChangePassword+'</H1>');
		
		Response.Write('<H1>'+sg.Name+'</H1>');
		var funciones = sg.GetFunctionsStr(usr, pwd);
		Response.Write('<H1>funciones: '+funciones+'</H1>');

		sg.Logout(usr)

		
	} catch(e) {
		Response.Write('<H1>clave: '+sg.HasToChangePassword+'</H1>');
		Response.Write('<H1>'+e.description+'</H1>')
	}
	//Response.Write(sg.GetAbsolutePathN);
	Response.Write('<H1>New dll OK</H1>');
	
	//sg.SecurityGateWayServer = 'https://sgsit.nam.nsroot.net:7211/SGAdmin/LegacyController';

	//sg.ApplicationID = 20322020;
/*
try {
	sg.Login(usr, pwd);
	Response.Write('<H1>'+sg.Name+'</H1>');
	} catch(e) {
		Response.Write('<H1>'+e.description+'</H1>')
	}
	/*var nombre = sg.Name;
	var funcsSg = sg.GetFunctions('as54421','m2WAk9n6');
				//Response.Write('<textarea style="width:100%;height:100%">'+nombre+'*'+funcsSg.toString()+'*</textarea>')
	Response.Write('<textarea style="width:100%;height:100%">'+nombre+'*'+'E'+'*</textarea>')
				//Response.Write('<textarea style="width:100%;height:100%"></textarea>')
	*/
%>