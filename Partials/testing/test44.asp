<%@LANGUAGE=JSCRIPT%>
<%
	//var xmldoc				= Server.CreateObject("Msxml2.DOMDocument.6.0")
	//xmldoc.loadXML('<SERVICE ID="CITI.LOGIN" FORMAT="json" TYPE="SCRIPT"><PARAMETERS><PARAMETER ID="username">adsawd</PARAMETER><PARAMETER ID="password">wdawdawd</PARAMETER><PARAMETER ID="ip">192.168.0.231</PARAMETER></PARAMETERS></SERVICE>')
	var jsonOutput = "";
	var test = "";
	var tknsrv = '<SERVICE ID="TKN.CHK" TYPE="SCRIPT" FORMAT="json"><PARAMETERS><PARAMETER ID="token">' + 'TKN' + '</PARAMETER><PARAMETER ID="service">' + 'CITI.LOGIN' + '</PARAMETER>'
	tknsrv += '<PARAMETER ID="iphost">' +'netaddress' + '</PARAMETER></PARAMETERS><KEYS/></SERVICE>'
	var tknsrv2 = '<SERVICE ID="TKN.CHK" TYPE="SCRIPT" FORMAT="json"><PARAMETERS><PARAMETER ID="token">undefined</PARAMETER><PARAMETER ID="service">CITI.LOGIN</PARAMETER><PARAMETER ID="iphost">fe80::e999:edec:65bd:b9e1%11</PARAMETER></PARAMETERS><KEYS/></SERVICE>'
	//var xmlinput = xmldoc.xml
	//var login = '<SERVICE ID="CITI.LOGIN" FORMAT="json" TYPE="SCRIPT"><PARAMETERS><PARAMETER ID="username">adsawd</PARAMETER><PARAMETER ID="password">wdawdawd</PARAMETER><PARAMETER ID="ip">192.168.0.231</PARAMETER></PARAMETERS></SERVICE>'
	//var login = '<SERVICE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="CITI.LOGIN" FORMAT="json" TYPE="SCRIPT"><PARAMETERS><PARAMETER ID="username">ADSDAWD</PARAMETER><PARAMETER ID="password">ADAWDAWD</PARAMETER><PARAMETER ID="ip">192.168.0.231</PARAMETER></PARAMETERS></SERVICE>'
	var login = '<SERVICE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="CITI.LOGIN"  TYPE="SCRIPT"><PARAMETERS><PARAMETER ID="username">dawdawd</PARAMETER><PARAMETER ID="password">dawdawd</PARAMETER><PARAMETER ID="ip">192.168.0.231</PARAMETER></PARAMETERS></SERVICE>'
	var bxdataservice = Server.CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile(Server.MapPath("../appconfig/datosConexion.xml"))
	
	//var xmloutput = bxdataservice.execute(xmlinput)

	//Response.Write('<textarea style="width:100%;height:100%">'+xmloutput+'</textarea>')
	
				try {
					jsonOutput = bxdataservice.execute(login);
					//jsonOutput = '<?xml version="1.0"?><RESULT><VALUES><token TYPE="STRING">4436CA411B474B5397816440B3756B41</token><nombre TYPE="STRING">Nombre</nombre><permisos TYPE="STRING">HOME,MIFORMVAC</permisos><status TYPE="INTEGER">0</status></VALUES></RESULT>'
					//jsonOutput = '{"ERROR":"' + 'e.message' + '"}'
					test = "var dataLogin=" + jsonOutput + ";"
					
					//eval(test);
					
					//eval("var dataLogin=2;");
				}
				catch (e) {
					jsonOutput = 'ERROR: ' + e.message ;
				}
			//data = jsonOutput.data[0];
					Response.Write('<textarea style="width:100%;height:100%">'+ jsonOutput +'</textarea>')


//
					%>



