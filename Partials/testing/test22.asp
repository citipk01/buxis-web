<%@LANGUAGE=JSCRIPT%>
<%
                try {
                               var xmldoc = Server.CreateObject("Msxml2.DOMDocument.3.0")
                               Response.Write('<H1>CreateObject Msxml2.DOMDocument.3.0 Test OK</H1>')
                } catch(e) {
                               Response.Write('<H1>1 '+e.description+'</H1>')
                }

                try {
                               var xmldoc2 = Server.CreateObject("MSScriptControl.ScriptControl")
                               Response.Write('<H1>CreateObject MSScriptControl.ScriptControl Test OK</H1>')
                } catch(e) {
                               Response.Write('<H1>2 '+e.description+'</H1>')
                }

                try {
                               var xmldoc3 = Server.CreateObject("Scripting.FileSystemObject")
                               Response.Write('<H1>CreateObject Scripting.FileSystemObject Test OK</H1>')
                } catch(e) {
                               Response.Write('<H1>3 '+e.description+'</H1>')
                }

                try {
                               var xmldoc4 = Server.CreateObject("ADODB.Connection")
                               Response.Write('<H1>ADODB.Connection Test OK</H1>')
                } catch(e) {
                               Response.Write('<H1>4 '+e.description+'</H1>')
                }


%>
