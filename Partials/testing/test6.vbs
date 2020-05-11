	set bxdataservice = CreateObject("BXDataSrv.Services")
	bxdataservice.setCfgFile("c:\inetpub\wwwroot\bxportal\appconfig\datosConexion.xml")
	MsgBox bxdataservice.execute("<SERVICE ID='PORTAL'><PARAMETERS/></SERVICE>")