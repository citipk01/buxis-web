<%@ LANGUAGE="VBSCRIPT" %>
<%
Server.ScriptTimeout = 36000
nFileID  = Request.QueryString("FileID")

If nFileID <> "" Then   
	Dim objXML, objRoot, objParam, objParams, objKeys
	
	Set objXML = CreateObject("Msxml2.DOMDocument.6.0")
	Set objRoot = objXML.createElement("SERVICE")
		Set objXML.documentElement = objRoot
		objRoot.setAttribute "ID", "BXT_FILEDATA_SEL"
		objRoot.setAttribute "TYPE", "DATA"
		Set objParams = objXML.createElement("PARAMETERS")
			Set objParam = objXML.createElement("PARAMETER")
				objParam.setAttribute "ID", "COD_LQ"
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
		if objXML.documentElement.text = "FILENAMENOMBRE" Then		
			Response.Write "No se encontró el archivo en el servidor. Contacte a un administrador."	
		else
			
		dim filename
		filename = objXML.getElementsByTagName("FILENAME").item(0).text

Dim oShell
Set oShell = Server.CreateObject("Wscript.Shell")
''oShell.Run "unzip -o -P " & objXML.getElementsByTagName("FILEBLOB").item(0).text & " D:\inetpub\wwwroot\buxis\Recibos\" & objXML.getElementsByTagName("FILENAME").item(0).text & ".zip -d D:\inetpub\wwwroot\buxis\Recibos"
oShell.Run "unzip -o -P " & objXML.getElementsByTagName("FILEBLOB").item(0).text & " D:\inetpub\wwwroot\buxis\Recibos\" & filename & ".zip -d D:\inetpub\wwwroot\buxis\Recibos"
Set oShell = Nothing
Sleep 1000,1'intCount + colItems.Count
		
			Response.Buffer = False
			Dim objStream
			Set objStream = Server.CreateObject("ADODB.Stream")
			objStream.Type = 1 'adTypeBinary
			objStream.Open
			'Response.Write "D:\inetpub\wwwroot\buxis\Recibos\" & objXML.getElementsByTagName("FILENAME").item(0).text & ".pdf"
dim fs
Set fs=Server.CreateObject("Scripting.FileSystemObject")
if fs.FileExists("D:\inetpub\wwwroot\buxis\Recibos\temp\"&filename&".pdf") then
			objStream.LoadFromFile("D:\inetpub\wwwroot\buxis\Recibos\temp\"&filename&".pdf")
			Response.ContentType = "application/x-unknown"
			Response.Addheader "Content-Disposition", "attachment; filename=" & objXML.getElementsByTagName("NOMBRE").item(0).text& ".pdf"
			Response.BinaryWrite objStream.Read
  fs.DeleteFile("D:\inetpub\wwwroot\buxis\Recibos\temp\"&filename&".pdf")
else
	Response.Write "No se encontró el archivo en el servidor. Por favor pruebe nuevamente. Si el error persiste contacte a un administrador."		
end if
set fs=nothing


			objStream.Close
			Set objStream = Nothing	


		
		End If
	else
		Response.Write objXML.documentElement.text
	end if
	
	Set myWebClient = Nothing
	Set objKeys 	= Nothing
	Set objParam 	= Nothing
	Set objParams 	= Nothing
	Set objRoot 	= Nothing
	Set objXML 		= Nothing	

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

