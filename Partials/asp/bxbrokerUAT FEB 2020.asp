<%@  language="JSCRIPT" %>
<%

    var xmldoc = Server.CreateObject("Msxml2.DOMDocument.6.0")
    xmldoc.load(Request)
    var xmlerror = Server.CreateObject("Msxml2.DOMDocument.6.0"); //xmlerror.load("<ERROR></ERROR>")
    var srvId = xmldoc.documentElement.getAttribute('ID')
    var srvType = xmldoc.documentElement.getAttribute('TYPE')
    var netdomain = ''
    var netuser = '' + Request.ServerVariables('REMOTE_USER')
    var netaddress = '' + Request.ServerVariables('REMOTE_ADDR')
	//var netmachine = '' + Request.ServerVariables('REMOTE_HOST')
    var rootdirectory = '/buxis/partials'
    var doLog = true
    var fso, file;


    try {
        rootdirectory = '' + Server.MapPath(rootdirectory)
    }
    catch (e) { }

	if (doLog){
		fso = new ActiveXObject("Scripting.FileSystemObject");
		file = fso.OpenTextFile(rootdirectory + '/logs/bxbroker.log',8,true);
		file.WriteLine("Request: " + xmldoc.xml);
		file.close();
	}


    if (netuser.indexOf('\\') > 0) { var auxvec = netuser.split('\\'); netdomain = auxvec[0]; netuser = auxvec[1] }
    Session('NETDOMAIN') = netdomain
    Session('NETUSER') = netuser
    Session('NETADDRESS') = netaddress
    Session('ROOT') = rootdirectory
    if (srvType.toUpperCase() == 'SESSION') {
        var xmlres = Server.CreateObject("Msxml2.DOMDocument.6.0"); xmlres.loadXML('<RESULT/>')
        var xmlvars = xmlres.createElement('VALUES'); xmlres.documentElement.appendChild(xmlvars)
        var lstVars = xmldoc.selectNodes("//PARAMETER")
        if (srvId.toUpperCase() == 'SET') { for (var i = 0; i < lstVars.length; i++) { var varId = lstVars.item(i).getAttribute('ID'), varValue = lstVars.item(i).text; Session(varId) = varValue } }
        if (srvId.toUpperCase() == 'GET') { for (var i = 0; i < lstVars.length; i++) { var varId = lstVars.item(i).getAttribute('ID'), varValue = Session(varId); var xmlvar = xmlres.createElement(varId); xmlvars.appendChild(xmlvar); xmlvar.text = varValue } }
        if (srvId.toUpperCase() == 'REM') { for (var i = 0; i < lstVars.length; i++) { var varId = lstVars.item(i).getAttribute('ID'), varValue = Session(varId); Session(varId).remove() } }
        xmloutput = xmlres.xml
    } else if (srvType.toUpperCase() == 'MAIL') {

        var smtpserver = xmldoc.selectSingleNode('//PARAMETER[@ID="SMTPSERVER"]'); smtpserver = ((smtpserver) ? new String(smtpserver.text) : 'mail.buxis.info')
        var sendusername = xmldoc.selectSingleNode('//PARAMETER[@ID="SENDUSERNAME"]'); sendusername = ((sendusername) ? new String(sendusername.text) : 'test@buxis.info')
        var sendpassword = xmldoc.selectSingleNode('//PARAMETER[@ID="SENDPASSWORD"]'); sendpassword = ((sendpassword) ? new String(sendpassword.text) : 'bolsocampeon')

        iCfg = new ActiveXObject("CDO.Configuration")
        iCfg.Fields.Item('http://schemas.microsoft.com/cdo/configuration/sendusing') = 2;
        iCfg.Fields.Item('http://schemas.microsoft.com/cdo/configuration/smtpserverport') = 25;
        iCfg.Fields.Item('http://schemas.microsoft.com/cdo/configuration/smtpserver') = smtpserver;
        iCfg.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1
        iCfg.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusername") = sendusername
        iCfg.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendpassword") = sendpassword
        iCfg.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60

        iCfg.Fields.Update();

        var objMail; try { objMail = new ActiveXObject("CDO.Message") } catch (e) { objMail = new ActiveXObject("CDONTS.Newmail") }
        var strFrom = xmldoc.selectSingleNode('//PARAMETER[@ID="MAILFROM"]'); strFrom = ((strFrom) ? new String(strFrom.text) : 'origen@empresa.com')
        var strTo = xmldoc.selectSingleNode('//PARAMETER[@ID="MAILTO"]'); strTo = ((strTo) ? new String(strTo.text) : 'destino@empresa.com')
        var strCC = xmldoc.selectSingleNode('//PARAMETER[@ID="MAILCC"]'); strCC = ((strCC) ? new String(strCC.text) : '')
        var strSubject = xmldoc.selectSingleNode('//PARAMETER[@ID="MAILSUBJECT"]'); strSubject = ((strSubject) ? new String(strSubject.text) : 'asunto del mensaje')
        var strMessage = xmldoc.selectSingleNode('//PARAMETER[@ID="MAILMSG"]'); strMessage = ((strMessage) ? new String(strMessage.text) : 'mensaje')
        objMail.Configuration = iCfg
        objMail.From = strFrom
        objMail.To = strTo
        objMail.CC = strCC
        objMail.Subject = strSubject

        //para asignar la ruta se deben utilizar comillas simples y doble barra
        // 'C:\\Appweb_HCMS\\bx_desarrollo\\temp\\1.vdx' esta ruta se debe encontrar en el servidor
        //objMail.AddAttachment('');

        try { objMail.Body = strMessage } catch (e) { }
        try { objMail.HTMLBody = strMessage } catch (e) { }
        try {
            objMail.Send()
            xmloutput = '<MESSAGE>El mensaje fue enviado correctamente.</MESSAGE>'
        }
        catch (e) {
            xmloutput = '<ERROR>' + e.description + '</ERROR>'
        }

        objMail = null
        iCfg = null

    } else if (srvType.toUpperCase() == 'RAWMAIL') {
        var bxdataservice = Server.CreateObject("BXDataSrv.Services"); bxdataservice.setCfgFile(rootdirectory + "/appconfig/datosConexion.xml")
        var xmlinput = xmldoc.xml
        var xmloutput = bxdataservice.execute(xmlinput)
        var xmldoc = Server.CreateObject("Msxml2.DOMDocument.6.0"); xmldoc.loadXML(xmloutput)
        var objMail = new ActiveXObject("CDONTS.Newmail")
        var lstMail = xmldoc.selectNodes("//RECORD")
        for (var i = 0; i < lstMail.length; i++) {
            var strFrom = lstMail.item(i).selectSingleNode('MAILFROM').text
            var strTo = lstMail.item(i).selectSingleNode('MAILTO').text
            var strSubject = lstMail.item(i).selectSingleNode('MAILSUBJECT').text
            var strMessage = lstMail.item(i).selectSingleNode('MAILMSG').text
            objMail.Send(strFrom, strTo, strSubject, strMessage, 0)
        }
        objMail = null
        bxdataservice = null
    } else {

        var bxdataservice = Server.CreateObject("BXDataSrv.Services"); bxdataservice.setCfgFile(rootdirectory + "/appconfig/datosConexion.xml")
        var xmlinput = xmldoc.xml

        var jsonOutput = "";
		var TKN = '9FFABC1B562D38FBE053D393A7A9CC3A' //Request.Cookies('buxisseg')('token');

		switch (srvId){
			case 'CITI.LOGIN':
					try {

						//xmldoc.save(rootdirectory + "/LOGIN.txt");

						//var netmachine = '' + Request.ServerVariables('REMOTE_HOST');

						//AddParamToRequest(xmldoc, "netuser", netuser);
						//AddParamToRequest(xmldoc, "iphost", netaddress);
						//AddParamToRequest(xmldoc, "namehost", netmachine);

						xmlinput = xmldoc.xml;

						jsonOutput = bxdataservice.execute(xmlinput);


						eval("var dataLogin=" + jsonOutput + ";");
					}
					catch (e) {
						jsonOutput = '{"ERROR ":"' + e.message + '   -  ' + jsonOutput +'"}';
						//jsonOutput = '{"ERROR":"' + jsonOutput + '"}';
					}

				break;
			case 'TKN.CHK':
			case 'CITI.CHANGE.PWD':
			case 'CITI.LOGOUT':
					try {
						xmlinput = xmldoc.xml;

						jsonOutput = bxdataservice.execute(xmlinput);
					}
					catch (e) {
						jsonOutput = '{"ERROR":"' + e.message + '"}';
					}
				break;
			default:
				var tknsrv = '<SERVICE ID="TKN.CHK" TYPE="SCRIPT" FORMAT="json"><PARAMETERS><PARAMETER ID="token">' + TKN + '</PARAMETER><PARAMETER ID="service">' + srvId + '</PARAMETER>'
				tknsrv += '<PARAMETER ID="iphost">' + netaddress + '</PARAMETER></PARAMETERS><KEYS/></SERVICE>'
				var auxError = true

				try {
					jsonOutputTKN_CHK = bxdataservice.execute(tknsrv);
					auxError = false;
				}
				catch (e) {
					jsonOutput = '{"ERROR":"' + e.message + '"}';
				}
				//jsonOutput = jsonOutputTKN_CHK

				if (!auxError) {

					eval("var da=" + jsonOutputTKN_CHK + ";")

					data = da.data[0];

					if (data.status == 0) {
						jsonOutput = '{"type": [{"name": "ERROR","type": "char","length": 50,"scale": 0}],"data": [{"ERROR": "Debe iniciar sesion.   " }]}' + "   \n" + srvId + "  -  \n" + tknsrv
					} else if (data.status == 1) {
						jsonOutput = '{"type": [{"name": "ERROR","type": "char","length": 50,"scale": 0}],"data": [{"ERROR": "Su sesión ha expirado."}]}'
					} else if (data.status == 2) {
						jsonOutput = '{"type": [{"name": "ERROR","type": "char","length": 50,"scale": 0}],"data": [{"ERROR": "Su usuario no tiene permiso para ejecutar el servicio. Contacte a un administrador."}]}'
					} else {
						//data == 3 --> Todo OK!
						try {

							AddParamToRequest(xmldoc, "BXTOKEN", TKN);
							xmlinput = xmldoc.xml;
							jsonOutput = bxdataservice.execute(xmlinput);

						}
						catch (e) {
							jsonOutput = '{"ERROR":"' + e.message + '" + jsonOutput }';
						}
					}
				}
				break;

		}

        bxdataservice = null
        var strCACHE = xmldoc.selectSingleNode('//PARAMETER[@ID="@CACHE"]'), numCACHE = ((strCACHE) ? new Number(strCACHE.text) : 0)
        var strPAGE = xmldoc.selectSingleNode('//PARAMETER[@ID="@PAGE"]'), numPAGE = ((strPAGE) ? new Number(strPAGE.text) : 0)
        var strEXCLUDE = xmldoc.selectSingleNode('//PARAMETER[@ID="@EXCLUDE"]'); strEXCLUDE = ((strEXCLUDE) ? new String(strEXCLUDE.text) : '')
        var strINCLUDE = xmldoc.selectSingleNode('//PARAMETER[@ID="@INCLUDE"]'); strINCLUDE = ((strINCLUDE) ? new String(strINCLUDE.text) : '')
        var strFILTER = xmldoc.selectSingleNode('//PARAMETER[@ID="@FILTER"]'); strFILTER = ((strFILTER) ? new String(strFILTER.text) : '')

        if (strFILTER != '') {
            var xmldoc = Server.CreateObject("Msxml2.DOMDocument.6.0"); xmldoc.setProperty('SelectionLanguage', 'XPath'); xmldoc.loadXML(xmloutput)
            var nodos = xmldoc.selectNodes('//RECORD[not(' + strFILTER + ')]')
            if (nodos.length > 0) { nodos.removeAll(); xmloutput = xmldoc.xml }
        }
        if (strEXCLUDE != '') {
            var xmldoc = Server.CreateObject("Msxml2.DOMDocument.6.0"); xmldoc.setProperty('SelectionLanguage', 'XPath'); xmldoc.loadXML(xmloutput)
            var nodos = xmldoc.selectNodes('//RECORD[' + strEXCLUDE + ']')
            if (nodos.length > 0) { nodos.removeAll(); xmloutput = xmldoc.xml }
        }
        if (numCACHE > 0) {
            var xmldoc = Server.CreateObject("Msxml2.DOMDocument.6.0"); xmldoc.setProperty('SelectionLanguage', 'XPath'); xmldoc.loadXML(xmloutput)
            var allnodos = xmldoc.selectNodes('//RECORD')
            var grupo = xmldoc.selectSingleNode('//DATAVAL'); if (grupo) { grupo.setAttribute('COUNT', allnodos.length) }
            var field1 = xmldoc.selectSingleNode('//FIELD[1]'); field1 = ((field1) ? field1.getAttribute('SOURCE') : '')
            if ((strINCLUDE.indexOf('#0') >= 0) && (field1 == '')) {
                var strCONDICION = '(position() < ' + (numCACHE * numPAGE) + ' or position() > ' + (numCACHE * (numPAGE + 1)) + ')'
            } else {
                strINCLUDE = strINCLUDE.replace('#0', field1)
                var strCONDICION = '(position() < ' + (numCACHE * numPAGE) + ' or position() > ' + (numCACHE * (numPAGE + 1)) + ')' + ((strINCLUDE == '') ? '' : ' and not(' + strINCLUDE + ')')
            }
            var nodos = xmldoc.selectNodes('//RECORD[' + strCONDICION + ']')
            if (nodos.length > 0) { nodos.removeAll(); xmloutput = xmldoc.xml }
        }
    }

	if (doLog){
		fso = new ActiveXObject("Scripting.FileSystemObject");
		file = fso.OpenTextFile(rootdirectory + "/logs/bxbroker.log",8,true);
		file.WriteLine("Response: " + jsonOutput);
		file.close();
	}

    Response.Clear()
    Response.ContentType = "text/plain"
    Response.Charset = "ISO-8859-1"
    Response.Write(jsonOutput)

	function AddParamToRequest(xmldom, paramName, paramValue){
		var params = xmldoc.selectSingleNode("//PARAMETERS");
		var par = xmldoc.createElement("PARAMETER");
		par.text = paramValue;
		var newAtt = xmldoc.createAttribute("ID");
		newAtt.value = paramName;
		par.attributes.setNamedItem(newAtt);
		params.appendChild(par);
	}

%>