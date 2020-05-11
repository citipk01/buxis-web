<%@ LANGUAGE="VBSCRIPT" %>
<%

On Error Resume Next

Tester "MSXML2.DOMDocument.3.0"
Tester "MSXML2.DOMDocument.4.0"
Tester "MSXML2.DOMDocument.5.0"
Tester "MSXML2.DOMDocument.6.0"

Sub Tester (ObjectName)
    Err.Clear
    Set obj = CreateObject(ObjectName)
    If Not Err.Number <> 0 Then
        Response.Write ObjectName
    End If 
End Sub

%>