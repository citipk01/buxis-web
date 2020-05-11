<table width="500">

<%
If request.form("action")="test" then
	on error resume next
	Set Mail = CreateObject("CDO.Message")
	if err.number = 0 then
	 Mail.From = request.form("UserName")
	 Mail.To = request.form("UserEmail")
	 Mail.Subject = "Your mail works!"
	 Mail.TextBody = "CDO for NT is available on your server"
	 Mail.Send
	 Set Mail = Nothing

      %>
   <tr>
   <td align="center">
  <b>Test Completed</b>
  <p>Your email should arrive shortly
  <% else %>
      <td align="center">
      <b>Test Completed</b>
      <p>Your webserver does not support CDONTS.
     <% end if %>
    </td>
   </tr>

<% Else %>
<tr>
  <td align="center">
    <font face="times new roman">
    <h2><i>CDO for NT Test</i></h2></font>
    <font face="Arial">
    <form action="test8.asp" method="POST">
    <p>If your server supports CDO for NTS you will receive e-mail
    <br>confirmation within a few minutes of submitting the form.
    <pre>
      Your Name:   <input type="TEXT" name="UserName" size="25"> 
      Your E-Mail:  <input type="TEXT" name="UserEmail" size="25"> 
    </pre>
    <p><center><input type="SUBMIT" name="action" value="test">
    <input type="RESET" value="Clear Form"></center></form></font>
    </td>
  </tr>
<% End If %>
</table>
