<% 
	'Response.status = "401 Unauthorized"
	Response.Write("Request.ServerVariables('REMOTE_USER') = <font color=red>"&Request.ServerVariables("REMOTE_USER")&"</font><br/>")
	Response.Write("<br/>User.Identity.Name = <font color=red>"& User.Identity.Name &"</font>") 
	Response.Write("<br/>User.Identity.AuthenticationType = <font color=red>"& User.Identity.AuthenticationType &"</font>") 
	Response.Write("<br/>User.Identity.IsAuthenticated = <font color=red>"& User.Identity.IsAuthenticated &"</font>") 
%>