<%@ LANGUAGE="VBSCRIPT" %>
<%
Server.ScriptTimeout = 36000
nFileID  = Request.QueryString("FileID")

If nFileID <> "" Then   
	Dim objXML, objRoot, objParam, objParams, objKeys
	
	Set objXML = CreateObject("Msxml2.DOMDocument.6.0")
	Set objRoot = objXML.createElement("SERVICE")
		Set objXML.documentElement = objRoot
		objRoot.setAttribute "ID", "CITI.MIFORMVAC2.WEB.SEL"
		objRoot.setAttribute "TYPE", "DATA"
		Set objParams = objXML.createElement("PARAMETERS")
			Set objParam = objXML.createElement("PARAMETER")
				objParam.setAttribute "ID", "SEQ"
				objParam.nodeTypedValue = nFileID
			objParams.appendChild objParam
			Set objParam = objXML.createElement("PARAMETER")
				objParam.setAttribute "ID", "TOKEN"
				objParam.nodeTypedValue = Request.Cookies("buxisseg")("token")
			objParams.appendChild objParam			
			
		objRoot.appendChild objParams
		Set objKeys = objXML.createElement("KEYS")
		objRoot.appendChild objKeys
						
	Dim myWebClient
	Set myWebClient = CreateObject("Microsoft.XMLHTTP")
	
	Dim protocol
	protocol = "http" 
	If lcase(Request.ServerVariables("HTTPS"))<> "off" Then 
	   protocol = "https" 
	End If
	
	url = Left(Request.ServerVariables("URL"), InStr(2, Request.ServerVariables("URL"), "/"))
	url = protocol & "://"& Request.ServerVariables("SERVER_NAME") & ":" &  Request.ServerVariables("SERVER_PORT") &  url
	'Response.Write url & "Partials/asp/bxbroker.asp"
	myWebClient.open "POST", url & "Partials/asp/bxbroker.asp", false
	myWebClient.send objXML
		
	Set objXML = CreateObject("Msxml2.DOMDocument.6.0")
	'Response.Write  myWebClient.responseText
	objXML.loadXML myWebClient.responseText

	if objXML.documentElement.nodeName <> "ERROR" then

		IF objXML.documentElement.childNodes.length = 1 Then		
			Response.Write "No se encontró la solicitud de vacaciones nro. " & nFileID &". Por favor intente nuevamente. Si el error persiste contacte a un administrador.<br>Muchas gracias"	
		else

			dim filename
			dim COD_MF
			dim NOM_MF			
			dim PERIODO
			dim EMPRESA
			dim FEC_INI
			dim FEC_FIN
			dim DIAS
			dim DIAS_CALCULADOS
			dim DIAS_TOMADOS
			dim DIAS_PENDIENTES
			dim FECHA_HOY
			dim DESDE_ANIO
			dim DESDE_MES
			dim DESDE_DIA
			dim HASTA_ANIO
			dim HASTA_MES
			dim HASTA_DIA
			
			COD_MF = 0

			'filename = objXML.getElementsByTagName("FILENAME").item(0).text
			FECHA_HOY = objXML.getElementsByTagName("FECHA_HOY").item(0).text
			COD_MF = objXML.getElementsByTagName("COD_MF").item(0).text
							
			PERIODO = objXML.getElementsByTagName("PERIODO").item(0).text
			EMPRESA = objXML.getElementsByTagName("EMPRESA").item(0).text
			FEC_INI = objXML.getElementsByTagName("FEC_INI").item(0).text
			FEC_FIN = objXML.getElementsByTagName("FEC_FIN").item(0).text
			DIAS = objXML.getElementsByTagName("DIAS").item(0).text
			NOM_MF = objXML.getElementsByTagName("NOM_MF").item(0).text
			
			DIAS_CALCULADOS = objXML.getElementsByTagName("DIAS_CALCULADOS").item(0).text
			DIAS_TOMADOS = objXML.getElementsByTagName("DIAS_TOMADOS").item(0).text
			DIAS_PENDIENTES = objXML.getElementsByTagName("DIAS_PENDIENTES").item(0).text		

			Response.Buffer = False
			Dim objStream
			Set objStream = Server.CreateObject("ADODB.Stream")
			objStream.Type = 1 'adTypeBinary
			objStream.Open
			dim fs
			Set fs=Server.CreateObject("Scripting.FileSystemObject")

			if COD_MF > 0 then
				Dim oShell
				Dim script
				Set oShell = Server.CreateObject("Wscript.Shell")
				script = "D:\inetpub\wwwroot\buxis\vacGen\VacacionesGen.exe -o D:\inetpub\wwwroot\buxis\vacGen\vacacionesOk.pdf -s D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf -fh " & FECHA_HOY & " -la """&PERIODO&""" -leg " & COD_MF & " -dp " & DIAS_CALCULADOS & " -dtom " & DIAS_TOMADOS & " -ddisp " & DIAS_PENDIENTES & " -fd " & FECHA_HOY & " -na """ & NOM_MF & """ -hd " & FEC_FIN & " -dd " & FEC_INI & " -dtomar " & DIAS & " -t *" &nFileID&"* -fs 50 -x 100 -y 110 -comp """ &  EMPRESA  & """ " 
				'response.write script
				'response.end
				oShell.Run script
				Set oShell = Nothing
				Sleep 2000,1'intCount + colItems.Count
				if fs.FileExists("D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf") then
					
					objStream.LoadFromFile("D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf")
													
					Response.ContentType = "application/x-unknown"
						Response.Addheader "Content-Disposition", "attachment; filename=FormVac-" & nFileID & ".pdf"
					Response.BinaryWrite objStream.Read
				  		fs.DeleteFile("D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf")
				else
					Sleep 2000,1
					if fs.FileExists("D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf") then
					
						objStream.LoadFromFile("D:\inetpub\wwwroot\buxis\vacForm\TempVac" & nFileID & ".pdf")													
						Response.ContentType = "application/x-unknown"
						Response.Addheader "Content-Disposition", "attachment; filename=FormVac-" & nFileID & ".pdf"
						Response.BinaryWrite objStream.Read
				  		fs.DeleteFile("D:\inetpub\wwwroot\buxis\vacForm\prueba7.pdf")
					else
						Response.Write "No se encontró el archivo en el servidor, por favor pruebe nuevamente. Si el problema persiste contacte un administrador.<br>Muchas gracias"		
					end if
				end if
			else
								
				Response.Write "No se encontró el archivo en el servidor, por favor pruebe nuevamente. Si el problema persiste, contacte un administrador.<br>Muchas gracias"		

			end if
			set fs=nothing


			objStream.Close
			Set objStream = Nothing	

		END IF
	else
		Response.Write objXML.documentElement.text
	end if
	
	Set myWebClient = Nothing
	Set objKeys 	= Nothing
	Set objParam 	= Nothing
	Set objParams 	= Nothing
	Set objRoot 	= Nothing
	Set objXML 		= Nothing	

	'log
	'Set objXML = CreateObject("MSXML2.DOMDocument")
	'Set objRoot = objXML.createElement("SERVICE")
	''	Set objXML.documentElement = objRoot
	''	objRoot.setAttribute "ID", "CITI.MIRECIBO.LOG"
	''	objRoot.setAttribute "TYPE", "DATA"
	''	Set objParams = objXML.createElement("PARAMETERS")
	''		Set objParam = objXML.createElement("PARAMETER")
	''			objParam.setAttribute "ID", "COD_LQ"
	''			objParam.nodeTypedValue = nFileID
	''		objParams.appendChild objParam
	''		Set objParam = objXML.createElement("PARAMETER")
	''			objParam.setAttribute "ID", "BXTOKEN"
	''			objParam.nodeTypedValue = Request.Cookies("buxisseg")("token")
	''		objParams.appendChild objParam			
	''		
	''	objRoot.appendChild objParams
	''	Set objKeys = objXML.createElement("KEYS")
	''	objRoot.appendChild objKeys
						

	'Set myWebClient = CreateObject("Microsoft.XMLHTTP")
	

	'myWebClient.open "POST", url & "Partials/asp/bxbroker.asp", false
	'myWebClient.send objXML
		
	'Set objXML = CreateObject("MSXML2.DOMDocument")
	'Response.Write  myWebClient.responseText
	'objXML.loadXML myWebClient.responseText
	
	'Response.Write  " Length:   " & objXML.getElementsByTagName("ID_LOTE").length  & "     -     "
	'Response.Write HttpContext.Current.Request.Cookies("buxisseg")("token").ToString()
	
		
	'' if objXML.documentElement.nodeName <> "ERROR" then
		' if objXML.getElementsByTagName("ID_LOTE").length = 0 Then
			' 'Response.Write myWebClient.responseText
			' Response.Write "No se encontró el archivo en el servidor. Contacte a un administrador."
			' 'Response.Write nFileID
		' else
			' 'Response.Write objXML.getElementsByTagName("ID_LOTE")
			' id = objXML.getElementsByTagName("ID_LOTE").item(0).text
			' filePath = objXML.getElementsByTagName("FILENAME").item(0).text
			' binData = objXML.getElementsByTagName("FILEBLOB").item(0).nodeTypedValue  ' es un array de Bytes
			
			' 'Response.AddHeader "Content-Disposition", "attachment;filename=test.pdf"
			' Response.AddHeader "Content-Disposition", "attachment;filename="&filePath&".pdf"
			' Response.ContentType 	= "application/octet-stream"
			' Response.BinaryWrite binData
					
		' End If
	 'else
	''	 Response.Write objXML.documentElement.text

	'' end if
	
	'Set myWebClient = Nothing
	'Set objKeys 	= Nothing
	'Set objParam 	= Nothing
	'Set objParams 	= Nothing
	'Set objRoot 	= Nothing
	'Set objXML 		= Nothing	

end if	

  Sub Sleep(intSeconds,filesCountMust)
        dblSeconds = intSeconds / 1000
        If dblSeconds < 1 Then dblSeconds = 1
        dteStart = Now()
        dteEnd = DateAdd("s", dblSeconds, dteStart)  
        do While dteEnd>=Now()
           if dteEnd<=Now() then
                 exit do
           end if
        loop
    End Sub

%>

